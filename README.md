# Stocks, Bonds & Cash Over the Long Run

Interactive historical chart with monthly data through August 2026.

Live: https://pippono9g-cloud.github.io/longterm-markets-chart/

## Explore events

- Choose any combination of categories; matching uses OR across explicit tags.
- Search across the complete history, independently of category selection and the visible period.
- Select all and Clear remain separate controls. Major events limits results to editorial tiers 1–2.
- Every match appears in a chronological list. Select a row or chart annotation to read details, then focus the chart on that period.
- Chart labels are limited by available width; narrow screens use the event list instead.
- Use time-frame buttons, + / −, or Ctrl/Command + wheel to zoom. Drag to pan; Reset view restores full history.
- Both % and dollar values rebase at the beginning of the visible period; the summary displays that baseline.

## Data and interpretation

The single self-contained `index.html` embeds `events.json` and `series.json`.
Event rows are `[decimalYear, label, displayDate, type, icon, importance, metadata]`.
Metadata contains a stable `id` and explicit `groups` (first tag is the primary category).
Categories do not depend on icon selection or title matching. Keep embedded and external data synchronized.

Dates and importance are editorial. Individual event citations have not yet been verified.
Annotations provide context, not proof of causation. Existing historical return inputs are unchanged.
Stocks use S&P 500 monthly prices excluding dividends; cash compounds 3-month Treasury-bill rates.
Bonds use AGG total returns from 2003, VBMFX for 1987–2003, and a yield model before that.
These series are not on an identical income basis. See the chart footnote for methodology.

## Validation

Run `pnpm install` then `pnpm test` for DOM-based interaction and data consistency checks.
These checks do not replace visual browser or real-device testing.
