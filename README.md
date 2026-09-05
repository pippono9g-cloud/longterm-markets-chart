# Stocks, Bonds & Cash Over the Long Run

Interactive historical chart with monthly data through August 2026.

Live: https://pippono9g-cloud.github.io/longterm-markets-chart/

## Explore events

- Choose any combination of categories; matching uses OR across explicit tags.
- Search across the complete history, independently of category selection and the visible period.
- Select all and Clear remain separate controls. Major events limits results to editorial tiers 1–2.
- Every match appears in a chronological list. Select a row or chart annotation to read a Thai event summary, scoped references when available, and related events. Focus the chart on that period from the detail card.
- A dark ring identifies the event being viewed; selection survives chart redraws.
- Mouse-wheel and two-finger pinch zoom update the visible-period count while moving, not only on release.
- Chart labels are limited by available width; narrow screens use the event list instead.
- Use time-frame buttons, + / −, or mouse wheel to zoom. Drag to pan; Reset view restores full history.
- Both % and dollar values rebase at the beginning of the visible period; the summary displays that baseline.

## Data and interpretation

The single self-contained `index.html` embeds `events.json` and `series.json`.
Event rows are `[decimalYear, label, displayDate, type, icon, importance, metadata]`.
Metadata contains a stable `id`, explicit `groups` (first tag is primary), `summaryTh`, `summaryBasis`, and scoped `sources`. Some entries also have event-specific `contextTh`, displayed within the same summary.
Categories do not depend on icon selection or title matching. Keep embedded and external data synchronized.

Dates and importance are editorial. Thai summaries are editorial explanations of the existing index. Linked references support only their stated scope; entries without references have not received individual source verification.

The 1988 recovery card adds Federal Reserve economic context; its title avoids an unverified claim that most losses were recovered. Fannie/Freddie conservatorship is corrected from July to September 2008 using FHFA.
Annotations provide context, not proof of causation. Existing historical return inputs are unchanged.
Stocks use S&P 500 monthly prices excluding dividends; cash compounds 3-month Treasury-bill rates.
Bonds use AGG total returns from 2003, VBMFX for 1987–2003, and a yield model before that.
These series are not on an identical income basis. See the chart footnote for methodology.

## Validation

Run `pnpm install` then `pnpm test` for DOM-based interaction and data consistency checks.
These checks do not replace visual browser or real-device testing.
