<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/analytics](./analytics.md) &gt; [EventPayload](./analytics.eventpayload.md)

## EventPayload interface

The payload accepted by the Analytics Events API.

<b>Signature:</b>

```typescript
export interface EventPayload 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [action](./analytics.eventpayload.action.md) | [Action](./analytics.action.md) | The user action which caused the event, e.g. ADD\_TO\_CART or THUMBS\_UP |
|  [authorization?](./analytics.eventpayload.authorization.md) | string | <i>(Optional)</i> The authorization token for the request. This will be setup from the Key or Bearer in the config. |
|  [bot?](./analytics.eventpayload.bot.md) | boolean | <i>(Optional)</i> Whether the event is the result of bot activity. |
|  [browserAgent?](./analytics.eventpayload.browseragent.md) | { browser?: string; browserVersion?: string; os?: string; osVersion?: string; device?: string; deviceClass?: string; userAgent?: string; } | <i>(Optional)</i> Information about the visitors device and browser. |
|  [chat?](./analytics.eventpayload.chat.md) | { botId: string; conversationId?: string; responseId?: string; } | <i>(Optional)</i> Fields specific to reporting Chat Analytics Events |
|  [clientSdk?](./analytics.eventpayload.clientsdk.md) | Record&lt;string, string&gt; | <i>(Optional)</i> For the Yext client SDKs involved in the event, this is an object mapping the names of those SDKs to the version labels of those SDKs. |
|  [count?](./analytics.eventpayload.count.md) | number | <i>(Optional)</i> When the record summarizes multiple events, the number of events the record represents. The event is treated as if it is duplicated this many times. |
|  [customTags?](./analytics.eventpayload.customtags.md) | Record&lt;string, string&gt; | <i>(Optional)</i> Up to 10 pairs matching custom string keys to string values to associate with the event. Keys are case-insensitive; values are case-sensitive. |
|  [customValues?](./analytics.eventpayload.customvalues.md) | Record&lt;string, number&gt; | <i>(Optional)</i> Up to 10 pairs matching custom string keys to number values to associate with the event. Keys are case-insensitive. |
|  [destinationUrl?](./analytics.eventpayload.destinationurl.md) | string | <i>(Optional)</i> The URL of the page the event is directing the visitor to. |
|  [entity?](./analytics.eventpayload.entity.md) | { entityId: string; } \| { entityUid: number; } | <i>(Optional)</i> The Yext entity to which the event corresponds. |
|  [internalUser?](./analytics.eventpayload.internaluser.md) | boolean | <i>(Optional)</i> Indicates whether the event is the result of internal activity. |
|  [ip?](./analytics.eventpayload.ip.md) | { address: string; algorithm?: string; } | <i>(Optional)</i> The IP address for the event. |
|  [label?](./analytics.eventpayload.label.md) | string | <i>(Optional)</i> A label assigned to the event, e.g. a CTA label. |
|  [locale?](./analytics.eventpayload.locale.md) | string | <i>(Optional)</i> The locale of the user who generated the event. |
|  [pageUrl?](./analytics.eventpayload.pageurl.md) | string | <i>(Optional)</i> The URL of the page where the event occurred |
|  [referrerUrl?](./analytics.eventpayload.referrerurl.md) | string | <i>(Optional)</i> The URL of the page which the visitor came from prior to the event. |
|  [sessionId?](./analytics.eventpayload.sessionid.md) | string \| null | <i>(Optional)</i> Unique identifier to tie together events in a single browsing session |
|  [timestamp?](./analytics.eventpayload.timestamp.md) | Date \| string | <i>(Optional)</i> The timestamp at which the event occurred, in ISO format. |
|  [visitor?](./analytics.eventpayload.visitor.md) | Record&lt;string, string&gt; | <i>(Optional)</i> Information used to associate analytics with a particular user. |
