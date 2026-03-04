// Double B — page transitions for plain HTML pages (GitHub Pages friendly)

(function () {
  // Create overlay once
  const overlay = document.createElement("div");
  overlay.className = "transition";
  document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(overlay);

    // Fade-in on load (subtle)
    requestAnimationFrame(() => {
      overlay.classList.remove("on");
    });
  });

  // Intercept internal links to animate out before navigating
  function isInternalLink(a) {
    if (!a || !a.getAttribute) return false;
    const href = a.getAttribute("href") || "";
    if (!href) return false;
    if (href.startsWith("#")) return false; // same-page anchors handled normally
    if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;
    if (href.startsWith("http://") || href.startsWith("https://")) {
      // allow same-origin absolute URLs as internal
      try {
        const url = new URL(href);
        return url.origin === window.location.origin;
      } catch {
        return false;
      }
    }
    // relative pages like "who-we-are.html"
    return true;
  }

  function animateTo(href) {
    overlay.classList.add("on");
    // Navigate after animation
    window.setTimeout(() => {
      window.location.href = href;
    }, 420);
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;

    // new tab, download, modifiers -> let browser handle
    if (a.target === "_blank") return;
    if (a.hasAttribute("download")) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    if (!isInternalLink(a)) return;

    const href = a.getAttribute("href");
    e.preventDefault();
    animateTo(href);
  });

  // Ensure overlay doesn’t stay on when user goes back/forward
  window.addEventListener("pageshow", () => {
    overlay.classList.remove("on");
  });
})();
