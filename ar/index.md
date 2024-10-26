---
title: مؤخرًا
noindex: true
---

{% from 'card.njk' import card %}

{% for event in collections.ar_item | reverse | head(20) %}

  {{card(
    event.data.title,
    content=event.data.description,
    href=event.url,
    lang="en",
    location=event.data.location,
    date=event.date,
    image=event.data.image
  )}}

{% endfor %}

## موارد

- [كيف يمكنك مقاطعة إسرائيل](https://bdsmovement.net/ar)
