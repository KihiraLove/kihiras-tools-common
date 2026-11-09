# Kihira's Toolkit shared UI

The toolkit provides a base theme and shared page layout for static sites.

- Load `toolkit.css` before your tool's stylesheet. It supplies the dark palette, typography, focus styles, `.panel` cards, and the column layout that keeps the footer at the bottom. Use `.toolkit-container` to align your content with the header and footer.
- Import `mountToolkitHeader` and `mountToolkitFooter` from `toolkit.mjs`. Call `mountToolkitHeader(header)` on the page header. Place the tool's title, icon, and description inside that header. The skip link targets `<main id="main">`.
- Put the site's source and privacy information inside `<div class="toolkit-footer-info">` in the footer. Call `mountToolkitFooter(footer, { githubUrl })` with the tool's GitHub URL. Sites with cookie settings can also pass their existing button as `cookieSettings`.

Use `@container toolkit-page (max-width: …)` for layout breakpoints that should respond to the space left when the menu opens. A tool stylesheet can override the theme variables and `--toolkit-width` as needed.