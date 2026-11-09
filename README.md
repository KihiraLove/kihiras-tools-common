# Kihira's Toolkit shared UI

The shared header, sidebar, and footer are plain JavaScript and CSS for static sites.

- Load `toolkit.css` and import `mountToolkitHeader` and `mountToolkitFooter` from `toolkit.mjs`.
- Call `mountToolkitHeader(header)` on the page header. Place the tool's title, icon, and description inside that header. The skip link targets `<main id="main">`.
- Put the site's source and privacy information inside `<div class="toolkit-footer-info">` in the footer. Call `mountToolkitFooter(footer, { githubUrl })` with the tool's GitHub URL. Sites with cookie settings can also pass their existing button as `cookieSettings`.
- For a footer that sits at the bottom of short pages, give the page body a viewport-height minimum and use a column flex layout.

The consuming site's stylesheet can set `--toolkit-width` and the color variables used by the toolkit.