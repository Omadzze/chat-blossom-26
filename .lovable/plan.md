# Аналитик — mobile chat UI prototype (design reference for Flutter)

A mobile-first web prototype of the three screens, in Russian, light theme, closely matching the Gemini mobile app feel. Mocked replies only — no backend. Fully responsive: fluid on phone widths, and centered in a phone-width column on tablet/desktop so the mobile design stays readable.

## Screens

1. **Welcome (`/`)**
   - Top bar: history icon button (top-left, the red-circled spot), title "Аналитик".
   - Gradient greeting "Здравствуйте", subtitle paragraph about PMI/PMT.
   - 4 suggestion cards in a responsive grid (1 col narrow → 2 → 3 wide), each with a small round icon bottom-right: Сводка по портфелю с графиками, Разобрать проблемные проекты, Найти повторяющиеся проблемы региона, Почему проект 501 отстаёт.
   - Bottom composer: rounded input "Спросите о проектах, предприятиях или отклонениях", row of small round buttons (+1, folder, attach) and a circular send arrow on the right.

2. **Chat (`/chat`)** — same screen after sending
   - Sending from welcome (typing or tapping a card) navigates here and shows the transcript.
   - User message: filled grey-blue bubble aligned right, with a mono turn counter `01` on the left.
   - Assistant message: no bubble, plain text on background; a collapsible "Показать размышления" toggle above it; "Копировать" action below with copy icon.
   - Mocked assistant reply matching the screenshot text, revealed with a short "Думает..." shimmer delay. Subsequent messages get canned demo answers and incrementing turn numbers.
   - Same composer pinned to the bottom, transcript scrolls under it.

3. **Chat history (`/history`)** — dark, like image 3
   - Header: "Аналитик" title with a round X close button returning to the previous screen.
   - "Недавние" label + long scrollable list of previous chat titles (Russian demo titles, some truncated with ellipsis), tap opens `/chat`.
   - Bottom pinned account row: circular gradient avatar with initial, name, "Pro" label, and a settings gear icon.

## Design system

- Light app surface (near-white background, soft grey-blue cards/bubbles), dark surface tokens used by the history sheet.
- Rounded geometry: large radii on cards/composer, full-round icon buttons.
- Google Sans-like sans stack (Inter/Google Sans fallback) for UI, monospace only for the turn counter.
- Multicolor gradient text token for the "Здравствуйте" greeting (blue → green → amber).
- All colors as semantic tokens in `src/styles.css`; no hardcoded color classes.

## Responsiveness

- Layout driven by fluid widths, `min-w-0`/`truncate` on text rows, `shrink-0` on icons, safe-area padding at top/bottom.
- Breakpoints: type scale and card grid columns step up at `sm`/`md`; the whole app is constrained to a phone-like max width and centered on larger screens.

## Technical notes

- Routes: `src/routes/index.tsx` (welcome), `src/routes/chat.tsx`, `src/routes/history.tsx`, each with its own `head()` metadata.
- Shared pieces: `AppShell` (top bar + safe areas), `Composer`, `MessageList`/`MessageBubble`, `SuggestionCard`, history list item.
- Chat state is in-memory React state (module-level store) shared between welcome and chat so a message typed on the welcome screen appears in the transcript; no database, no AI calls.
- Preview viewport switched to mobile for review.
