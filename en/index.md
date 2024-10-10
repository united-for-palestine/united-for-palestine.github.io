# United for Palestine

## Events

{% for event in collections.home_event | reverse %}

<article>

### [{{event.data.title}}]({{event.url}})

{{event.data.deck}}

</article>

{% endfor %}

[More events](/en/event)

## Posts

{% for post in collections.home_post %}
<article>

### [{{post.data.title}}]({{post.url}})

{{post.data.deck}}

</article>

{% endfor %}

[More posts](/en/post)

## Chapters

{% for chapter in collections.chapter %}
- [{{chapter.data.title}}]({{chapter.url}}){% endfor %}

## About

United for Palestine is an inclusive grassroots movement of organizers in Cyprus
who stand in solidarity with the Palestinian people. Our mission is to support
the liberation of Palestine, raise awareness of Israel’s genocide and apartheid
against Palestinians, and drive meaningful change within Cyprus.

## Resources

- [Know Your Rights PDF](/asset/Leaflet_know_your_rights_EN.pdf)
- [How you can boycott Israel](https://bdsmovement.net/)
- [Chants or Slogans](./chants-or-slogans)
- [RSS Feed](/en/feed.xml)
