export function mountToolkitHeader(header) {
  const document = header.ownerDocument;
  const template = document.createElement("template");
  template.innerHTML = `
    <a class="toolkit-skip" href="#main">Skip to content</a>
    <div class="toolkit-rail">
      <button class="toolkit-menu-button" type="button" aria-label="Open toolkit menu"
              aria-controls="toolkit-sidebar" aria-expanded="false">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
          <path d="M3 0 11 6 3 12Z"/>
        </svg>
      </button>
      <aside class="toolkit-sidebar" id="toolkit-sidebar" aria-labelledby="toolkit-sidebar-title" inert>
        <h2 id="toolkit-sidebar-title">Toolkit menu</h2>
      </aside>
    </div>
    <div class="toolkit-topbar">
      <span class="toolkit-wordmark">Kihira's Toolkit</span>
      <a class="toolkit-kofi" href="https://ko-fi.com/KihiraLove" target="_blank"
         rel="noopener noreferrer" aria-label="Support KihiraLove on Ko-fi">
        <img src="https://storage.ko-fi.com/cdn/cup-border.png" alt="" width="24" height="24">
        <span class="toolkit-kofi-label">Support me on Ko-fi</span>
      </a>
    </div>`;

  const rail = template.content.querySelector(".toolkit-rail");
  const menuButton = rail.querySelector("button");
  const sidebar = rail.querySelector("aside");

  function setMenuOpen(open) {
    document.body.classList.toggle("toolkit-sidebar-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close toolkit menu" : "Open toolkit menu");
    sidebar.inert = !open;
  }

  menuButton.addEventListener("click", () => setMenuOpen(sidebar.inert));
  rail.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !sidebar.inert) {
      event.preventDefault();
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  document.body.classList.add("toolkit-sidebar-ready");
  setMenuOpen(false);
  header.prepend(template.content);
}
export function mountToolkitFooter(footer, { githubUrl, cookieSettings }) {
  const document = footer.ownerDocument;
  const actions = document.createElement("div");
  actions.className = "toolkit-footer-actions";

  const github = document.createElement("a");
  github.className = "toolkit-footer-action";
  github.href = githubUrl;
  github.target = "_blank";
  github.rel = "noopener noreferrer";
  github.textContent = "GitHub";
  actions.append(github);

  if (cookieSettings) {
    cookieSettings.classList.add("toolkit-footer-action");
    actions.append(cookieSettings);
  }

  footer.classList.add("toolkit-footer");
  footer.append(actions);
}