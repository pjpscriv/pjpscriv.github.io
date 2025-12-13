---
title: 'Observable iFrame Embed Demo 2'
date: '2025-12-13T13:22:05-05:00'
img: 'nz-2026-election.jpg'
draft: false
unlisted: true
---

This is what it looks like split up a bit more:

{{<observable-iframe
    notebook="145c825f4a902622"
    cells=`
        md_1,
        viewof chart_style,
        area_types_swatches,
        chart
    `
>}}


{{<observable-iframe
    notebook="145c825f4a902622"
    cells=`
        md_2,
        viewof candidate_chart_style,
        candidate_votes_legend,
        candidate_hexmap
    `
>}}


{{<observable-iframe
    notebook="145c825f4a902622"
    cells=`
        md_3,
        md_4,
        viewof party_chart_style,
        party_vote_legend,
        party_chart,
    `
>}}



{{<observable-iframe
    notebook="145c825f4a902622"
    cells=`
        md_5,
        md_6,
        viewof rel_party_chart_style,
        rel_party_vote_legend,
        rel_party_chart
    `
>}}