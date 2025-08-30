---
title: Πρόσφατος
tags: published
nosocials: true
---

{% from 'card.njk' import card %}

{% for item in collections.el_item | published | reverse | head(20) %}

  {{card(
    item.data.title,
    content=item.data.description,
    href=item.url,
    lang="en",
    location=item.data.location,
    date=item.date,
    image=item.data.image
  )}}

{% endfor %}

## Πόροι

- [Γνωρίστε τα δικαιώματά σας PDF](/asset/Leaflet_know_your_rights_GR.pdf)
