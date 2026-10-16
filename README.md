# Stocks, Bonds & Cash Over the Long Run

Interactive historical chart with monthly data through September 2026.

Live: https://pippono9g-cloud.github.io/longterm-markets-chart/

## Explore events

- Choose any combination of categories; matching uses OR across explicit tags.
- Search within the visible period, independently of category selection. Zoom out or Reset view to search a wider period.
- Select all and Clear remain separate controls. Major events limits results to editorial tiers 1–2.
- Matches in the visible period appear in a chronological list that updates during mouse-wheel zoom, pinch and pan. Select a row or chart annotation to read a Thai event summary, scoped references when available, and related events. Focus the chart on that period from the detail card.
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
Stocks use the S&P 500 monthly average of daily closes, excluding dividends; cash compounds 3-month Treasury-bill rates.
Bonds use AGG total returns from 2003, VBMFX for 1987–2003, and a yield model before that.
These series are not on an identical income basis. See the chart footnote for methodology.

## Weekly refresh

The Codex weekly task checks for a complete new calendar month every Monday at 10:00
Asia/Bangkok. It updates performance only after all inputs are available: the S&P 500
monthly average from FRED, TB3MS and GS10 monthly rates from FRED, and AGG monthly
total return from a consistent pair of month-end prices plus iShares distributions
(or verified adjusted close data). It does not append a partial current month.
Update `series.json`, then replace the embedded `series-data` JSON in `index.html`
with the same rows and update visible through-date/source wording. Leave `events.json`
and its embedded copy untouched unless a significant new event has been verified and
sourced separately. Run `pnpm test`, commit and push this deployment repository, then
confirm the public page serves the new data; the Fund Hub embeds that page in an iframe.
If any input is missing or inconsistent, retain the previous published month and report
the blocker rather than inventing a return.

September 2026 inputs: S&P 500 monthly average 7,669.41; FRED TB3MS 3.94% and GS10
4.99%; AGG month-end closes $97.41 (Aug 31) and $94.54 (Sep 30), with the issuer's
$0.337062 Sep 1 distribution. The AGG factor `(94.54 + 0.337062) / 97.41` rounds to
0.973997. Sources: [FRED S&P monthly average](https://fred.stlouisfed.org/graph/?g=1CZKn),
[TB3MS](https://fred.stlouisfed.org/series/TB3MS),
[GS10](https://fred.stlouisfed.org/series/GS10),
[iShares distribution](https://www.ishares.com/us/products/239458/ishares-core-us-aggregate-bond-etf?periodCd=m),
and [AGG historical closes](https://www.financecharts.com/etfs/AGG/summary/price).

## Validation

Run `pnpm install` then `pnpm test` for DOM-based interaction and data consistency checks.
These checks do not replace visual browser or real-device testing.
