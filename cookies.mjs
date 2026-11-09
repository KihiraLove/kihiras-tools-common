const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function readCookie(name) {
  const prefix = encodeURIComponent(name) + "=";
  const entry = document.cookie.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));
  try {
    return entry ? decodeURIComponent(entry.slice(prefix.length)) : null;
  } catch {
    return null;
  }
}

function writeCookie(name, value, maxAge = COOKIE_MAX_AGE) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) +
    "; Path=/; Max-Age=" + maxAge + "; SameSite=Lax" + secure;
}

export function mountToolkitCookiePreferences({ consentCookie, configCookie, description, getConfig }) {
  const template = document.createElement("template");
  template.innerHTML = `
    <aside id="cookie-consent" class="cookie-banner" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-description" hidden>
      <div>
        <strong id="cookie-title">Cookie consent</strong>
        <p id="cookie-description"></p>
      </div>
      <div class="cookie-actions">
        <button id="cookie-accept" class="primary" type="button">Accept config cookies</button>
        <button id="cookie-decline" class="secondary" type="button">Decline</button>
      </div>
    </aside>`;

  const banner = template.content.firstElementChild;
  banner.querySelector("#cookie-description").textContent = description;
  const settingsButton = document.createElement("button");
  settingsButton.id = "cookie-settings";
  settingsButton.type = "button";
  settingsButton.textContent = "Cookie settings";

  let consent = readCookie(consentCookie);
  let config = null;
  if (consent === "accepted") {
    try {
      config = JSON.parse(readCookie(configCookie));
    } catch {
      writeCookie(configCookie, "", 0);
    }
  }

  function save() {
    if (consent === "accepted") writeCookie(configCookie, JSON.stringify(getConfig()));
  }

  function setConsent(choice) {
    consent = choice;
    writeCookie(consentCookie, choice);
    if (choice === "accepted") save();
    else writeCookie(configCookie, "", 0);
    banner.hidden = true;
  }

  banner.querySelector("#cookie-accept").addEventListener("click", () => setConsent("accepted"));
  banner.querySelector("#cookie-decline").addEventListener("click", () => setConsent("declined"));
  settingsButton.addEventListener("click", () => {
    banner.hidden = false;
  });
  banner.hidden = consent === "accepted" || consent === "declined";
  document.body.append(banner);
  return { config, save, settingsButton };
}