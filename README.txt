CRYPTO WALLET UI
================

Files
-----
index.html    Page structure
style.css     All styling (no Tailwind or other dependencies)
script.js     Assets/Accounts toggle and bottom nav active state
manifest.json Web app manifest (standalone mode, black theme)
README.txt    This file

How to run
----------
Keep all files in the same folder and open index.html in a browser.
For best results on a phone, serve the folder (e.g. "npx serve") and use
"Add to Home Screen" to install it as an app.

What changed
------------
- Pure black (#000000) background; purple fade and dot pattern removed.
- All top header buttons removed.
- Layout rebuilt on a consistent spacing scale; every element resized
  to be smaller and evenly spaced.
- Balance uses DM Sans (a soft, PayPal-style typeface) with lighter weight.
- Bottom nav is now a compact, centered liquid-glass pill (blur, saturation,
  inner highlights) instead of a full-width bar.

Notes
-----
The DM Sans font loads from Google Fonts; offline it falls back to the
system font. The manifest uses an inline SVG icon; swap in your own PNG
icons (192x192 and 512x512) for production.

Update 2
--------
- Bottom nav rebuilt as a full-width dark glass bar (Home / Crypto / Pay Bill / Cards).
- All money amounts use the --font-money font (Instrument Sans) via the .money class.
  To change the font, edit --font-money in style.css and the Google Fonts link in index.html.
- Added in-app promotion card with a 2D cartoon illustration (inline SVG).

Update 3
--------
- Vero splash screen, shown for 10 seconds on every launch, then the app is revealed.
  Sequence: ~480 glowing particles spiral in from off-screen and trace the two capsule outlines,
  the mark ignites (glow, shockwave rings, a light that runs around the outline, slow 3D tilt),
  the wordmark wipes in with a light streak, and the logo zooms through the screen into the app.
- To change the duration, edit 10000 in script.js and the 9s in ".load i" (style.css).
