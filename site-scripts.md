# ONOC 2026 site scripts

Readable sources (with the full hook documentation in each header) are the `.js` files here. Minified builds are in `min/` (terser, comments stripped). Sizes below are bytes of the source and of the minified build.

Webflow inline script cap: **2,000 characters** per `register_inline_script` (Webflow guide, Scripts Tool Usage). Webflow serves a registered inline script from its CDN as an external file, so even `theme-init` is a tiny synchronous `<script src>` in the head, not a true inline snippet.

| Script | Placement | Source B | Min B | Webflow route |
|---|---|---|---|---|
| theme-init | head, first, no defer | 587 | 164 | inline, registered `onocthemeinit` |
| theme-toggle | before `</body>` | 606 | 327 | inline, registered `onocthemetoggle` |
| header-swap | before `</body>` | 1069 | 431 | inline, registered `onocheaderswap` |
| clocks | before `</body>` | 1465 | 733 | inline, registered `onocclocks` |
| rail | before `</body>` | 1246 | 683 | inline, registered `onocrail` |
| forms | before `</body>` | 1964 | 747 | inline, registered `onocforms` |
| returning-visitor | before `</body>` | 2329 | 1067 | inline, registered `onocreturningvisitor` |
| tabs (extra) | before `</body>` | 1229 | 643 | inline, registered `onoctabs` |
| reveal (extra) | before `</body>` | 873 | 463 | inline, registered `onocreveal` |
| img-fallback (extra) | before `</body>` | 970 | 423 | inline, registered `onocimgfallback` |
| spotlight | before `</body>` | 5002 | 2879 | **host** (over cap) |
| games | before `</body>` | 6323 | 3476 | **host** (over cap) |
| mega-menu | before `</body>` | 4023 | 2221 | **host** (over cap by 221) |

All inline ones are registered at version 1.0.0 and NOT applied to the site or any page. The three hosted ones need a URL plus an SRI hash (`register_hosted_script`); not registered.

"Extra" = behaviour that exists in the comp but was not in the ten requested files (tabs for Latest updates and Members, scroll reveal, broken-image fallback). Without them the page changes versus the comp, so they are included.

## Required markup hooks

Class names and ids are the comp's own, so the Client-First build keeps them verbatim.

- **theme-init**: none. Adds `class="js"` and `data-theme` to `<html>`.
- **theme-toggle**: `button#theme`.
- **header-swap**: `#siteHeader`. Optional `data-solid-at="0.6"`. CSS owns the colours and the logo crossfade (`.nav_logo-full` / `.nav_logo-abbr` under `.is-solid`).
- **clocks**: `#clkL`, `#clkLd`, `#clkF`, `#clkFd` (optional `data-tz` on the time element). Wrapper keeps role=img and aria-label.
- **spotlight**: `.spot`, `.slide`, `.slide_caption`, `.hero_controls`, `.hero_tabs`, `#spPause`. Tabs are generated if `.hero_tab` is absent, so a CMS list only needs `.slide` items. Lazy slides use `data-src`. Optional `data-interval`.
- **games**: `.section_games`, `.games_bg` (empty), `.games_list`, `.game` per Games item, `.game_count` with `[data-u=d|h|m|s]`, optional `.games_news`. Per-item attributes (bind in the Collection List item): `data-start`, `data-name`, `data-c1`, `data-c2`; optional `data-end`, `data-range`, `data-logo`. Background layers are generated from the cards, so the `.games_bg` element needs no CMS list of its own.
- **mega-menu**: `#siteHeader`, `.nav_item.mi > button[aria-expanded][aria-controls]`, `#searchBtn`, `#navSearch[hidden]`, `#q2`, `#menu`, `#primary`.
- **rail**: `#wTrack`, `#wPrev`, `#wNext`, `.athlete_card`.
- **forms**: `form[data-onoc-form]` with `data-bad`, optional `data-ok`, optional `data-demo` (harness only); input with `aria-describedby` pointing to a `role=status` element.
- **returning-visitor**: `#backlinks`; consent flag `localStorage.onoc_consent = "1"` set by the cookie banner.
- **tabs**: `[role=tablist]`, `[role=tab][aria-controls]`, `[role=tabpanel]`.
- **reveal**: `[data-reveal]`, CSS `.js [data-reveal]` / `.is-in`.
- **img-fallback**: any `<img>` with alt; `.member_flag` is hidden instead of replaced.

## CMS mapping (specs.md section 3, Games)

| Attribute on `.game` | Games field |
|---|---|
| `data-start` | start date |
| `data-end` | end date |
| `data-name` | name |
| `data-range` | date range label |
| `data-c1`, `data-c2` | brand colour 1, brand colour 2 |
| `data-logo` | Olympic emblem URL (optional; the first emblem image is used otherwise) |

Collection List settings: sort by start date ascending (script also picks the earliest future start itself), so the order in HTML does not have to be perfect. Dates: send an offset or `Z`; Webflow date fields are UTC, so a Games opening 24 Jul 2027 local in Tahiti should carry the opening hour, not just midnight UTC, if the exact tick matters.

## Differences from the comp (deliberate)

1. **Returning visitor was broken in the comp.** It called `q.get(...)` where `q` resolved to the search `<input id="q">` (named access), threw, and the catch swallowed it. Now uses `URLSearchParams`. It also records the last three consented page views (`onoc_recent`), because nothing wrote that key. Seeding with `?returning=1` works only on localhost and `*.webflow.io`.
2. **`?now=` clock override** (mentioned in CLAUDE.md for the comp but not in its code) now exists, restricted to localhost and `*.webflow.io`.
3. **Games past/under way**: a Games between `data-start` and `data-end` shows "Under way" instead of "Completed" (needs `data-end`).
4. **forms**: valid submits are only cancelled when `data-demo` is set, so Webflow's native form handling and a GET search action keep working. Invalid submits are stopped before Webflow sees them.
5. **Spotlight**: image lazy loading is scoped to `.spot`; the comp loaded every `img[data-src]` on the page (only the Spotlight uses it).

## Conflicts and notes

- `onocmegamenu` v1.0.0 (older prototype) is already applied site-wide in the footer. Remove it from the site scripts before applying `mega-menu`, or both will bind to the same menu.
- Hosted scripts: upload the `.js` (or `min/*.min.js`) files to an HTTPS host you control and register with an SRI hash: `openssl dgst -sha384 -binary file | openssl base64 -A`, prefix `sha384-`.
- Load order when applying: `theme-init` in the head; everything else in the footer, any order (they are independent), `img-fallback` first if early image errors matter.
- Webflow's own Tabs, Navbar and Slider are not used. If `tabs` is replaced by a native Tabs component, drop `tabs.js` and `[role=tablist]` markup.
- Scroll position restore caveat seen in test: reloads restore scroll, so `header-swap` starts in the correct state because it runs `set()` immediately.

## Verified (test-harness.html, served over http on port 8774, headless Chromium at 1440x900)

Clocks (Lausanne 3:00 pm / Fiji 1:00 am with the next-day weekday), live countdown ticking each second, other cards show day counts, background layer follows hover, focus and returns on leave, Spotlight advances every 6.5 s, pauses on hover, pauses with the button (label flips to Play) and does not autoplay under reduced motion, tab click shows slide and sets aria-current and caption tabindex, header turns solid between 55% and 65% of viewport height with logo crossfade and reverts at top, theme toggle persists across reload, mega menu Esc returns focus to its button, search drop Esc returns focus to the search button, mobile menu Esc returns focus to the menu button, rail arrows scroll and set aria-disabled, newsletter and search forms show role=status errors and return focus, tabs arrow keys, reveal, broken image fallback, `?now=2026-11-01` promotes Pacific Games 2027 and recolours the background, `?now=2033-01-01` shows the empty state with "Completed" cards, `?returning=1` fills the backlinks row. Zero console errors on the harness.

The harness differs from the comp only by: scripts removed and replaced with `<script src="scripts/...">`; Games cards use `data-start/data-end/data-c1/data-c2` instead of `data-date` and inline colour vars; static background layers removed (generated by the script); `data-onoc-form data-demo data-ok data-bad` on the three forms. Sizes of the min files were not browser-tested separately from the sources; they are terser output of the tested sources.
