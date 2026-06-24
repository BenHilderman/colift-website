/* ===== CoLift site — config + tiny interactions (no dependencies) ===== */

/* ---- CONFIG: fill these in ---- */
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY"; // get one free at web3forms.com
const APP_STORE_LIVE = false;            // flip to true once the app is on the App Store
const APP_STORE_URL  = "https://apps.apple.com/app/idXXXXXXXXX";
const INSTAGRAM_URL  = "https://instagram.com/colift.app";
const TIKTOK_URL     = "https://tiktok.com/@colift.app";

/* ---- wire social links ---- */
const ig = document.getElementById("ig-link"); if (ig) ig.href = INSTAGRAM_URL;
const tt = document.getElementById("tt-link"); if (tt) tt.href = TIKTOK_URL;

/* ---- sticky nav condenses on scroll ---- */
const nav = document.getElementById("nav");
const onScroll = () => { if (nav) nav.classList.toggle("scrolled", window.scrollY > 80); };
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* ---- scroll reveal (respects prefers-reduced-motion via CSS) ---- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---- App Store live mode: swap waitlist -> badge ---- */
if (APP_STORE_LIVE) {
  const form = document.getElementById("waitlist");
  const badges = document.getElementById("store-badges");
  const link = document.getElementById("appstore-link");
  if (form) form.classList.add("hidden");
  if (badges) badges.classList.remove("hidden");
  if (link) link.href = APP_STORE_URL;
}

/* ---- primary CTAs ---- */
function focusWaitlist() {
  const top = document.getElementById("top");
  if (top) top.scrollIntoView({ behavior: "smooth" });
  const input = document.querySelector("#waitlist input");
  if (input) setTimeout(() => input.focus({ preventScroll: true }), 450);
}
document.querySelectorAll("[data-cta]").forEach((b) => {
  b.addEventListener("click", () => {
    if (APP_STORE_LIVE) { window.location.href = APP_STORE_URL; } else { focusWaitlist(); }
  });
});

/* ---- subtle parallax on phone mockups (skipped if reduced-motion) ---- */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion) {
  const px = Array.from(document.querySelectorAll(".f-media img, .hero-shot img"));
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    px.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return; // skip off-screen
      const off = (r.top + r.height / 2 - vh / 2) / vh; // ~-0.5..0.5
      const ty = Math.max(-22, Math.min(22, -off * 38));
      const tilt = el.closest(".tilt") ? "rotate(-3deg) " : "";
      el.style.transform = tilt + "translateY(" + ty.toFixed(1) + "px)";
    });
    ticking = false;
  };
  const onPx = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener("scroll", onPx, { passive: true });
  window.addEventListener("resize", onPx, { passive: true });
  update();
}

/* ---- waitlist submit -> Web3Forms (no reload) ---- */
const wl = document.getElementById("waitlist");
if (wl) {
  wl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = wl.querySelector("input");
    const btn = wl.querySelector("button");
    const email = (input.value || "").trim();
    if (!email) return;
    btn.disabled = true; btn.textContent = "Joining…";
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New CoLift waitlist signup",
          from_name: "CoLift waitlist",
          email: email,
        }),
      });
      const data = await res.json().catch(() => ({}));
      const ok = res.ok && (data.success !== false);
      const done = document.createElement("p");
      done.className = "form-done";
      done.innerHTML = ok
        ? "You're on the list 🎟️ — <b>we'll email you when CoLift opens.</b>"
        : "Hmm, that didn't go through. Email <b>colift.app.official@gmail.com</b> and we'll add you.";
      wl.replaceWith(done);
    } catch (err) {
      btn.disabled = false; btn.textContent = "Join the waitlist";
      alert("Network error — please try again, or email colift.app.official@gmail.com");
    }
  });
}
