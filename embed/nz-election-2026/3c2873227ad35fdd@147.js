function _1(md){return(
md`# Footer`
)}

function _2(md){return(
md`Thanks to [Tom Larkworthy](https://observablehq.com/@tomlarkworthy) for his original [Plausible Analytics](https://observablehq.com/@endpointservices/plausible-analytics) notebook. This footer uses a [fork of that notebook](https://observablehq.com/@rlesser/plausible-analytics-embed-override) that I created, which can handle anonymous embeds.`
)}

function _footer(plausible_analytics,html){return(
(override_name) => {
  plausible_analytics(override_name);
  return html`<small>Anonymous usage metrics collected with <a href="https://plausible.io/" target="_blank">Plausible Analytics</a>`;
}
)}

function _plausible_analytics(md){return(
async (embed_slug_override) => {
  const runtime = `https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js`;
  const plausible = `https://api.observablehq.com/@rlesser/plausible-analytics-embed-override.js?v=3`;
  const [{ Runtime }, { default: define }] = await Promise.all([
    import(runtime),
    import(plausible)
  ]);
  const snippet = await new Runtime().module(define).value("snippet");
  snippet(embed_slug_override);
  return md`[@rlesser/plausible-analytics-embed-override](https://observablehq.com/@rlesser/plausible-analytics-embed-override) based off of [@endpointservices/plausible-analytics](https://observablehq.com/@endpointservices/plausible-analytics)`;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("footer")).define("footer", ["plausible_analytics","html"], _footer);
  main.variable(observer("plausible_analytics")).define("plausible_analytics", ["md"], _plausible_analytics);
  return main;
}
