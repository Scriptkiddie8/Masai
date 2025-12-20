NebulaVault — Your Live Multiverse Dashboard
You’re building NebulaVault, a quirky little dashboard that lets users manage three parallel universes of their choice—Artifacts, Creatures, and Logs—each represented as a tab in a React interface.

All universe data must live inside Firebase Realtime Database, and the UI should feel alive, fast, and slightly magical.

What the app should do
Each universe (tab) displays its own paginated list of items fetched from Realtime DB. Switching tabs must feel instant, and each tab should remember its page, scroll position, and query state.

New items created by the user must appear in the database immediately and reflect in the UI across tabs—use Realtime DB's live listeners to stay in sync.

Use React hooks only (useState, useEffect, useRef) for everything: state, effects, input tracking, scroll tracking, and debounce timers.

Add a “Temporal Freeze” switch: when enabled, store all incoming realtime updates in a buffer instead of updating the UI; when disabled, flush them all at once. (This forces clever use of useRef.)

Persist each tab’s state (current page, filters, freeze mode, last viewed item) in localStorage, so a refresh resumes exactly where the user left off.

Handle offline mode:

Read from local cache.
Queue writes while offline and sync once Firebase reconnects.
Bonus spark: Add a tiny "Universe Activity Pulse" (a dot that glows when new changes arrive through realtime listeners).

The UX you're going for
A smooth, reactive, slightly sci-fi dashboard where data flickers into place the moment it changes in the cloud, but the user always feels in control, whether time is flowing or frozen.

Submit a GitHub repository link, make sure the repo is public
