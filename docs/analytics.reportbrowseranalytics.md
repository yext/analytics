<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/analytics](./analytics.md) &gt; [reportBrowserAnalytics](./analytics.reportbrowseranalytics.md)

## reportBrowserAnalytics() function

An alternative entry point for the Yext Analytics Events SDK, currently used by Google Tag Manager. This method reads the config and payload from the variable analyticsEventPayload stored in the global window object. The config and payload are then passed to the report function to be sent to the Yext Analytics Events API.

**Signature:**

```typescript
export declare function reportBrowserAnalytics(): Promise<string>;
```
**Returns:**

Promise&lt;string&gt;
