(function (root) {
  'use strict';
  var MAX_PAYLOAD = 32768;
  function text(value, limit) {
    return typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, limit) : '';
  }
  function number(value, max) {
    return value !== null && value !== '' && typeof value !== 'boolean' && Number.isFinite(Number(value)) && Number(value) >= 0 && Number(value) <= max ? Number(value) : null;
  }
  function source(raw) {
    if (!raw || typeof raw !== 'object') return null;
    try {
      var url = new URL(raw.url);
      if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
      var host = url.hostname.toLowerCase();
      if (!['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be', 'instagram.com', 'www.instagram.com'].includes(host)) return null;
      var usable = host === 'youtu.be' ? /^\/[A-Za-z0-9_-]{6,20}$/.test(url.pathname) : host.includes('youtube.com') ? (url.pathname === '/watch' && /^[A-Za-z0-9_-]{6,20}$/.test(url.searchParams.get('v') || '') || /^\/(shorts|embed)\/[A-Za-z0-9_-]{6,20}$/.test(url.pathname)) : /^\/(p|reel|reels|tv)\/[A-Za-z0-9_-]{3,80}\/?$/.test(url.pathname);
      if (!usable) return null;
      var clean = new URL(url.origin + url.pathname);
      if (url.pathname === '/watch') clean.searchParams.set('v', url.searchParams.get('v'));
      return {url: clean.href, creator: text(raw.creator, 80)};
    } catch (_) { return null; }
  }
  function cleanPlan(rows) {
    if (!Array.isArray(rows)) return [];
    return rows.slice(0, 60).flatMap(function (row) {
      if (!row || typeof row !== 'object' || !text(row.name, 100)) return [];
      // Only instructions explicitly included in the link. No captured media,
      // completed results, account ids, weight/unit guesses or network lookups.
      var item = {name: text(row.name, 100), sets: number(row.sets, 50), reps: typeof row.reps === 'string' ? text(row.reps, 80) : number(row.reps, 10000), target: text(row.target, 120)};
      ['secs', 'dur', 'work', 'rest'].forEach(function (key) { item[key] = number(row[key], 604800); });
      item.source = source(row.videoSource);
      var protocol = row.videoSource && row.videoSource.protocol;
      if (protocol && protocol.version === 1 && ['amrap', 'emom'].includes(protocol.kind) && Number.isInteger(protocol.timeCapSeconds) && protocol.timeCapSeconds >= 60 && protocol.timeCapSeconds <= 7200) {
        item.protocol = protocol.kind.toUpperCase() + ' · ' + protocol.timeCapSeconds / 60 + ' min cap';
        item.sets = null;
        if (protocol.kind === 'emom' && Number.isInteger(row.videoSource.emomMinute) && row.videoSource.emomMinute >= 1 && row.videoSource.emomMinute <= 40) item.protocol += ' · minute ' + row.videoSource.emomMinute;
      }
      return [item];
    });
  }
  function decode(raw) {
    if (typeof raw !== 'string' || !raw || raw.length > MAX_PAYLOAD || !/^[A-Za-z0-9_-]+$/.test(raw)) return null;
    try {
      var encoded = raw.replace(/-/g, '+').replace(/_/g, '/');
      while (encoded.length % 4) encoded += '=';
      var binary = atob(encoded), bytes = new Uint8Array(binary.length);
      for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      var payload = JSON.parse(new TextDecoder('utf-8', {fatal: true}).decode(bytes));
      if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return null;
      var names = Array.isArray(payload.x) ? payload.x.filter(function (v) {return typeof v === 'string';}).map(function (v) {return text(v, 100);}).filter(Boolean).slice(0, 8) : [];
      var plan = cleanPlan(payload.p), title = text(payload.t, 60);
      if (!title && !names.length && !plan.length) return null;
      return {w: text(payload.w, 40) || 'A friend', t: title || 'a workout', x: names.length ? names : plan.slice(0, 8).map(function (e) {return e.name;}), plan: plan};
    } catch (_) { return null; }
  }
  function detail(item) {
    var values = [];
    if (item.protocol) values.push(item.protocol);
    if (item.sets !== null && item.sets > 0) values.push(item.sets + (item.sets === 1 ? ' set' : ' sets'));
    if (item.reps !== null && item.reps !== '') values.push(item.reps + ' reps');
    if (item.target) values.push(item.target);
    if (item.secs !== null && item.secs > 0) values.push(item.secs + ' sec hold');
    if (item.dur !== null && item.dur > 0) values.push('Review duration in COLIFT');
    if (item.work !== null && item.work > 0) values.push(item.work + ' sec work');
    if (item.rest !== null && item.rest > 0) values.push(item.rest + ' sec rest');
    return values.join(' · ') || 'Choose your own pace';
  }
  function render(container, preview) {
    if (!container || !preview) return;
    var doc = container.ownerDocument;
    function add(parent, tag, content, className) {
      var node = doc.createElement(tag); node.textContent = content;
      if (className) node.className = className;
      parent.appendChild(node); return node;
    }
    container.replaceChildren();
    add(container, 'p', 'THE SHARED PLAN', 'preview-eyebrow');
    add(container, 'h2', 'A little look before you lift.');
    add(container, 'p', 'A plan to try, at your own pace. Review the workout in COLIFT before starting.', 'preview-note');
    var list = add(container, 'ol', '', 'preview-exercises');
    var entries = preview.plan.length ? preview.plan : preview.x.map(function (name) {return {name: name, sets: null, reps: null};});
    function entry(list, item) {
      var row = add(list, 'li', '');
      add(row, 'strong', item.name);
      add(row, 'span', preview.plan.length ? detail(item) : 'Exercise name only · review the plan in COLIFT');
      if (item.source) {
        var link = add(row, 'a', item.source.creator ? 'Original source · ' + item.source.creator : 'Original exercise source');
        link.href = item.source.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
      }
    }
    entries.slice(0, 4).forEach(function (item) {entry(list, item);});
    if (entries.length > 4) {
      var more = add(container, 'details', '', 'preview-more');
      add(more, 'summary', 'See ' + (entries.length - 4) + ' more exercises');
      var rest = add(more, 'ol', '', 'preview-exercises');
      rest.style.counterReset = 'exercise 4';
      entries.slice(4).forEach(function (item) {entry(rest, item);});
    }
    add(container, 'p', 'Only shared instructions appear here. Photos and private workout history stay in COLIFT.', 'preview-note');
    container.hidden = !entries.length;
  }
  root.CLReplayPreview = {decode: decode, render: render, cleanPlan: cleanPlan, detail: detail, source: source, maxPayload: MAX_PAYLOAD};
})(typeof window === 'object' ? window : globalThis);
