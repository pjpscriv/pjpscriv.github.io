import election_data_module from "./@pjpscriv.2026-nz-election-data.js";
import color_legend_module from "./@d3.color-legend.js";
import group_legend_module from "./@pjpscriv.color-legend-group.js";


// ------------------- SECTION 1: GEO VS HEX MAP ------------------- //
function _md_1(md, general_elec_data, māori_elec_data) {
  let gen_count = Object.keys(general_elec_data).length;
  let mao_count = Object.keys(māori_elec_data).length;
  return (
    md`## Geographic Map vs Hexamap

This data contains **${gen_count + mao_count}** total electorates: **${gen_count}** general electorates and **${mao_count}** Māori electorates.`
  )
}

function _chart_style(Inputs, chart) {
  const radio = Inputs.radio(new Map([
    ["Zoomed Cities Map", "zoomed"],
    ["Geographic Map", "geo"],
    ["Hexamap", "hex"]
  ]), { label: "Chart style", value: chart.start_value });
  radio.oldValue = chart.start_value

  radio.addEventListener("input", () => { chart.change(radio.value, radio.oldValue); radio.oldValue = radio.value; });
  return radio;
}

function _area_types_swatches(getFill, Swatches, d3) {
  const ids = ["rural", "med", "major-urban", "māori"]
  const titles = [
    "Rural electorate",
    "Medium-sized city electorate",
    "Major urban electorate",
    "Māori electorate"
  ];
  const colors = ids.map(t => getFill({ seat_type: t.toLowerCase().replaceAll(" ", "-") }, "area_type"))
  return Swatches(d3.scaleOrdinal(titles, colors), {})
}

function _chart(drawMap) {
  return (
    drawMap("area_type", "zoomed")
  )
}


// ------------------- SECTION 2: CANDIDATE VOTES ------------------- //
function _md_2(md) {
  return (
    md`## Candidate Votes`
  )
}

function _candidate_chart_style(Inputs, candidate_hexmap) {
  const radio = Inputs.radio(new Map([
    ["Zoomed Cities Map", "zoomed"],
    ["Geographic Map", "geo"],
    ["Hexamap", "hex"]
  ]), { label: "Chart style", value: candidate_hexmap.start_value });

  radio.oldValue = candidate_hexmap.start_value
  radio.addEventListener("input", () => { candidate_hexmap.change(radio.value, radio.oldValue); radio.oldValue = radio.value });
  return radio;
}

function _candidate_votes_legend(party_colors, GroupLegend) {
  const parties = ["National Party", "Labour Party", "Green Party", "ACT New Zealand", "New Zealand First Party", "Te Pāti Māori"]
  const scales = parties.map(p => party_colors.scales[p]);
  const titles = parties.map(p => p.replace(" Party", ""))
    .map(p => p === "ACT New Zealand" ? "ACT" : p)
    .map(p => p === "New Zealand First" ? "NZ First" : p)
  return GroupLegend(scales, { titles: titles, tickFormat: ".0%", height: 14, width: 32, gapX: 0, gapY: 2, labelGap: 4 })
}

function _candidate_hexmap(drawMap) {
  return (
    drawMap("candidate", "zoomed")
  )
}


// ------------------- LATER: CANDIDATE VOTES BY ELECTORATE TYPE ------------------- //
function _x(md) {
  return (
    md`## Candidate Votes by electorate type`
  )
}

function _candidate_chart_style_2(Inputs, candidate_hexmap_2) {
  const radio = Inputs.radio(new Map([
    ["All", "all"],
    ["Major Urban Areas", "major-urban"],
    ["Medium-Sized Cities", "med"],
    ["Rural", "rural"],
    ["Māori Electorates", "māori"],
  ]), { label: "Electorate Type", value: candidate_hexmap_2.start_value });

  radio.addEventListener("input", () => { candidate_hexmap_2.change(radio.value) });
  return radio;
}

function _candidate_votes_legend_2(party_colors, GroupLegend) {
  const parties = ["National Party", "Labour Party", "Green Party", "ACT New Zealand", "New Zealand First Party", "Te Pāti Māori"]
  const scales = parties.map(p => party_colors.scales[p]);
  const titles = parties.map(p => p.replace(" Party", ""))
    .map(p => p === "ACT New Zealand" ? "ACT" : p)
    .map(p => p === "New Zealand First" ? "NZ First" : p)
  return GroupLegend(scales, { titles: titles, tickFormat: ".0%", height: 16, width: 32, gapX: 0, gapY: 0, labelGap: 4 })
}

function _candidate_hexmap_2(width, d3, getTooltip, drawExtras, ui_extras_data, drawElectorates, general_elec_data, māori_elec_data) {
  // Dimensions
  const w = width;
  const h = width < 600 ? 500 : 880;

  // Map settings
  const map_type = "hex"
  const data_type = "candidate"
  const elec_highlight = "all"

  // Transforms
  const scale = width < 600 ? 0.4 : 0.7;
  const me_translate = map_type === "geo" ? { x: 40, y: 150 } : map_type === "hex" ? { x: 40, y: 280 } : { x: 0, y: 0 }

  // Create SVG
  const svg = d3.create('svg').attr("width", w).attr("height", h)
  const node = svg.append('g')

  // Create tooltip
  const tooltip = getTooltip();

  // Add Data - General & Māori Electorate
  const extras_bg_node = node.append('g').attr("id", "extras-bg");
  drawExtras(extras_bg_node, ui_extras_data, map_type, true, scale);
  const general_node = node.append('g').attr("id", "general-seats");
  drawElectorates(general_node, general_elec_data, map_type, data_type, tooltip, scale);
  const māori_node = node.append('g').attr("id", "maori-seats");
  drawElectorates(māori_node, māori_elec_data, map_type, data_type, tooltip, scale, me_translate);
  const extras_node = node.append('g').attr("id", "extras")
  drawExtras(extras_node, ui_extras_data, map_type, false, scale)


  // Change function
  const speed = 750;
  const lag = 150;
  function change(v) {

    const showGen = (d) => (v === "all" || v === d.electorate_type);
    general_node.selectAll('path')
      .style('pointer-events', 'none')
      .transition()
      .duration(speed)
      .delay(d => showGen(d) ? lag : 0)
      .attr("fill-opacity", d => showGen(d) ? 1 : 0.05)
      .on("end", d => showGen(d) ? d3.selectAll(`#${d.id}`).style('pointer-events', 'unset') : null);

    const showMāo = d => (v === "all" || v === "māori");
    māori_node.selectAll('path')
      .style('pointer-events', 'none')
      .transition()
      .duration(speed)
      .delay(d => showMāo(d) ? lag : 0)
      .attr("fill-opacity", d => showMāo(d) ? 1 : 0.05)
      .on("end", d => showMāo(d) ? d3.selectAll(`#${d.id}`).style('pointer-events', 'unset') : null);
  }

  // Return node
  return Object.assign(svg.node(), { change, start_value: elec_highlight });
}


// ------------------- SECTION 3: PARTY VOTES ------------------- //
function _md_3(md) {
  return (
    md`## Party Vote (Total Votes)`
  )
}

function _md_4(md, d3, national_lean) {
  let lean_pct = d3.format(".1%")(national_lean.normalised_lean)
  let right_votes = d3.format(",")(national_lean.right_votes)
  let left_votes = d3.format(",")(national_lean.left_votes)
  let other_votes = d3.format(",")(national_lean.other_votes)
  let right_pct = d3.format(".2%")(national_lean.right_votes / national_lean.total)
  let left_pct = d3.format(".2%")(national_lean.left_votes / national_lean.total)

  return (
    md`The nation gave **${lean_pct} of the vote to the right**, with:
- **${right_votes}** _(${right_pct})_ votes to National, ACT, & NZ First
- **${left_votes}** _(${left_pct})_ votes to Labour, Greens & Te Pāti Māori

_**Note**: this excludes the ${other_votes} votes given to third parties outside parliament_`
  )
}

function _party_chart_style(Inputs, party_chart) {
  const radio = Inputs.radio(new Map([
    ["Zoomed Cities Map", "zoomed"],
    ["Geographic Map", "geo"],
    ["Hexamap", "hex"]
  ]), { label: "Chart style", value: party_chart.start_value });
  radio.oldValue = party_chart.start_value

  radio.addEventListener("input", () => { party_chart.change(radio.value, radio.oldValue); radio.oldValue = radio.value; });
  return radio;
}

function _party_vote_legend(d3, Legend) {
  const fmtr = d3.format(".0%")
  return Legend(d3.scaleSequential([.2, .8], d3.interpolateRdBu), {
    title: "Combined Left / Right party vote totals",
    tickFormat: (d) => d === 0.5 ? "50/50 split" : d < 0.5 ? `${fmtr(Math.abs(1 - d))} left` : `${fmtr(d)} right`,
    // ticks: 8,
    // width: Math.min(width, 750),
    marginLeft: 9,
    height: 55
  })
}

function _party_chart(drawMap) {
  return (
    drawMap("party", "zoomed")
  )
}


// ------------------- SECTION 4: PARTY VOTE RELATIVE LEAN ------------------- //
function _md_5(md) {
  return (
    md`## Party Vote (Relative Lean)`
  )
}

function _md_6(md) {
  return (
    md`This compares the total party votes in each electorate versus the country as a whole
* Right-leaning electorates gave **more** than 55.9% of their vote to right parties
* Left-leaning electorates gave **less** than 55.9% of their vote to right parties`
  )
}

function _rel_party_chart_style(Inputs, rel_party_chart) {
  const radio = Inputs.radio(new Map([
    ["Zoomed Cities Map", "zoomed"],
    ["Geographic Map", "geo"],
    ["Hexamap", "hex"]
  ]), { label: "Chart style", value: rel_party_chart.start_value });
  radio.oldValue = rel_party_chart.start_value

  radio.addEventListener("input", () => { rel_party_chart.change(radio.value, radio.oldValue); radio.oldValue = radio.value; });
  return radio;
}

function _rel_party_vote_legend(d3, Legend) {
  const fmtr = d3.format(".0%")
  return Legend(d3.scaleSequential([-0.2, 0.2], d3.interpolateRdBu), {
    title: "Left / Right party vote lean compared to national average",
    tickFormat: (d) => {
      if (d === 0) return "Same as nation"
      const text = d < 0 ? "left" : "right"
      const extra = Math.abs(d) >= 0.2 ? ">" : ""
      return `${extra}${fmtr(Math.abs(d))} more ${text}`
    },
    // ticks: 8,
    // width: Math.min(width, 750),
    marginLeft: 20,
    height: 55
  })
}

function _rel_party_chart(drawMap) {
  return (
    drawMap("rel_party", "hex")
  )
}


// Lil extra - not actually used for anything yet
function _cand_data(party_colors, vote_data) {
  const party_order = Object.keys(party_colors.singles)

  return Object.keys(vote_data).reduce((acc, k) => {
    let votes = vote_data[k].candidate_votes?.filter(d => !!d).map(d => ({ ...d, electorate: k }))
    if (!!votes) {
      votes = votes.filter(d => !!d.votes && !!d.electorate && !!d.party)
      votes.sort((a, b) => party_order.indexOf(a.party) - party_order.indexOf(b.party))
      acc = [...votes, ...acc]
    }
    return acc
  }, [])
}



// ------------------- INNER WORKINGS!!! ------------------- //
// The logic where stuff actually gets done.
function _drawMap(width, d3, getTooltip, drawExtras, ui_extras_data, drawElectorates, general_elec_data, māori_elec_data, flubber) {
  return (
    function drawMap(data_type, map_type) {
      // data_type = 'area_type' | 'candidate' | 'party' | 'rel_party'
      // map_type = 'geo' | 'hex' | 'zoomed'

      // Dimensions
      const w = width;
      const h = width < 600 ? 510 : 900;

      // Transforms
      const scale = width < 600 ? 0.4 : 0.7;
      const me_translate = map_type === "geo" ? { x: 40, y: 0 } : map_type === "hex" ? { x: 40, y: 280 } : { x: 0, y: 0 }
      const ge_translate = map_type === "geo" ? { x: -75, y: -10 } : map_type === "hex" ? { x: 0, y: 0 } : { x: 0, y: 0 }

      // Create SVG
      const svg = d3.create('svg').attr("width", w).attr("height", h)
      const node = svg.append('g')

      // Create tooltip
      const tooltip = getTooltip(data_type);

      // Add Data - General & Māori Electorate
      const extras_bg_node = node.append('g').attr("id", "extras-bg");
      drawExtras(extras_bg_node, ui_extras_data, map_type, true, scale);
      const general_node = node.append('g').attr("id", "general-seats");
      drawElectorates(general_node, general_elec_data, map_type, data_type, tooltip, scale, ge_translate);
      const māori_node = node.append('g').attr("id", "maori-seats");
      drawElectorates(māori_node, māori_elec_data, map_type, data_type, tooltip, scale, me_translate);
      const extras_node = node.append('g').attr("id", "extras")
      drawExtras(extras_node, ui_extras_data, map_type, false, scale)

      // Change function
      const speed = 3000;
      const transition_detail = 70; // (lower => more detail + slower)

      function change(value, oldValue) {
        const getStart = d => oldValue === "geo" ? d.geo_path : oldValue === "hex" ? d.hex_path : d.zoom_path;
        const getEnd = d => value === "geo" ? d.geo_path : value === "hex" ? d.hex_path : d.zoom_path;
        const me_translate = value === "geo" ? { x: 20, y: -20 } : value === "hex" ? { x: 40, y: 280 } : { x: 0, y: 0 };
        const ge_translate = value === "geo" ? { x: -75, y: -10 } : value === "hex" ? { x: 0, y: 0 } : { x: 0, y: 0 }
        const stroke_width = value === "hex" ? 6 : 4;
        const options = { maxSegmentLength: transition_detail };
        const extra_opacity = value === "zoomed" ? 1 : 0;
        const extra_delay = value === "zoomed" ? 1000 : 0;

        general_node.selectAll('path')
          .style('pointer-events', 'none')
          .transition().duration(speed)
          .style("transform", `scale(${scale}) translate(${ge_translate.x}px, ${ge_translate.y}px)`)
          .attr("stroke-width", stroke_width)
          .attrTween("d", d => flubber.interpolate(getStart(d), getEnd(d), options))
          .on("end", d => general_node.select(`#${d.id}`).style('pointer-events', 'unset'));
        māori_node.selectAll('path')
          .style('pointer-events', 'none')
          .transition().duration(speed)
          .style("transform", `scale(${scale}) translate(${me_translate.x}px, ${me_translate.y}px)`)
          .attr("stroke-width", stroke_width)
          .attrTween("d", d => flubber.interpolate(getStart(d), getEnd(d), options))
          .on("end", d => māori_node.select(`#${d.id}`).style('pointer-events', 'unset'));
        extras_bg_node.selectAll('circle')
          .transition().delay(extra_delay).duration(speed)
          .style("opacity", extra_opacity);
        extras_node.selectAll('circle')
          .transition().delay(extra_delay).duration(speed)
          .style("opacity", extra_opacity);
        extras_node.selectAll('path')
          .transition().delay(extra_delay).duration(speed)
          .style("opacity", extra_opacity);
      }

      // Return node
      return Object.assign(svg.node(), { change, start_value: map_type });
    }
  )
}

function _drawElectorates(getFill, d3, tooltipFns) {
  return (
    function drawElectorates(node, data, map_type, data_type, tooltip, scale, translate = { x: 0, y: 0 }) {
      const stroke_width = map_type === "hex" ? 6 : 4;
      const stroke = 'white';
      const getPath = d => map_type === "geo" ? d.geo_path : map_type === "hex" ? d.hex_path : d.zoom_path;

      node.selectAll('path')
        .data(data)
        .enter()
        .append('path')
        .attrs(d => ({ 'id': d.id, 'd': getPath(d) }))
        .attrs(d => ({ 'fill': getFill(d, data_type), 'stroke': stroke, 'stroke-opacity': "1", 'stroke-width': stroke_width }))
        .styles({ "transform": `scale(${scale}) translate(${translate.x}px, ${translate.y}px)`, "paint-order": "stroke" })
        .on("mouseover", (e, d) => {
          d3.select(e.target)
            .attr("fill", getFill(d, data_type, true))
            .attr("stroke", "black")
            .raise()
          tooltipFns.show(tooltip)
        })
        .on("mousemove", (e, d) => {
          tooltipFns.update(tooltip, data_type, e, d);
        })
        .on("mouseleave", (e, d) => {
          d3.select(e.target)
            .attr("fill", getFill(d, data_type))
            .attr("stroke", stroke)
          tooltipFns.hide(tooltip)
        })
    }
  )
}

function _getFill(vote_data, party_colors, d3) {
  return (
    function getFill(d, data_type, highlight = false) {
      try {

        // Electorate "Types"
        if (data_type === "area_type") {
          const elect_type = d.seat_type === "general" ? d.electorate_type : d.seat_type
          if (highlight) {
            return {
              "māori": "#edd4d4", // brown
              "rural": "#cce6cc", // green
              "major-urban": "#e6cce6", // purple 
              "med": "#ffedcc" // orange
            }[elect_type]
          }
          return {
            "māori": "brown",
            "rural": "green",
            "major-urban": "purple",
            "med": "orange"
          }[elect_type]
        }

        // Candidate votes
        if (data_type === "candidate") {
          const candidate_list = vote_data[d.name].candidate_votes
          const winner = candidate_list[0]
          const margin = (winner.percentage - candidate_list[1].percentage) / 100
          const colorFn = party_colors.scales[winner.party]
          return colorFn(margin)
        }

        // Party votes
        if (data_type === "party") {
          const lean = vote_data[d.name].party_vote_lean.normalised_lean
          const colorScheme = d3.scaleSequential().domain([.2, .8]).interpolator(d3.interpolateRdBu)
          return colorScheme(lean)
        }

        // Party Lean
        if (data_type === "rel_party") {
          const lean = vote_data[d.name].party_vote_lean.relative_lean
          const scheme = d3.scaleSequential().domain([-.2, .2]).interpolator(d3.interpolateRdBu);
          return scheme(lean)
        }

      } catch {
        return "#999"
      }
    }
  )
}

function _colorIsDark(d3) {
  return (
    function colorIsDark(bgColor) {
      let color = d3.color(bgColor).hex().substring(1, 7);
      let r = parseInt(color.substring(0, 2), 16); // hexToR
      let g = parseInt(color.substring(2, 4), 16); // hexToG
      let b = parseInt(color.substring(4, 6), 16); // hexToB
      let L = (r * 0.299) + (g * 0.587) + (b * 0.114);
      return L <= 186;
    }
  )
}

function _party_colors(d3, createColorScale) {
  return (
    {
      scales: {
        "National Party": d3.scaleThreshold().domain([.05, .1, .15, .2])
          .range(["#CCEBFE", "#7DC0FE", "#3F87E5", "#004DCC", "#000099"]),
        "Labour Party": d3.scaleThreshold().domain([.05, .1, .15, .2])
          .range(["#FFCBCD", "#FE7D80", "#E53F41", "#CB0002", "#800000"]),
        "Green Party": d3.scaleThreshold().domain([.05, .1, .15, .2])
          .range(["#65FC9F", "#34D371", "#03AA43", "#02772F", "#015321"]),
        "ACT New Zealand": d3.scaleThreshold().domain([.05, .1, .15, .2])
          .range([d3.color("#FFFF59").brighter(1), "#FFFF59", "#FDEC3E", "#FDC63C", "#FF9E00"]),
        "The Opportunities Party (TOP)": createColorScale("#09B598"),
        "New Zealand First Party": createColorScale("#444"),
        "Te Pāti Māori": createColorScale("#C57E1D"),
      },
      singles: {
        // Main / Minor Parties
        "National Party": "#00529F",
        "Labour Party": "#D82A20",
        "Green Party": "#098137",
        "ACT New Zealand": "#FDE401",
        "The Opportunities Party (TOP)": "#09B598",
        "New Zealand First Party": "#000000",
        "Te Pāti Māori": "#B2001A",
        // Bucket Colors
        "Independent": "#888",
        "Informal Votes": "#fff",
        "Others": "#999",
        // Cookers
        "Aotearoa Legalise Cannabis Party": "darkgreen",
        "Animal Justice Party ": "#5E559E",
        "Rock the Vote NZ": "#012064",
        "New Nation Party": "#4646B2",
        "NewZeal": "#28CEDC",
        "DemocracyNZ": "#31A5A5",
        "Leighton Baker Party": "#21a901",
        "Leighton Baker": "#21a901",
        "New Zealand Loyal": "#fcc74b",
        "NZ Loyal": "#fcc74b",
        "New Conservatives": "#00AEEF",
        "NZ Outdoors & Freedom Party": "#008000",
        "Vision New Zealand": "#095B7E",
        "Republic of New Zealand Party": "#94D8C9",
        "Money Free Party NZ": "#F8CA4D",
        "Protect and Prosper New Zealand": "#C2CFD7",
        "Progressive Aotearoa New Zealand": "#822472",
        "Northland Party": "#426F12",
        "Workers Now": "#A62A26",
        "Future Youth Party": "#FC1693",
        "New Zealand Sovereignty Party": "#F2AF17",
        "Freedoms NZ": "#95278A",
        "Women’s Rights Party": "#9C27B0",
        "New World Order McCann Party ": "#888",
        "Economic Euthenics ": "#888",
        "NAP": "#888",
        "Human Rights Party": "#888"
      }
    }
  )
}

function _createColorScale(d3) {
  return (
    function createColorScale(color) {
      const c = d3.hsl(d3.color(color))
      const brightest = c.brighter(2).hex() === "#ffffff" ? c.brighter(1.5) : c.brighter(2)
      return d3.scaleThreshold()
        .domain([.05, .1, .15, .2])
        .range([brightest, c.brighter(1), c, c.darker(1), c.darker(2)])
    }
  )
}

function _drawExtras(d3) {
  return (
    function drawExtras(node, data, map_type, background = false, scale) {
      const opacity = map_type === "zoomed" ? 1 : 0

      // Draw bigs
      if (background) {
        node.selectAll('circle')
          .data(data['zoom-bigs'])
          .enter()
          .each(function (d) {
            const g = d3.select(this);
            g.append('circle')
              .attrs({ "cx": d.x, "cy": d.y, "r": d.r, "stroke": "white", "stroke-width": 5, "fill-opacity": 0 })
              .style('opacity', opacity)
              .style('pointer-events', 'none')
              .style("transform", `scale(${scale})`);
            g.append('circle')
              .attrs({ "cx": d.x, "cy": d.y, "r": d.r, "stroke": "black", "stroke-width": 1, "fill-opacity": 0 })
              .style('opacity', opacity)
              .style('pointer-events', 'none')
              .style("transform", `scale(${scale})`);
          });
        return;
      }

      // Draw smalls
      node.selectAll('circle')
        .data(data['zoom-smalls'])
        .enter()
        .each(function (d) {
          const g = d3.select(this);
          g.append('circle')
            .attrs({ "cx": d.x, "cy": d.y, "r": d.r, "stroke": "white", "stroke-width": 5, "fill-opacity": 0 })
            .style('opacity', opacity)
            .style('pointer-events', 'none')
            .style("transform", `scale(${scale})`);
          g.append('circle')
            .attrs({ "cx": d.x, "cy": d.y, "r": d.r, "stroke": "black", "stroke-width": 1, "fill-opacity": 0 })
            .style('opacity', opacity)
            .style('pointer-events', 'none')
            .style("transform", `scale(${scale})`);
        });

      // Draw lines
      node.selectAll('.line')
        .data(data['zoom-lines'])
        .enter()
        .each(function (d) {
          const g = d3.select(this);
          g.append('path')
            .attrs({ 'class': 'line', 'd': d.path, "stroke": "white", "stroke-width": 5 })
            .style('opacity', opacity)
            .style('pointer-events', 'none')
            .style("transform", `scale(${scale})`);
          g.append('path')
            .attrs({ 'class': 'line', 'd': d.path, "stroke": "black" })
            .style('opacity', opacity)
            .style('pointer-events', 'none')
            .style("transform", `scale(${scale})`);
        });

      // Draw outlines
      node.selectAll('.outline')
        .data(data['outlines'])
        .enter()
        .append('path')
        .attrs(d => ({ 'class': 'outline', 'd': d.path, "stroke": "black", "fill-opacity": 0, "stroke-dasharray": "2 2" }))
        .style('pointer-events', 'none')
        .style('opacity', opacity)
        .style("transform", `scale(${scale})`);
    }
  )
}

function _all_candidate_parties(vote_data) {
  return (
    Object.keys(vote_data).map(key => (vote_data[key].candidate_votes ?? []).map(v => v.party)).reduce((acc, d) => {
      d.forEach(i => acc.add(i))
      return acc
    }, new Set())
  )
}

function _all_parties(vote_data) {
  return (
    Object.keys(vote_data).map(key => (vote_data[key].party_votes ?? []).map(v => v.party)).reduce((acc, d) => {
      d.forEach(i => acc.add(i))
      return acc
    }, new Set())
  )
}

function _getTooltip(d3) {
  return (
    function getTooltip(data_type) {
      const id = `tooltip-${data_type}`
      let tooltip = d3.selectAll(`#${id}`)
      tooltip = !tooltip.empty() ? tooltip : d3.select("body").append("div").attr("id", id);
      tooltip.styles({
        "position": "absolute",
        "font-family": "sans-serif",
        "border-radius": "4px",
        "box-shadow": "2px 2px 10px #0006",
        "color": "black",
        "font-size": "15px",
        "background": "white",
        "display": "flex",
        "flex-direction": "column",
        "align-items": "left",
        "padding": "8px 16px",
        "display": "none",
        // "width": data_type === "area_type" ? "170px" : "310px"
      });
      return tooltip
    }
  )
}

function _tooltipFns(getTooltipHtml, width) {
  return {
    show: (tooltip) => tooltip.style("display", "flex"),
    hide: (tooltip) => tooltip.style("display", "none"),
    update: (tooltip, data_type, e, d) => {
      const [x, y] = [e.pageX, e.pageY]
      tooltip.html(getTooltipHtml(d, data_type))
      const tooltip_w = tooltip.node().getBoundingClientRect().width;
      const min_left = 4
      const max_left = width - tooltip_w
      const left = x - (tooltip_w / 2)
      tooltip.styles({
        "left": Math.min(max_left, Math.max(min_left, left)) + "px",
        "top": y + 20 + "px"
      })
    }
  }
}

function _getTooltipHtml(getFill, d3, label_maps, vote_data, party_colors, colorIsDark) {
  return (
    function getTooltipHtml(d, data_type) {
      const bgColor = getFill(d, data_type)
      const dot_styles = { 'width': '16px', 'height': '16px', 'border-radius': '24px', 'background': bgColor, 'display': 'inline-block', 'margin-right': '6px' }
      const title_styles = { 'font-size': '20px', 'font-weight': 700 }
      const subtitle_styles = { 'opacity': 0.6, 'font-size': '16px' }
      const table_styles = { 'margin-bottom': '4px', 'margin-top': '4px', 'border-collapse': 'collapse', 'width': '100%', 'text-align': 'left' }
      const root_width = data_type === "area_type" ? "170px" : "310px"

      // Set up body
      const root = d3.create("div").style('width', root_width)
      const t1 = root.append("div")
      const t2 = root.append("div")

      // Add main title
      t1.append('span').styles(dot_styles)
      t1.append('span').text(d.name).styles(title_styles)

      try {

        // 1. "Area type" tooltip
        if (data_type === "area_type") {
          const subtitle = label_maps.areas[d.electorate_type ?? d.seat_type]
          t2.text(subtitle).styles(subtitle_styles)
          return root.html()
        }


        // 2. Candidate vote tooltip
        if (data_type === "candidate") {
          // Get data
          const candidate_list = vote_data[d.name].candidate_votes
          const data = candidate_list.reduce((acc, p) => {
            if (!acc.print_party) {
              acc.list[acc.list.length - 1].votes += p.votes
              acc.list[acc.list.length - 1].percentage += p.percentage
              return acc
            }
            acc.list.push(p)
            if (p.party === "Informal Votes") {
              acc.list.push({ name: 'Others', party: '-', votes: 0, percentage: 0 })
              acc.print_party = false
            }
            return acc
          }, { list: [], print_party: true })
          data.list = data.list.filter(d => d.votes > 0)

          // Add subtitle
          const margin = candidate_list[0].percentage - candidate_list[1].percentage
          t2.append("div")
            .html(`${candidate_list[0].party} victory. Margin <b>${d3.format(".2f")(margin)}%</b>.`)
            .styles(subtitle_styles)

          // Add table
          const tbl = t2.append('table').styles(table_styles)
          tbl.append('thead').append('tr').selectAll('th')
            .data(['Candidate', 'Party', 'Votes', '%'])
            .enter().append('th').text(d => d)
          tbl.append('tbody').selectAll('tr')
            .data(data.list).enter()
            .append('tr')
            .styles((d, i) => {
              const color = party_colors.singles[d.party]
              if (i === 0) { return { 'background': color, 'border-left': `solid 4px ${color}` } }
              return { 'border-left': `solid 4px ${color}` }
            })
            .html((d, i) => {
              const c = i === 0 ? colorIsDark(party_colors.singles[d.party]) ? 'white' : 'dark' : ''
              return `
            <td style="color: ${c}; padding-left: 4px">${d.name}</td>
            <td style="color: ${c}">${d.party !== 'Informal Votes' ? label_maps.parties(d.party) : '-'}</td>
            <td style="color: ${c}">${d3.format(',')(d.votes)}</td>
            <td style="color: ${c}; padding-right: 4px">${d.party !== 'Informal Votes' ? d3.format('.1%')(d.percentage / 100) : ''}</td>
          `})
          return root.html()
        }


        // 3. Party vote tooltip
        if (data_type === "party") {
          // Get data
          const party_list = vote_data[d.name].party_votes
          const data = party_list.reduce((acc, p) => {
            if (!acc.print_party) {
              acc.list[acc.list.length - 1].votes += p.votes
              return acc
            }
            acc.list.push(p)
            if (p.party === "Informal Votes") {
              acc.list.push({ party: "Other", votes: 0 })
              acc.print_party = false
            }
            return acc
          }, { list: [], print_party: true })

          // Add subtitle
          const lean_data = vote_data[d.name].party_vote_lean
          const lean = lean_data.lean;
          const lean_text = (lean > 0 ? "Right" : "Left")
          const vote_majority = lean > 0 ? lean_data.right_votes / lean_data.total : lean_data.left_votes / lean_data.total;
          t1.append("div").html(`Combined % ${lean_text.toLowerCase()} parties: <b>${d3.format(".2f")(vote_majority * 100)}%</b>`).styles(subtitle_styles)

          // Add table
          const tbl = t2.append('table').styles(table_styles)
          tbl.append('thead').append('tr').selectAll('th')
            .data(['Party', 'Votes'])
            .enter().append('th').text(d => d)
          tbl.append('tbody').selectAll('tr')
            .data(data.list).enter()
            .append('tr')
            .styles(d => ({ 'border-left': `solid 4px ${party_colors.singles[d.party]}` }))
            .html(d => `
              <td style="padding-left: 4px">${d.party}</td>
              <td>${d3.format(',')(d.votes)}</td>
            `)
          return root.html()
        }


        // 4. Party vote relative lean tooltip
        if (data_type === "rel_party") {
          // Get data
          const lean_data = vote_data[d.name].party_vote_lean
          const data = [
            { name: '"Left"', votes: lean_data.left_votes, color: '#D77B64' },
            { name: '"Right"', votes: lean_data.right_votes, color: '#65A7CE' },
            // { name: '"Other"', votes: lean_data.other_votes, color: '#EEEEEE' },
          ]
          data.sort((a, b) => b.votes - a.votes)

          // Add subtitle
          const lean = lean_data.relative_lean;
          const amount = Math.abs(lean) < 0.001 ? "<0.1%" : d3.format(".1%")(Math.abs(lean))
          t2.append("span").html(`<b>${amount} <u>${lean > 0 ? "right" : "left"}</u></b> of the national average.`).styles(subtitle_styles)

          // Add table
          const tbl = t2.append('table').styles(table_styles)
          tbl.append('thead').append('tr').selectAll('th')
            .data(['Alignment', 'Votes', '%'])
            .enter().append('th').text(d => d)
          tbl.append('tbody').selectAll('tr')
            .data(data).enter()
            .append('tr')
            .styles(d => ({ 'border-left': `solid 4px ${d.color}` }))
            .html(d => `
              <td style="padding-left: 4px">${d.name}</td>
              <td>${d3.format(',')(d.votes)}</td>
              <td>${d3.format('.1%')(d.votes / lean_data.total)}</td>
            `)
          return root.html()
        }

      } catch {
        root.style('width', '170px')
        t2.text("No data")
      }

      return root.html()
    }
  )
}

function _label_maps() {
  return (
    {
      areas: {
        "māori": "Māori electorate",
        "major-urban": "Major urban electorate",
        "rural": "Rural electorate",
        "med": "Medium-sized city electorate"
      },
      parties: n => {
        const map = {
          "National Party": "National",
          "Labour Party": "Labour",
          "Green Party": "Green",
          "ACT New Zealand": "ACT",
          "New Zealand First Party": "NZ First",
          "Vision New Zealand": "Vision NZ",
          "New Zealand Loyal": "NZ Loyal",
          "The Opportunities Party (TOP)": "TOP",
          "Aotearoa Legalise Cannabis Party": "Cannabis",
          "NZ Outdoors & Freedom Party": "Outdrs/Frdm",
          "Money Free Party NZ": "Money Free",
          "Animal Justice Party": "Animal Just.",
          "Progressive Aotearoa New Zealand": "Prog. NZ",
          "New Nation Party": "New Nation",
          "New Zealand Sovereignty Party": "NZ Sove.",
          "New World Order McCann Party": "NWO McCann",
          "Republic of New Zealand Party": "Republic of NZ",
          "Future Youth Party": "Future Youth",
          "New Conservatives": "New Cons.",
          "Rock the Vote NZ": "Rock. Vote",
          "Protect and Prosper New Zealand": "Prot. & Pros.",
          "DemocracyNZ": "Dem. NZ",
          "Northland Party": "Northland",
          "Human Rights Party": "Hum. Rights",
          "Independent": "Indep.",
          "Leighton Baker Party": "Leigh. Baker",
          "Economic Euthenics": "Eco. Euth."
        }
        try {
          return map[n.trim()] ?? n
        } catch {
          return n
        }
      }
    }
  )
}


// ------------------- IMPORTS ------------------- //
function _d3(require) {
  return (
    require.alias({ 'd3-selection': 'd3', 'd3-transition': 'd3' })('d3', 'd3-selection-multi')
  )
}

function _flubber(require) {
  return (
    require("flubber")
  )
}


// ------------------- FILES ------------------- //
function _general_elec_data(FileAttachment) {
  return (
    FileAttachment("general_elects_simplified.json").json()
  )
}

function _māori_elec_data(FileAttachment) {
  return (
    FileAttachment("māori_elects_simplified.json").json()
  )
}

function _ui_extras_data(FileAttachment) {
  return (
    FileAttachment("zoomed_extras.json").json()
  )
}


// =================== MAIN =================== //
export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  
  // Add file attachments
  const fileAttachments = new Map([
    ["general_elects_simplified.json", { url: new URL("./files/general_elects_simplified.json", import.meta.url), mimeType: "application/json", toString }],
    ["māori_elects_simplified.json", { url: new URL("./files/māori_elects_simplified.json", import.meta.url), mimeType: "application/json", toString }],
    ["zoomed_extras.json", { url: new URL("./files/zoomed_extras.json", import.meta.url), mimeType: "application/json", toString }]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));

  // Section 1 - Geo vs Hex Map
  main.variable(observer("md_1")).define("md_1", ["md", "general_elec_data", "māori_elec_data"], _md_1);
  main.variable(observer("viewof chart_style")).define("viewof chart_style", ["Inputs", "chart"], _chart_style);
  main.variable(observer("chart_style")).define("chart_style", ["Generators", "viewof chart_style"], (G, _) => G.input(_));
  main.variable(observer("area_types_swatches")).define("area_types_swatches", ["getFill", "Swatches", "d3"], _area_types_swatches);
  main.variable(observer("chart")).define("chart", ["drawMap"], _chart);

  // Section 2 - Candidate Votes
  main.variable(observer("md_2")).define("md_2", ["md"], _md_2);
  main.variable(observer("viewof candidate_chart_style")).define("viewof candidate_chart_style", ["Inputs", "candidate_hexmap"], _candidate_chart_style);
  main.variable(observer("candidate_chart_style")).define("candidate_chart_style", ["Generators", "viewof candidate_chart_style"], (G, _) => G.input(_));
  main.variable(observer("candidate_votes_legend")).define("candidate_votes_legend", ["party_colors", "GroupLegend"], _candidate_votes_legend);
  main.variable(observer("candidate_hexmap")).define("candidate_hexmap", ["drawMap"], _candidate_hexmap);
  
  // For later - Candidate Votes, isolated by electorate type
  // main.variable(observer("x")).define("x", ["md"], _x);
  // main.variable(observer("viewof candidate_chart_style_2")).define("viewof candidate_chart_style_2", ["Inputs", "candidate_hexmap_2"], _candidate_chart_style_2);
  // main.variable(observer("candidate_chart_style_2")).define("candidate_chart_style_2", ["Generators", "viewof candidate_chart_style_2"], (G, _) => G.input(_));
  // main.variable(observer("candidate_votes_legend_2")).define("candidate_votes_legend_2", ["party_colors", "GroupLegend"], _candidate_votes_legend_2);
  // main.variable(observer("candidate_hexmap_2")).define("candidate_hexmap_2", ["width", "d3", "getTooltip", "drawExtras", "ui_extras_data", "drawElectorates", "general_elec_data", "māori_elec_data"], _candidate_hexmap_2);
  
  // Section 3 - Party Votes
  main.variable(observer("md_3")).define("md_3", ["md"], _md_3);
  main.variable(observer("md_4")).define("md_4", ["md", "d3", "national_lean"], _md_4);
  main.variable(observer("viewof party_chart_style")).define("viewof party_chart_style", ["Inputs", "party_chart"], _party_chart_style);
  main.variable(observer("party_chart_style")).define("party_chart_style", ["Generators", "viewof party_chart_style"], (G, _) => G.input(_));
  main.variable(observer("party_vote_legend")).define("party_vote_legend", ["d3", "Legend"], _party_vote_legend);
  main.variable(observer("party_chart")).define("party_chart", ["drawMap"], _party_chart);
  
  // Section 4 - Party Vote Lean
  main.variable(observer("md_5")).define("md_5", ["md"], _md_5);
  main.variable(observer("md_6")).define("md_6", ["md"], _md_6);
  main.variable(observer("viewof rel_party_chart_style")).define("viewof rel_party_chart_style", ["Inputs", "rel_party_chart"], _rel_party_chart_style);
  main.variable(observer("rel_party_chart_style")).define("rel_party_chart_style", ["Generators", "viewof rel_party_chart_style"], (G, _) => G.input(_));
  main.variable(observer("rel_party_vote_legend")).define("rel_party_vote_legend", ["d3", "Legend"], _rel_party_vote_legend);
  main.variable(observer("rel_party_chart")).define("rel_party_chart", ["drawMap"], _rel_party_chart);
  
  // Loner unsed thing atm
  main.variable(observer("cand_data")).define("cand_data", ["party_colors", "vote_data"], _cand_data);

  // Importing data from other notebook
  const data_proc = runtime.module(election_data_module);
  main.import("vote_data", data_proc);
  main.import("national_lean", data_proc);

  // Inner workings
  main.variable(observer("general_elec_data")).define("general_elec_data", ["FileAttachment"], _general_elec_data);
  main.variable(observer("māori_elec_data")).define("māori_elec_data", ["FileAttachment"], _māori_elec_data);
  main.variable(observer("ui_extras_data")).define("ui_extras_data", ["FileAttachment"], _ui_extras_data);
  main.variable(observer("drawMap")).define("drawMap", ["width", "d3", "getTooltip", "drawExtras", "ui_extras_data", "drawElectorates", "general_elec_data", "māori_elec_data", "flubber"], _drawMap);
  main.variable(observer("drawElectorates")).define("drawElectorates", ["getFill", "d3", "tooltipFns"], _drawElectorates);
  main.variable(observer("getFill")).define("getFill", ["vote_data", "party_colors", "d3"], _getFill);
  main.variable(observer("colorIsDark")).define("colorIsDark", ["d3"], _colorIsDark);
  main.variable(observer("party_colors")).define("party_colors", ["d3", "createColorScale"], _party_colors);
  main.variable(observer("createColorScale")).define("createColorScale", ["d3"], _createColorScale);
  main.variable(observer("drawExtras")).define("drawExtras", ["d3"], _drawExtras);
  main.variable(observer("all_candidate_parties")).define("all_candidate_parties", ["vote_data"], _all_candidate_parties);
  main.variable(observer("all_parties")).define("all_parties", ["vote_data"], _all_parties);
  main.variable(observer("getTooltip")).define("getTooltip", ["d3"], _getTooltip);
  main.variable(observer("tooltipFns")).define("tooltipFns", ["getTooltipHtml", "width"], _tooltipFns);
  main.variable(observer("getTooltipHtml")).define("getTooltipHtml", ["getFill", "d3", "label_maps", "vote_data", "party_colors", "colorIsDark"], _getTooltipHtml);
  main.variable(observer("label_maps")).define("label_maps", _label_maps);
  
  // Imports - NPM packages
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("flubber")).define("flubber", ["require"], _flubber);
  
  // Imports - Legends from other notebooks
  const color_legend = runtime.module(color_legend_module);
  main.import("Legend", color_legend);
  main.import("Swatches", color_legend);
  const group_legend = runtime.module(group_legend_module);
  main.import("GroupLegend", group_legend);

  return main;
}
