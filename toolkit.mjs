export function mountToolkitHeader(header) {
  const template = header.ownerDocument.createElement("template");
  template.innerHTML = `
    <a class="toolkit-skip" href="#main">Skip to content</a>
    <div class="toolkit-topbar">
      <button class="toolkit-menu-button" type="button" aria-label="Open toolkit menu"
              aria-controls="toolkit-sidebar" aria-expanded="false">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
      <span class="toolkit-wordmark">Kihira's Toolkit</span>
      <a class="toolkit-kofi" href="https://ko-fi.com/KihiraLove" target="_blank"
         rel="noopener noreferrer" aria-label="Support KihiraLove on Ko-fi">
        <img src="https://storage.ko-fi.com/cdn/cup-border.png" alt="" width="24" height="24">
        <span class="toolkit-kofi-label">Support me on Ko-fi</span>
      </a>
    </div>
    <dialog class="toolkit-sidebar" id="toolkit-sidebar" aria-labelledby="toolkit-sidebar-title">
      <div class="toolkit-sidebar-heading">
        <h2 id="toolkit-sidebar-title">Toolkit menu</h2>
        <button class="toolkit-menu-button" type="button" aria-label="Close toolkit menu" autofocus>
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </dialog>`;

  const openButton = template.content.querySelector(".toolkit-menu-button");
  const sidebar = template.content.querySelector("dialog");
  const closeButton = sidebar.querySelector("button");

  openButton.addEventListener("click", () => {
    sidebar.showModal();
    openButton.setAttribute("aria-expanded", "true");
  });
  closeButton.addEventListener("click", () => sidebar.close());
  sidebar.addEventListener("close", () => {
    openButton.setAttribute("aria-expanded", "false");
  });

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