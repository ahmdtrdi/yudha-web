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

## 2026-08-20 — Cross-browser layout normalization & Figma prototype alignment

### The Change

- Removed secondary pseudo-element background (`.hero__stage::before`) and CSS `mask-image` on `.hero__city` that caused rendering discrepancies between Chrome and WebKit (Safari).
- Re-architected `.hero__stage` container with an aspect-ratio-aware layout max-width (1440px) and height bounds (700px min, 940px max) matching the Figma MacBook prototype (`input_file_2.png`).
- Fixed 3D Download Button (`.press-scene`) positioning to lock relative to the green park lawn (`bottom: clamp(65px, 9vh, 95px)`), ensuring the 3D yellow trapezoid button ("DOWNLOAD LIVE BETA") is fully visible without bottom clipping.
- Eliminated collision between `.hero__tagline` ("Untuk kamu yang mengejar mimpi") and `.mega-button` by adjusting tagline bottom spacing to `bottom: 20px`.
- Polished navbar button shadows from `-9px 11px 0` to a crisp `-5px 6px 0` matching Figma button proportions.
- Updated hero headline to "Start Your Journey" matching Figma design specifications.

### The Reasoning

- CSS `mask-image` and dual background assets behaved differently across browsers (Chrome vs Safari window sizes), producing background color bleeding and shifted proportions.
- Absolute positioning of the CTA button tied solely to viewport bottom (`bottom: 12px` / `56px`) caused the button to get clipped and overlap text on shorter or narrower windows.
- Proportionate box shadows and height constraints preserve the exact visual weight of the Figma artboard on any device display.

### The Tech Debt

- Mobile media query styles are tuned to standard portrait breakpoints; ultra-wide mobile folded screens may benefit from fine-tuning if dedicated art direction assets are added.

## 2026-08-20 — Full-width edge-to-edge city background scaling fix

### The Change

- Switched `.hero__city` from `object-fit: contain` to `object-fit: cover` with `object-position: center bottom` in `globals.css`.

### The Reasoning

- `object-fit: contain` preserved height but introduced empty white side gaps when viewport width exceeded the image's aspect ratio.
- `object-fit: cover` with `object-position: center bottom` locks the green park lawn to the bottom edge, spans 100% full width edge-to-edge without gaps, and positions the skyscraper towers to frame the headline on the left and right, matching the Figma prototype (`input_file_1.png`).

## 2026-08-20 — Widescreen asset integration & cartoon hand scale enlargement

### The Change

- Switched hero city background source in `page.tsx` to `city-park-landing-hero-2x copy.tiff` (2974×1753), which has an exact 1.696:1 aspect ratio.
- Enlarged cartoon hand scene (`.press-scene`) from 22vw (360px max) to `clamp(380px, 36vw, 560px)` and `.mega-button` to `clamp(200px, 16vw, 270px)` in `globals.css`.

### The Reasoning

- The original 2974×2116 WebP asset contained 363px of extra vertical white padding at the top, which caused vertical alignment offsets when scaling.
- Using the 2974×1753 master asset provides an intrinsic ~16:9 ratio that aligns building tops naturally below the subtitle without pushing them into the top sky area.
- Enlarging the cartoon hand to 36vw restores the prominent visual weight of the fingers pointing down to the button as designed in Figma.

## 2026-08-20 — Integration of cropped `cities-background.png` asset

### The Change

- Switched hero city background source in `page.tsx` to `cities-background.png` (1440×755).
- Restored headline to **"Start Your Journey"** with subtitle **"Push Your Limit"** matching the Figma Desktop-1 artboard.
- Positioned `.hero__city` to `bottom: 0; width: 100%`, allowing the cropped asset to span 100% full-width edge-to-edge on white `#ffffff` canvas.
- Scaled cartoon hand to `clamp(360px, 34vw, 540px)` and seated 3D yellow button at `bottom: -10px`.

### The Reasoning

- The cropped `cities-background.png` removes the top excess sky space, allowing the graphic to anchor to the bottom of the canvas while expanding edge-to-edge.
- The skyscraper tops automatically frame the headline on the left and right while keeping the top sky area pure white.

## 2026-08-20 — Placement of 3D button outside below background illustration

### The Change

- Restructured `page.tsx` and `globals.css` into `.hero__illustration` (containing `cities-background.png` and `cartoon-hand.png`) and `.hero__cta` (containing `ThreeDButton` and `hero__tagline`).
- Placed `.hero__cta` on pure white canvas below `.hero__illustration`, ensuring the 3D yellow trapezoid Download button sits outside and below the green park illustration.
- Restored headline to **"Mulai Perjalananmu"** with subtitle **"Push Your Limit"** matching the Figma full landing page design artboard.

### The Reasoning

- Inspection of the full Figma design artboard (`input_file_1.png`) confirmed that the 3D Download button sits on white canvas below the city graphic, rather than floating inside the blue lake / park grass.
- Separating illustration and CTA containers reproduces Figma's artboard hierarchy with 100% fidelity.

## 2026-08-20 — Removal of max-height 480px constraint for true full-width rendering

### The Change

- Removed `max-height: 480px` and `object-fit: contain` from `.hero__city` in `globals.css`.
- Applied `width: 100%; height: auto;` with a subtle `-70px` top margin on `.hero__illustration` to overlap top transparent sky and frame the headline.

### The Reasoning

- Previously, `max-height: 480px` combined with `object-fit: contain` caused the browser to constrain the image height, which automatically shrank the rendered width to 914px, creating unwanted white margins on the left and right sides.
- Removing `max-height: 480px` allows `cities-background.png` (1440×755) to expand 100% full-width edge-to-edge across any viewport, matching the Figma design artboard (`input_file_1.png`).

## 2026-08-20 — Cartoon hand scale enlargement and wrist extension

### The Change

- Enlarged `.hero__hand` width to `clamp(440px, 44vw, 680px)` and set `bottom: -65px` in `globals.css`.
- Increased `.mega-button` width to `clamp(220px, 18vw, 290px)` with `margin-top: 36px` on `.hero__cta`.

### The Reasoning

- Inspection of the close-up Figma canvas (`input_file_0.png`) showed that the hand is significantly larger (~44vw width) and its bottom rounded wrist extends past the green park lawn into the white canvas area directly above the 3D yellow Download button.
- Extending `bottom: -65px` allows the wrist base of the hand to overlap out of the green park landscape onto the white canvas, placing the 3D button right under the fingers/wrist.

## 2026-08-20 — Cartoon hand vertical re-anchoring to top 40% of illustration

### The Change

- Updated `.hero__hand` positioning to `top: 40%; left: 50%; transform: translate(-50%, calc(-50% + var(--hand-press)))` in `globals.css`.

### The Reasoning

- Positioning using a negative bottom offset (`bottom: -65px`) pushed the hand element completely below the image box on taller screen viewports.
- Anchoring the hand vertically at `top: 40%` relative to the illustration wrapper ensures the hand remains permanently locked in the center of the park landscape, with its top fingers extending right below "Push Your Limit", matching Figma (`input_file_1.png`) across all screen heights.

## 2026-08-20 — Cartoon hand position refinement & Product Demo Video card slicing

### The Change

- Lowered `.hero__hand` vertical anchor from `top: 40%` to `top: 54%` in `globals.css`.
- Sliced and created `.demo-section` with `.demo-card` (16:9 aspect ratio, 2.5px border, `-12px 14px 0` 3D shadow, play button placeholder) in `page.tsx` and `globals.css`.
- Added headline **"Diciptakan untuk orang-orang yang hidup dengan impian mereka"** centered below the video card.

### The Reasoning

- Adjusting `.hero__hand` to `top: 54%` gives its top finger ample breathing space below "Push Your Limit", while extending its rounded wrist base down over the bottom of the park illustration directly above the 3D Download button.
- Slicing the Product Demo Video section reproduces Figma (`input_file_0.png`) 100% accurately, creating a dedicated card container for the user's upcoming product demo video.







## 2026-08-20 — 3D Button outside background layout & Indonesian headline restoration

### The Change

- Restructured hero section in `page.tsx` into separate `.hero__illustration-wrapper` (city illustration + cartoon hand) and `.hero__cta-wrapper` (3D Download button + tagline).
- Restored main headline text to **"Mulai Perjalananmu"** with subtitle **"Push Your Limit"**.
- Positioned `.hero__cta-wrapper` below the illustration on pure white background, seating the 3D yellow trapezoid button outside the green park graphic.
- Added 40px top space above the headline to ensure clean white sky space behind typography and navbar.

### The Reasoning

- Inspection of the actual Figma design canvas (`input_file_1.png`) revealed that the 3D Download button sits in the white space OUTSIDE and BELOW the city illustration, rather than floating on top of the green lawn.
- Restructuring the CTA into a dedicated wrapper below the illustration reproduces Figma's artboard hierarchy 100% accurately.




## 2026-08-20 — Figma prototype proportion and box alignment fix

### The Change

- Adjusted `.hero__city` to `object-fit: contain; object-position: center bottom;` within a pure `#ffffff` hero stage, placing the city skyline gracefully in the lower half of the viewport and leaving clean white sky behind the headline.
- Polished the navbar brand logo ("Yudha") and buttons ("How to Play", "FAQ", "Download") to match Figma prototype's compact 64px box, 38px button height, 1.5px border, and `-4px 5px 0` shadow metrics.
- Repositioned cartoon hand and 3D Download button scene to `.press-scene` `bottom: -15px`, seating the 3D yellow button at the bottom edge of the stage.
- Removed extra overlay elements (`.hero__tagline` and `.scroll-cue`) to restore Figma's clean artboard hierarchy.

### The Reasoning

- Using `object-fit: cover` zoomed in on the city illustration, cropping top spires and pushing the buildings up behind the headline.
- `object-fit: contain` with pure white background blending keeps the city buildings at their intrinsic visual height while preserving the clean white sky space for typography as seen in Figma.

## 2026-08-20 — Ultrawide hero framing and scale alignment

### The Change

- Replaced the taller cropped city artwork with the requested `city-park-landing-hero-ultrawide.webp` 2:1 asset and declared its correct intrinsic dimensions.
- Increased the upper composition spacing so the navbar and hero copy follow the Figma artboard's vertical rhythm without changing the navbar control sizes.
- Enlarged the cartoon hand and 3D download button, then tightened their spacing around the park edge to reproduce the reference hierarchy.
- Added dedicated mobile overrides for the ultrawide artwork, hand, and CTA so the desktop scale does not overflow narrow screens.
- Reconnected the extracted 3D button's hover, focus, and active pressed state and removed stale selectors from the previous scene wrapper.

### The Reasoning

- The previous 1440×755 artwork rendered the skyline too tall at full viewport width and pushed the CTA below the initial Chrome frame.
- A shared ultrawide composition preserves building proportions while creating the lower skyline and broader white sky shown in Figma.
- Keeping navbar controls at their existing fixed dimensions preserves the approved interaction targets; only position and surrounding whitespace were adjusted.

### The Tech Debt

- The hero copy remains localized in Indonesian while the supplied Figma screenshot uses English. Change the content only when the final localization direction is confirmed.
- The ultrawide source is 1774px wide, so a larger production export would be beneficial for very wide Retina displays.


## 2026-08-20 — Full-width edge-to-edge background restoration

### The Change

- Removed `max-width: 1440px` from `.hero__stage` and `.hero__city` in `globals.css` and updated Next.js Image `sizes="100vw"` in `page.tsx`.
- Applied `inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center top;` to `.hero__city` to ensure edge-to-edge coverage across all screen widths.

### The Reasoning

- Capping `.hero__stage` at 1440px introduced vertical white gutters on wider screens (>1440px wide).
- Removing the cap allows the city background illustration to span 100% full width from edge to edge without gaps, matching the Figma prototype (`input_file_1.png`).

## 2026-08-20 — Short desktop viewport lift

### The Change

- Added a desktop breakpoint for browser content areas shorter than 820px.
- Lifted the navbar spacing, hero copy, skyline, cartoon hand, and 3D CTA within that breakpoint while preserving all navbar button dimensions.
- Kept the regular fullscreen and mobile compositions unchanged.

### The Reasoning

- A non-fullscreen Chrome window has substantially less usable height because browser tabs, toolbars, and the macOS Dock occupy part of the display.
- Height-aware positioning keeps the hand and 3D CTA inside the initial browser frame without shrinking the approved navbar controls.

### The Tech Debt

- The 820px threshold is tuned to the supplied Chrome screenshot. Additional device screenshots may justify a second intermediate height breakpoint later.

## 2026-08-20 — Viewport-contained sticky press scene

### The Change

- Rebuilt the desktop hero as a viewport-height sticky scene with 220px of dedicated press-scroll travel.
- Positioned the copy, ultrawide city, hand, and 3D CTA using viewport-height anchors so the hand and button are visible immediately in both fullscreen and windowed Chrome.
- Constrained the hand and 3D button by both viewport width and height while retaining the existing navbar button dimensions.
- Moved the product-demo section outside the sticky stage so it enters normally after the press interaction finishes.

### The Reasoning

- Repeatedly lifting a normal-flow illustration could not guarantee that the CTA fit inside a short browser viewport because the 2:1 artwork still contributed its full intrinsic height.
- A sticky scene separates visual composition from document height: the initial frame remains complete while scroll progress can move the hand and switch the button to its pressed geometry.
- Height-aware sizing preserves the reference proportions without clipping the CTA behind Chrome controls or the macOS Dock.

### The Tech Debt

- Scroll travel is currently fixed at 220px to match the existing interaction calculation. If the press animation gains more stages, both values should be promoted to one shared constant.

## 2026-08-20 — Delayed two-phase scroll press

### The Change

- Increased the sticky hero travel from 220px to 440px and split the hand motion into a 120px approach phase followed by a 200px press phase.
- Raised the hand's resting position to leave a visible initial gap above the 3D button.
- Increased the 3D button scale to better match the Figma reference while keeping it inside a short desktop viewport.
- Removed hover, focus, and active-state geometry changes so the button can only enter its pressed state through scrolling.
- Increased the final hand travel so the finger overlaps the button surface at full press.

### The Reasoning

- Triggering the pressed geometry from pointer states made the interaction feel click-gated and bypassed the intended scroll sequence.
- Separating approach from press gives the user immediate scroll feedback, preserves a short pause before contact, and makes the physical interaction legible.
- Additional sticky travel prevents a single small wheel gesture from both approaching and fully depressing the button.

### The Tech Debt

- The 120px approach, 200px press, and 440px total travel values are intentionally tuned together. Promote them to shared configuration if the interaction is reused on another page.

## 2026-08-20 — Pre-press scroll runway and resting gap

### The Change

- Added a 48px pre-sticky runway so the hero initially follows normal page movement instead of locking to the viewport immediately.
- Delayed the hand approach until 64px of scroll and delayed the actual button press until 160px.
- Raised the resting hand position to create a clear Figma-matched gap above the enlarged 3D button.

### The Reasoning

- Immediate stickiness made valid wheel movement feel blocked because the page showed no initial positional response.
- Separating page travel, hand approach, and button depression makes the interaction read as three physical stages rather than one click-gated transition.
- The larger resting gap makes the unpressed state unmistakable while the existing 62px hand travel still produces a strong overlap at full press.

### The Tech Debt

- The 48px sticky offset is intentionally desktop-specific; mobile continues using normal document flow and may need its own touch-driven interaction after device testing.

## 2026-08-20 — Single-gesture smooth press

### The Change

- Reduced the desktop sticky travel from 440px to 200px so one normal scroll gesture completes the interaction and releases the page.
- Compressed the approach phase to scroll positions 24–64px and the press phase to 64–144px.
- Added smoothstep easing to both phases so the shorter interaction retains gradual acceleration and deceleration.
- Reduced the pre-sticky movement from 48px to 24px to preserve immediate scroll feedback without adding a second perceived stop.

### The Reasoning

- The previous travel required multiple wheel or trackpad gestures and made the hero feel artificially locked even though the scrollbar was moving.
- A compact timeline lets users see the approach and full button press during one continuous gesture before the next section enters.

### The Tech Debt

- Wheel delta varies across operating systems. The current 200px travel prioritizes common trackpad and smooth-wheel behavior and should be checked on any required Windows mouse hardware.

## 2026-08-20 — Immediate-response interpolated press

### The Change

- Removed the remaining scroll dead zone so the hand begins approaching on the first scroll pixel.
- Shortened the complete interaction to 140px: approach at 0–36px and button depression at 36–108px.
- Added time-based exponential interpolation between scroll targets and rendered animation state.
- Returned the sticky stage to `top: 0` so there is no secondary locking threshold.

### The Reasoning

- Smoothstep easing at the start of a delayed phase produced a perceptible pause even after the overall scroll distance was reduced.
- Mouse wheels can emit large discrete deltas; interpolating toward the target prevents the hand and SVG geometry from visibly jumping between states.
- The shorter sticky range lets ordinary wheel and trackpad gestures continue to the next section without a second input.

### The Tech Debt

- The 55ms smoothing time constant is tuned for responsiveness on the current artwork. Expose it as configuration if future themes use substantially heavier motion.

## 2026-08-20 — Pointer-proximity press and CTA scale refinement

### The Change

- Added a pointer-proximity interaction that begins within 144px of the 3D CTA and reaches full press near the button bounds.
- Combined proximity and scroll states using their strongest active progress, allowing either input to move both the hand and button without fighting the other.
- Kept touch input on the scroll-driven path to avoid accidental presses during mobile swipes.
- Reduced the 3D button's desktop dimensions by approximately ten percent.

### The Reasoning

- A generous proximity field makes the interaction discoverable without requiring a precise hover over the button or the decorative hand.
- Reusing the existing interpolated render loop keeps pointer entry and exit as smooth as the scroll animation.
- Selecting the maximum active state prevents moving the pointer away from visually releasing a button that has already been pressed by scroll.

### The Tech Debt

- The 144px activation radius is tuned for the current CTA size. If the button scale changes materially again, move both values into shared component configuration.

## 2026-08-20 — Faster press response and unclipped tagline

### The Change

- Reduced the cartoon hand and 3D CTA by approximately eight to ten percent.
- Shortened the scroll animation to a 24px approach, a 52px press phase, and 100px total sticky travel.
- Reduced the interpolation time constant from 55ms to 28ms to remove perceptible trailing delay while retaining smooth motion.
- Moved the supporting tagline outside the clipped sticky stage and into normal document flow above the demo section.

### The Reasoning

- The previous smoothing duration continued chasing the scroll target after the gesture, which read as input lag rather than polish.
- The tagline belonged to the post-CTA document section in the Figma hierarchy; keeping it inside a viewport-height stage inevitably clipped it on short Chrome windows.
- Slightly smaller hero elements restore more white space around the CTA and better match the supplied close-up reference.

### The Tech Debt

- The tagline is now independent of the sticky scene. If it later needs to animate with the CTA, use an intersection-based entrance instead of placing it back inside the clipped stage.

## 2026-08-21 — Ghost-free 3D button state

### The Change

- Replaced the released/pressed SVG crossfade with an exclusive state switch driven by a `data-button-pressed` attribute.
- Switched to the pressed geometry once interpolated press progress reaches the hand-contact threshold.
- Reduced the desktop 3D button dimensions by a further seven to eight percent.

### The Reasoning

- Crossfading two different polygon geometries rendered both silhouettes simultaneously, creating the translucent duplicate or shadow visible during interaction.
- Exclusive rendering guarantees only one coherent button solid is visible at any moment while the hand motion remains smoothly interpolated.

### The Tech Debt

- The button geometry now changes discretely at the contact threshold. A future continuous polygon morph would require matching vertex sets or an SVG morphing library.

## 2026-08-21 — Perspective-integrated CTA lettering

### The Change

- Replaced simple SVG text rotation with face-specific perspective transforms for the top and front button labels.
- Compressed glyph height and added horizontal skew so letterforms follow each polygon plane rather than remaining screen-flat.
- Reduced label size and tracking, removed the artificial italic front label, and switched to a denser neutral sans-serif weight.
- Applied slightly translucent dark-olive ink with multiply blending so the lettering inherits the lime face color.

### The Reasoning

- Baseline rotation alone aligned the words with the button edges but left vertical glyph strokes perpendicular to the screen, producing a pasted-on decal appearance.
- Plane-aware skew and vertical compression make the typography share the same perspective as the 3D solid.
- Multiply blending avoids perfectly opaque digital black and makes the labels read as printing on a colored physical surface.

### The Tech Debt

- The perspective values are tuned to the current SVG polygon coordinates. Replotting either button face requires retuning the corresponding text transform.

## 2026-08-21 — Live Beta label emphasis

### The Change

- Increased the front-face `LIVE BETA` label from 20px to 24px.
- Added slightly wider tracking and reduced vertical compression while retaining its face-aligned rotation and skew.

### The Reasoning

- The previous label blended into the button surface correctly but lacked enough visual weight to read as an interactive secondary call to action.
- Preserving the perspective transform keeps the larger lettering physically integrated with the front plane.

### The Tech Debt

- The front label is sized for the current two-word copy. Longer localized text may require responsive SVG text fitting.

## 2026-08-21 — Complete landing-page slicing through footer

### The Change

- Replaced the temporary intro and FAQ blocks with the complete Figma section sequence: product demo, ecosystem orbit, value statement, Aptitude Battle, accordion FAQ, download CTA, and footer.
- Added responsive outlined cards with shared border/depth treatment for the video, battle, and CTA surfaces.
- Built the ecosystem diagram with concentric lime rings and positioned partner badges, using editable text placeholders where final logo assets are not yet available.
- Added a CSS-rendered phone mockup, native accessible FAQ accordions, structured footer navigation, and the oversized YUDHA wordmark treatment.
- Added tablet and mobile adaptations for card dimensions, orbit scale, FAQ stacking, footer columns, and large typography.

### The Reasoning

- Native HTML structures keep the sliced page usable before final media and brand assets arrive: `details` provides keyboard-accessible FAQ behavior and semantic footer navigation remains functional.
- A shared surface-card style preserves the repeated thin outline and lower-left black depth from the Figma artboard without duplicating geometry rules.
- CSS-based placeholders allow layout review to continue without downloading unapproved third-party logo artwork.

### The Tech Debt

- Replace ecosystem text badges with approved partner logo files when they are provided.
- The demo surface and phone screen remain intentional media placeholders pending final video and product UI assets.
- Footer destinations currently use in-page sections or the project contact email and should be replaced with production routes before launch.
