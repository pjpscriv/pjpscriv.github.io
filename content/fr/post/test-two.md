---
date: '2025-09-09T19:01:00-04:00'
title: "Une deuxieme test en français"
---

Cette deuxième page de test !

À quoi ressemble le formatage en ligne ? Est-ce que ça a l'air bien ? Vérifions.

Voici un `filename.txt`. Et voici `anotherOne.css`. En voici un qui est [`also-a-link.html`](/)

Voilà, c'est mieux.

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


