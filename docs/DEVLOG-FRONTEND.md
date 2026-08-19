# Frontend Development Log

## 2026-08-19 — Interactive landing hero

### The Change

- Replaced the default Next.js starter screen with a responsive Yudha landing hero.
- Composed the supplied city and cartoon-hand assets with navigation, headline, and a custom 3D download button.
- Added pressed states for navbar buttons on hover/focus and linked the hand/button press motion to both pointer proximity and page scroll.
- Added responsive mobile layout, reduced-motion handling, Indonesian document metadata, and lightweight follow-up sections for navigation targets.

### The Reasoning

- The hero remains sticky during its short scroll range so the hand movement reads as a physical button press instead of the whole composition immediately leaving the viewport.
- CSS custom properties connect scroll progress to transforms without React re-renders; updates are throttled through `requestAnimationFrame`.
- The 3D button is built with semantic link content and CSS layers, keeping the effect crisp and editable without adding another image asset.
- Remote Google font loading was removed so builds remain deterministic and do not depend on network access.

### The Tech Debt

- The navigation and download links currently target page sections/placeholders. Replace them with final routes or a real download URL when the product flow is available.
- Fine-tune the hand-to-button contact point after review on the project's final target devices and browser matrix.

## 2026-08-19 — Responsive composition and button-depth correction

### The Change

- Changed the city artwork from a cropped `cover` treatment to a full-composition treatment, with `contain` used on narrow screens.
- Reworked button shadows so the black depth projects toward the lower-left, matching the supplied reference more closely.
- Added tablet and wide-short viewport rules and constrained headline, subtitle, hand, and button sizing by viewport height.
- Made the brand surface more opaque so the city artwork no longer reduces logo legibility.

### The Reasoning

- Width-only sizing caused the hand and typography to dominate on ultrawide displays with limited height.
- The original `cover` rule enlarged and cropped the city asset whenever the viewport aspect ratio differed from the artwork.
- A directional lower-left offset preserves the reference's physical button silhouette while still allowing the hover state to collapse that depth naturally.

### The Tech Debt

- Very narrow portrait screens necessarily show more whitespace around the uncropped landscape artwork. A dedicated portrait city asset would provide a denser composition without cropping.

## 2026-08-19 — Intrinsic city rendering and trapezoid CTA

### The Change

- Replaced the stretched fill-mode city rendering with the asset's intrinsic 2974×2116 aspect ratio, capped at the design artboard width and rendered at maximum image quality.
- Rebuilt the large download control from three clipped polygon layers: a lime top trapezoid, a darker front face, and a black right-side face.
- Connected the button's side-face compression to both scroll progress and pointer interaction so the 3D depth changes during the press.

### The Reasoning

- Stretching a landscape illustration to arbitrary viewport dimensions changed building proportions and softened the image.
- Separate geometric faces reproduce the supplied trapezoid construction more faithfully than a rectangular element with a drop shadow.
- Keeping the original image ratio makes the result predictable across viewport sizes and preserves source sharpness.

### The Tech Debt

- The polygon coordinates are tuned to the current button labels. Significantly longer localization strings may require adjusted padding or font scaling.

## 2026-08-19 — Proportional hero canvas and precise SVG button

### The Change

- Removed the viewport-height clipping and sticky hero treatment that cut the park artwork on wide laptop screens.
- Made the hero canvas scale between 900px and 1260px based on viewport width, preserving the tall composition from the design while allowing normal page scrolling.
- Moved the supporting tagline into the white hero canvas below the CTA, matching the design hierarchy.
- Replaced the multi-element CSS trapezoid with one responsive SVG containing exact top, front, and right-side faces.
- Kept the press interaction by translating the SVG top face and compressing its depth faces during hover, focus, active, and scroll states.

### The Reasoning

- The source design is taller than a typical laptop viewport; compressing everything into `100svh` made the park appear cropped and the CTA collide with the bottom edge.
- SVG polygon coordinates share exact vertices, preventing seams and misalignment between the three-dimensional faces at different responsive sizes.
- Normal document flow lets users see the complete composition through scrolling without scaling or distorting the city illustration.

### The Tech Debt

- A dedicated mobile art direction asset would allow larger buildings on narrow screens while retaining every edge of the landscape illustration.

## 2026-08-19 — Fluid hand sizing and reference-matched CTA geometry

### The Change

- Reduced the desktop hand from 72vw to a fluid 46vw scale with explicit minimum and maximum bounds.
- Changed the interaction scene ratio to include separate vertical space for the hand and CTA, preventing the downward finger from covering the button during resize.
- Replotted the SVG button from the supplied close-up reference using a wider top plane, tapered front plane, and narrower black right face.
- Rotated both labels with the perspective of their respective button planes and adjusted mobile hand limits independently.

### The Reasoning

- The previous scene ratio described only the hand asset, even though the button also occupied the same box; this caused overlap and inconsistent perceived scale.
- Viewport-relative sizing with bounds keeps the hand responsive during browser resizing without letting it dominate ultrawide or narrow layouts.
- Matching shared polygon vertices to the close-up reference produces a coherent solid instead of three loosely related shapes.

### The Tech Debt

- The current desktop hand minimum prioritizes layout stability below tablet width. A future device-specific visual QA pass can refine the exact crossover point for unusual split-screen dimensions.

## 2026-08-19 — Stable CTA press motion and perspective typography

### The Change

- Replaced independent top/depth-face button animation with a single solid-body translation and vertical compression.
- Mapped scroll progress to the same whole-button transform used by hover, focus, and active states.
- Refined the button labels with perspective-aligned rotation, softer weight, tighter download tracking, and a smaller italic live-beta treatment.

### The Reasoning

- Independently transforming adjoining SVG faces changed their shared-edge positions and produced visible gaps during the press.
- Transforming the complete SVG from its bottom edge guarantees that every polygon remains connected throughout the interaction.
- Separate typographic treatments reflect the visual importance and perspective of the top and front faces without overpowering the geometry.

### The Tech Debt

- Typography uses a system-font fallback stack; exact cross-platform glyph metrics would require bundling the final brand font.

## 2026-08-19 — True inset CTA state

### The Change

- Replaced whole-button compression with separate released and pressed SVG geometries.
- The pressed geometry lowers the download surface into the housing, collapses the front face to a thin lip, and removes the live-beta label.
- Connected scroll progress to a crossfade between the two coherent shapes; hover, focus, and active states select the fully inset geometry.

### The Reasoning

- Scaling the complete solid preserved its joins but made it look flattened rather than mechanically depressed.
- Explicit endpoint geometry guarantees clean polygon joins in both states and allows the front label to disappear exactly when the face retracts.

### The Tech Debt

- The transition currently crossfades between exact endpoint drawings. True continuous vertex morphing would require an SVG animation library if a more elastic intermediate motion is desired later.

## 2026-08-19 — CTA component extraction and composition lift

### The Change

- Extracted the complete released/pressed SVG control into a typed reusable `ThreeDButton` component.
- Replaced inline labels and destinations with component props while preserving inherited interaction state from the hero scene.
- Raised the city artwork and the complete hand/button scene with responsive offsets on desktop and mobile.

### The Reasoning

- Keeping SVG geometry in a dedicated component makes the landing page hierarchy readable and isolates future button refinements.
- Moving the hand and CTA together preserves their contact relationship, while moving the city separately aligns its skyline and park with the supplied composition.

### The Tech Debt

- Button colors remain embedded in the SVG because the two visual states use intentionally different face tones; convert them to component theme props only if another color variant is introduced.

## 2026-08-19 — Viewport-contained artboard scaling

### The Change

- Rebased the desktop hero on the design's approximately 4:3 artboard ratio instead of scaling primarily from viewport width.
- Constrained city width, hand width, CTA width, navigation width, and typography using both viewport width and viewport height.
- Returned the hero to one viewport height with a safe minimum, ensuring the city park, hand, CTA, and supporting line can appear together on wide laptop displays.
- Reduced narrow-screen city and hand widths so their full visual bounds remain inside the composition.

### The Reasoning

- A wide laptop viewport has much less vertical space than the supplied design artboard. Width-only scaling enlarged all artwork until its lower content was clipped.
- Using the smaller of width-derived and height-derived scales preserves the complete layout and spacing without changing image aspect ratios.
- The interaction scene now includes an intentional gap between the fingertip and raised CTA while retaining their alignment as both scale.

### The Tech Debt

- The 4:3 containment intentionally introduces additional white space at the sides of ultrawide screens. Filling that space without cropping would require an extended ultrawide city asset.

## 2026-08-19 — Width-proportional Figma artboard restoration

### The Change

- Removed height-constrained desktop scaling that made the entire hero unusually small on wide laptop screens.
- Restored a width-derived hero height of roughly 78vw, capped at 1320px to match the supplied Figma frame proportions.
- Returned the city, hand, CTA, headline, subtitle, and navigation to width-relative sizing while retaining sensible caps.
- Kept the portrait/mobile viewport-specific layout separate from the desktop artboard behavior.

### The Reasoning

- The Figma frame continues vertically beyond a short browser viewport; it does not shrink the full composition to fit one laptop screen.
- Preserving the design ratio means accepting normal vertical scrolling on wide-short displays while keeping the artwork at the intended visual scale.
- Width-relative scaling matches the original spacing relationships more closely than the previous height-limited containment strategy.

### The Tech Debt

- Desktop users with very short browser windows need to scroll to see the CTA and supporting line, consistent with the tall source frame.

## 2026-08-19 — Unified viewport-width scaling

### The Change

- Removed independent desktop maximum sizes from the city, hand, CTA, headline, subtitle, navigation, and hero height.
- Moved the desktop composition to one viewport-width scale: city 100vw, hand 42vw, CTA 20vw, headline 6vw, and hero height 78vw.
- Updated the responsive image size hint to 100vw so Next.js selects an appropriate source for the actual rendered width.
- Retained minimum accessibility sizes and the existing dedicated mobile overrides.

### The Reasoning

- Browser zoom increases the CSS viewport width while reducing CSS-pixel display size. Fixed maximums were reached early and then visually shrank at 67% zoom.
- A shared vw scale compensates for browser zoom and keeps every design element in the same physical proportion to the browser window.
- The existing 2974px city source already supports the target composition; separate breakpoint-generated artwork is unnecessary unless materially different mobile art direction is desired.

### The Tech Debt

- Displays wider than the source image's intrinsic resolution can upscale the city artwork. A higher-resolution master is only needed for exceptionally wide/high-DPI output, not for ordinary responsive breakpoints.

## 2026-08-19 — Ultrawide city art direction and compact design scale

### The Change

- Generated a new 2:1 ultrawide city-and-park background by horizontally extending the supplied illustration without stretching it.
- Added desktop/mobile art direction: desktop uses the ultrawide asset while narrow screens retain the original taller source.
- Returned the UI to the compact reference proportions with bounded title, subtitle, navigation, hand, CTA, and hero sizes.
- Reduced desktop hero height to 65vw with 820px/1150px bounds so the complete composition remains visible without oversized artwork.

### The Reasoning

- The original 1.405:1 artwork could not be both shorter and wider on a widescreen browser without cropping, side whitespace, or geometric distortion.
- Horizontal outpainting changes the canvas composition rather than scaling the original objects, allowing smaller buildings and UI while still spanning the desktop frame.
- Separate mobile art direction avoids making the skyline too short on portrait screens.

### The Tech Debt

- The generated ultrawide source is 1774×887. It is suitable for ordinary desktop delivery, but a larger approved master would improve sharpness on very wide Retina displays.

## 2026-08-19 — Extra-ultrawide single-viewport composition

### The Change

- Generated a second desktop background at approximately 2.6:1 to reduce skyline height while continuing to fill the browser width without stretching.
- Switched the desktop hero to one viewport height with a 760px safety minimum.
- Matched the supplied laptop reference more closely: headline 4.3vw, subtitle 2.5vw, hand 28vw, CTA 13vw, and reduced logo/tagline sizing.
- Repositioned the interaction scene and supporting line so the complete hand and CTA remain visible in the initial laptop viewport.

### The Reasoning

- The 2:1 background still placed the park ground too low when expanded edge-to-edge on a 16:9 browser.
- A 2.6:1 canvas preserves building proportions while lowering the rendered background height enough to expose the hand, CTA, and footer copy simultaneously.
- The new element ratios were measured from the supplied MacBook reference rather than inferred from the earlier Figma canvas zoom.

### The Tech Debt

- The extra-ultrawide generated source is 2022×778. A final production export at 3840px width is recommended after visual approval for maximum Retina sharpness.

## 2026-08-19 — Original artwork and centered design canvas restoration

### The Change

- Removed generated ultrawide artwork from the rendered page and restored the original `city-park-landing-hero-2x.webp` source.
- Introduced a centered desktop design canvas capped at 1440px instead of stretching the hero across every available browser pixel.
- Reduced the logo, navbar controls, headline, subtitle, hand, CTA, and supporting line to match the compact Figma prototype scale.
- Kept the hero within one viewport while preserving the original city image aspect ratio.

### The Reasoning

- The prototype's proportional appearance comes from a bounded canvas inside the device frame, not an endlessly expanding edge-to-edge background.
- Scaling the UI down inside the same bounded canvas preserves the intended hierarchy and keeps the hand, CTA, and park visible without generated extensions.
- Using the original source avoids the visual drift introduced by AI-outpainted architecture.

### The Tech Debt

- The two experimental ultrawide assets remain in `public/assets` but are no longer referenced. Remove them after the original-artwork direction receives final approval.

## 2026-08-19 — Cross-browser full-width hero normalization

### The Change

- Changed the hero stage from a capped canvas to a full-viewport container while retaining the original city artwork as the centered 1440px composition.
- Used the extra-wide artwork only as a side-extension layer on wide desktop viewports, with a soft mask blending it into the original artwork; narrow screens continue to use only the original asset.
- Normalized hero sizing with a `100vh` fallback followed by `100dvh`, and replaced the navbar's computed `min()` width with a broadly interoperable `width` plus `max-width` pair.
- Added WebKit fallbacks for backdrop blur and removed desktop image masking from the mobile layout.

### The Reasoning

- Chrome and Safari screenshots had different CSS viewport widths, so the former exposed the white area outside the old 1440px stage while the latter happened to fit the capped canvas more closely.
- Separating the full-width stage from the bounded central composition prevents wider laptops from enlarging the title, hand, buttons, and original city scene.
- Dynamic viewport units account for browser chrome and toolbar behavior more consistently than a single static viewport unit.

### The Tech Debt

- The side-extension layer uses the existing generated 2022px-wide asset. A final artist-approved wide master would improve edge fidelity on very wide Retina displays, while the original supplied image remains the visible center of the composition.
