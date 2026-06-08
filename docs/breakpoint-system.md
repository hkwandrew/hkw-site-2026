# HKW Site Breakpoint System

Current simplified source contract:

- There are two shared layout modes: mobile portrait and desktop frame.
- Desktop design viewport: `1440 x 1024`.
- Mobile design viewport: `393 x 640`.
- There is no third design viewport.
- `GlobalStyle` uses the fitted desktop-frame viewport-pixel unit by default:
  `min(100vw / 1440, 100dvh / 1024)`.
- The default shared content frame is `1440 / 1024`, centered horizontally and
  vertically when the viewport leaves extra space.
- `GlobalStyle` switches to mobile portrait units only at
  `(max-width: 1024px) and (orientation: portrait)`.
- Mobile portrait uses a fitted `393 / 640` content frame so page
  `sceneSpec.js` `phonePortrait` layer overrides resolve against the mobile
  art-directed scene composition.
- The shared landscape SVG is width-framed and viewport-top anchored. It does
  not force the content-frame top or height. In mobile portrait, scene layers
  can extend downward through the route `sceneSpec.js` `phonePortrait`
  positions instead of stretching the SVG to the mobile frame height.
- Landscape viewports at any width use the desktop-frame composition. This
  includes `1024 x 768`, narrow landscape windows, and desktop windows with
  limited height.
- App layout publishes viewport traits and dimensions, but route layout should
  branch only on the shared mobile-portrait/desktop-frame composition unless a
  route owns a narrower local exception.
- Route and component responsive exceptions should stay local as mobile portrait
  media queries, container queries, or route-owned runtime logic.

## Page Audit

- Home: content, footer, marmot, stump trigger, and plane use the shared mobile
  portrait query; landscape uses the desktop frame. Shared scene art direction
  lives in `home/sceneSpec.js` `phonePortrait` overrides.
- About: desktop cloud scene is used outside mobile portrait. Mobile portrait
  and reduced-motion use the static scroll panels. Shared scene art direction
  lives in `about/sceneSpec.js` `phonePortrait` overrides.
- Services: list/copy/marmot route styles use the shared mobile portrait query.
  The `services-stage` container query remains local because it responds to the
  Services stage box, not the browser breakpoint.
- Work: page layout uses the desktop frame plus route-owned container queries
  for work content/cards. Case-study `mobile` image/nav values are local card
  layout data, not shared viewport mode names. Shared scene art direction uses
  `work/sceneSpec.js` `phonePortrait` overrides only.
- Contact: form density and page spacing use the shared mobile portrait query.
  Shared scene art direction lives in `contact/sceneSpec.js` `phonePortrait`
  overrides.
- Roots: uses the desktop frame outside mobile portrait. Inside mobile portrait,
  Roots keeps a route-owned `portrait-tablet` portfolio grid for wider portrait
  screens; this is local content layout, not a shared breakpoint or scene key.
- Policy: document spacing and type adjustments use the shared mobile portrait
  query.

Core source owners:

- `src/styles/viewportUnits.js`
- `src/styles/GlobalStyle.js`
- `src/styles/breakpoints.js`
- `src/styles/theme.js`
- route-local `*.styles.js` files
