---
date: '2025-09-09T19:01:00-04:00'
title: "Test Two"
---

This second test page!

<!-- TODO: Make syntax highlighting prettier (not just Molokai) -->
<!-- https://gohugo.io/content-management/syntax-highlighting/ -->
```html
{{ range .Pages }}
  <div class="section__item">
    <div class="section__item-head">
      <h4><a href="{{ .RelPermalink }}">{{ .Title }}</a></h4>
      <p class="section__item-period">{{ .Date.Format "Jan 2, 2006" }}</p>
    </div>
    <div class="section__item-content">
      <div>
        <p class="section__item-description">{{ .Summary }}</p>
        <a href="{{ .RelPermalink }}" class="section__view-all">Read More →</a>
      </div>
    </div>
  </div>
{{ else }}
  <p>No posts found.</p>
{{ end }}
```


