<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/analytics](./analytics.md) &gt; [SearchAnalyticsService](./analytics.searchanalyticsservice.md) &gt; [report](./analytics.searchanalyticsservice.report.md)

## SearchAnalyticsService.report() method

Reports an analytics event. Will perform a promise rejection if the API response contains an error.

<b>Signature:</b>

```typescript
report(event: SearchAnalyticsEvent, additionalRequestAttributes?: AnalyticsPayload): Promise<void>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  event | [SearchAnalyticsEvent](./analytics.searchanalyticsevent.md) | The [SearchAnalyticsEvent](./analytics.searchanalyticsevent.md) to be sent. |
|  additionalRequestAttributes | [AnalyticsPayload](./analytics.analyticspayload.md) | Additional data included in the network request. |

<b>Returns:</b>

Promise&lt;void&gt;
