import automatic_getbbox_module from "./@rlesser.automatic-getbbox.js";

function _1(md) {
  return (
    md`# Color Legend Group`
  )
}

function _2(md) {
  return (
    md`For my [visualisation](https://observablehq.com/@pjpscriv/nz-electorate-hexmap) of NZ election results I wanted a reusable component for displaying groups of discrete color schemes over the same range of values, similar to how the [Color Legend](https://observablehq.com/@d3/color-legend) behaves. To use:

\`\`\`javascript
import { GroupLegend } from '@pjpscriv/color-group-legend'
\`\`\`

Then call it like this:`
  )
}

function _swatch(GroupLegend, colors_list, titles_list) {
  return (
    GroupLegend(colors_list, {
      titles: titles_list,
      tickFormat: ".0%",
      gapX: 1
    })
  )
}

function _4(md) {
  return (
    md`The style is inspired by the color swatches used on Wikipedia election results visualisations e.g. [this one](https://upload.wikimedia.org/wikipedia/commons/1/15/2020_New_Zealand_general_election_-_Results.svg) for the New Zealand 2020 Election.

As input data, you need an <u>array</u> of **discreet color ranges** to visualize (currently only \`scaleThreshold\` scales are supported) e.g.`
  )
}

function _colors_list(d3) {
  return (
    [
      d3.scaleThreshold().domain([.05, .1, .15, .2]).range(["#CCEBFE", "#7DC0FE", "#0099FE", "#0000FF", "#000099"]),
      d3.scaleThreshold().domain([.05, .1, .15, .2]).range(["#FFCBCD", "#FE7D80", "#FE3300", "#CB0002", "#800000"]),
      d3.scaleThreshold().domain([.05, .1, .15, .2]).range(["#65FC9F", "#04F360", "#03AA43", "#02772F", "#015321"]),
      d3.scaleThreshold().domain([.05, .1, .15, .2]).range(["#FFFF7F", "#FFFF59", "#FDEC3E", "#FDC63C", "#FF9E00"]),
      d3.scaleThreshold().domain([.05, .1, .15, .2]).range(["#8B8B8B", "#616161", "#444444", "#303030", "#212121"]),
      d3.scaleThreshold().domain([.05, .1, .15, .2]).range(["#F9E9D4", "#E7AC5C", "#C57E1D", "#8A5814", "#613E0E"])
    ]
  )
}

function _6(md) {
  return (
    md`And you can optionally also have a list of title. In this case I'm using:`
  )
}

function _titles_list() {
  return (
    ["National", "Labour", "Greens", "ACT", "NZ First", "Te Pāti Māori"]
  )
}

function _GroupLegend(d3, getBBox) {
  return (
    function GroupLegend(colors, {
      titles = [],
      width = 32,
      height = 16,
      gapX = 4,
      gapY = 4,
      labelGap = 16,
      marginTop = 16,
      marginRight = 0,
      marginBottom = 8,
      marginLeft = 0,
      tickLabelGap = 4,
      tickSize = 0,
      tickFormat,
      tickValues
    } = {}) {

      // Input check
      for (let color of colors) {
        if (!color.invertExtent) {
          throw Error("One of your color scales is not of type 'invertExtent'. This legend group currently only works with invertExtent (Threshold) color scales.");
        }
      }

      // Get dimensions from first color range
      const color1 = colors[0]
      const totalW = (width + gapX) * color1.range().length
      const totalH = (height + gapY) * colors.length + marginTop + marginBottom

      // Create SVG
      const svg = d3.create("svg")
        .attr("width", totalW)
        .attr("height", totalH)
        .attr("viewBox", [0, 0, totalW, totalH])
        .style("overflow", "visible")
        .style("display", "block");

      // Add labels
      const labels = svg.append("g")
      let labelsSize = 0;
      for (let i = 0; i < titles.length; i++) {
        const title = titles[i]
        const colorIndex = Math.floor(color1.range().length / 2) + 1
        const text = labels.append("text").text(title)
          .style("font-family", "sans-serif")
          .style("font-size", "14px")
          .style("font-weight", "bold")
          .attr("x", marginLeft)
          .attr("y", marginTop + tickLabelGap + ((i + 1) * (height + gapY) - (height / 2)))
          .attr("class", "label")
          .attr("fill", colors[i].range()[colorIndex])
          .attr("text-anchor", "start")
        labelsSize = Math.max(labelsSize, getBBox(text).width)
      }

      // Shift labels right
      labels.selectAll(".label").each(function () {
        const text = d3.select(this);
        const width = getBBox(text).width;
        text.attr("x", labelsSize - width + marginLeft);
      });
      labelsSize += labelGap;

      // Create axis
      let x = d3.scaleLinear()
        .domain([-1, color1.range().length - 1])
        .rangeRound([marginLeft, totalW - marginRight]);

      // Setup ticks
      const thresholds
        = color1.thresholds ? color1.thresholds() // scaleQuantize
          : color1.quantiles ? color1.quantiles() // scaleQuantile
            : color1.domain(); // scaleThreshold
      tickValues = d3.range(thresholds.length);
      const thresholdFormat = tickFormat === undefined ? d => d :
        (typeof tickFormat === "string" ? d3.format(tickFormat) : tickFormat);
      tickFormat = (i) => thresholdFormat(thresholds[i], i);

      // Add axis
      svg.append("g")
        .attr("transform", `translate(${labelsSize},${marginTop})`)
        .style("font-size", "14px")
        .style("font-weight", "400")
        .call(d3.axisTop(x)
          .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
          .tickValues(tickValues)
          .tickSize(tickSize))
        .call(g => g.select(".domain").remove())

      // Add color swatches
      for (let i = 0; i < colors.length; i++) {
        svg.append("g")
          .selectAll("rect")
          .data(colors[i].range()).enter()
          .append("rect")
          .attr("x", (d, j) => labelsSize + x(j - 1) + (gapX / 2))
          .attr("y", marginTop + tickLabelGap + (i * (height + gapY)))
          .attr("width", width)
          .attr("height", height)
          .attr("fill", d => d)
      }

      return svg.node()
    }
  )
}

function _9(md) {
  return (
    md`### TODO

Ideally this should support discreet color ranges and all the other color ranges supported by [@d3/color-legend](https://observablehq.com/@d3/color-legend). This is something I'll get to when I find a use for it. 

Until then, open to other people adding that functionality (are pull requests a thing on Observable? 😅).`
  )
}

function _10(md) {
  return (
    md`### References

- https://observablehq.com/@d3/color-legend
- https://observablehq.com/@d3/color-schemes
- https://observablehq.com/@d3/styled-axes
- https://observablehq.com/@rlesser/automatic-getbbox
- https://en.wikipedia.org/wiki/2023_New_Zealand_general_election`
  )
}

function _11(md) {
  return (
    md`### Imports`
  )
}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("swatch")).define("swatch", ["GroupLegend", "colors_list", "titles_list"], _swatch);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("colors_list")).define("colors_list", ["d3"], _colors_list);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("titles_list")).define("titles_list", _titles_list);
  main.variable(observer("GroupLegend")).define("GroupLegend", ["d3", "getBBox"], _GroupLegend);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  const automatic_getbbox = runtime.module(automatic_getbbox_module);
  main.import("getBBox", automatic_getbbox);
  return main;
}
