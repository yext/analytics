<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/analytics](./analytics.md) &gt; [AnalyticsResponse](./analytics.analyticsresponse.md) &gt; [status](./analytics.analyticsresponse.status.md)

## AnalyticsResponse.status property

Indicates whether or not the analytics report was sucessfully queued.

<b>Signature:</b>

```typescript
status: 'success' | 'error';
```

## Remarks

The status will be accurate for all devices which support [Navigator.sendBeacon()](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon)<!-- -->. If the analytics report is fired on Node.js, or IE11, the status will always return 'success'.
