---
title: '{{ replace .File.ContentBaseName "-" " " | title }}'
date: '{{ .Date }}'
img: '{{ .File.ContentBaseName }}.jpg'
draft: true
---

{{<observable-embed
    notebook="@pjpscriv/your-notebook-id"
    cells=`
        viewof input1,
        cell2,
        cell3
    `
>}}
