# Yext Analytics

<div>
  <a href="./LICENSE">
    <img src="https://img.shields.io/badge/License-BSD%203--Clause-blue.svg" alt="License"/>
  </a>
  <a href='https://coveralls.io/github/yext/analytics?branch=main'>
    <img src='https://coveralls.io/repos/github/yext/analytics/badge.svg?branch=main' alt='Coverage Status' />
  </a>
</div>
<br>

A Typescript library for sending Yext Analytics events.

[Full Documentation](./docs/analytics.md)

# Yext Analytics
Yext Analytics is a Typescript library for sending analytics events that occur on your digital experiences to the Yext Analytics platform. You can record user actions that we offer out-of-the-box, such as page views and clicks, or custom actions that are unique to your business! Yext uses the same analytics reporting features across Search, Pages, and Chat so these products all use one interface. 

- Works in the **browser** only. 
- 100% **TypeScript**, with detailed analytics event models
- Compatible with both **CommonJS** and **ES6** imports

## Getting Started

First, install the library via [npm](https://www.npmjs.com/get-npm):

```bash
npm install @yext/analytics
```
### Initialize Analytics Reporter

Next, import and initialize the library in your application. When initializing your analytics reporter, you only need to provide an API Key that has access to the Events API. Other attributes such as your business ID will be automatically inferred. You can acquire this API key in the developer console of the Yext Platform.
```ts
import { Analytics } from "@yext/analytics";

// Root analytics service with no defaults.
const rootAnalytics = new Analytics({ key: "MY_API_KEY" }); 
```
In many cases, you might need to repeatedly specify the same properties, such as a Pages site ID or Chat bot ID. Yext Analytics allows you to avoid having to repeatedly specify the same code by allowing you to set **default values**.

You can add a `.with()` method to the root analytics service you initialized, which returns a new analytics object with the specified JSON merged on top of the existing defaults.
```ts
import { Analytics } from "@yext/analytics";

// Root analytics service with no defaults.
const rootAnalytics = new Analytics({ key: "MY_API_KEY" }); 

// Pages analytics service with Pages defaults.
const pageAnalytics = rootAnalytics.with({ pages: { siteId: 123 } }); 

// Chat analytics service with both Chat **and** Pages defaults.
const chatAnalytics = pageAnalytics.with({ chat: { botId: "my-bot" } }); 
```
Calling `pageAnalytics.report()` sends an event with the `pages` object, plus anything passed to `report`. Calling `chatAnalytics.report()` sends an event with both the `pages` and `chat` objects, plus anything passed to `report`. You can override the default values defined in the .with() method by sending them along with the event.

For other configuration features, see [AnalyticsConfig.ts](/docs/analytics.analyticsconfig.md)
### Fire an Event
Now that we’ve initialized our analytics reporter, we can fire an event! This sends a `CHAT_IMPRESSION` event type, along with a `sessionId`, a `pages.siteId`, and a `chat.botId`. 
```ts
chatAnalytics.report({
  action: "CHAT_IMPRESSION"
});
```
### Additional Configuration 
#### Session Tracking
Session tracking is now available for Chat, Pages, and Search. Yext uses a browser-based method (sessionStorage) to track this. By default, session tracking is **enabled** in **both** the US and EU environments. This can be disabled by setting `sessionTrackingEnabled` to `false`.

When `sessionTrackingEnabled` is set to `true`, Analytics will automatically generate a ULID for `sessionId` and bind that ULID to events from the same browser session. Users may also provide their own `sessionId`, which takes precedence over the auto-generated ID by Analytics. [To read more about how we generate ULIDs, check out ulidx.](https://github.com/perry-mitchell/ulidx)

#### Custom Events
You can also send custom analytics events.
```ts
pagesAnalytics.report({
  action: "C_MY_CUSTOM_EVENT"
});
```
Additionally, you can send arbitrary conversion events by specifying a `value` JSON object with a dollar `amount` and a `currency` in ISO format. 
```ts
chatAnalytics.report({
  action: "C_CONVERSION_EVENT"
  value: {
    amount: 10,
    currency: "USD",
  },
});
```
To learn more about sending conversion events, see our [API documentation](https://hitchhikers.yext.com/docs/eventsapis/events/events#operation/sendEvents).

#### Custom Properties
You can attach custom properties to your analytics events by specifying either `customTags` or `customValues` with your request. `customTags` represent up to ten **string** key-value pairs and `customValues` represent up to ten **numeric** key-value pairs.

For example, if I set up an `ORDER` event for my restaurant and wanted to track whether a promotional code was used on the order, I could add an `promoCode` custom tag to the event.
```ts
pagesAnalytics.report({
  action: "C_CONVERSION_EVENT",
  sessionId: "e790f75d-4f1e-4a1b-b57b-9a456019b176",
  value: {
    amount: 35.50,
    currency: "USD",
  },
  customTags: {
      "promoCode": "SPRING15OFF"
  }
});
```
Additionally, if I wanted to record the discount amount of the promotion, I could add a `promoDiscount` custom value to the `ORDER` event.
```ts
pagesAnalytics.report({
  action: "C_CONVERSION_EVENT",
  sessionId: "e790f75d-4f1e-4a1b-b57b-9a456019b176",
  value: {
    amount: 35.50,
    currency: "USD",
  },
  customTags: {
      "promoCode": "SPRING15OFF"
  },
  customValues: {
      "promoDiscount": 41.76
  }
});
```
### Debugging
We use `fetch()` + `keepalive` by default in [supported browsers](https://developer.mozilla.org/en-US/docs/Web/API/fetch) to make debugging easier. For browsers like Firefox that do not support `keepalive`, we use `fetch` only. Be warned, since `forceFetch` uses `fetch()` without `keepalive`, **requests in progress will be canceled if the page is unloaded**.
 

## Module support
- The ESM (ES6) build will be used automatically by module bundlers that support it (e.g. Webpack). It can be specified directly by importing `@yext/analytics/lib/esm`
- The CommonJS build will be used automatically by Node, but it can be specified directly by importing `@yext/analytics/lib/commonjs`

## License

Yext Analytics is an open-sourced library licensed under the [BSD-3 License](./LICENSE).

## Third Party Licenses

The licenses of our 3rd party dependencies are collected here: [THIRD-PARTY-NOTICES](./THIRD-PARTY-NOTICES).

## Appendix 

### Merge Operations
When we merge the JSON, we abide by the following guidelines. For primitives:
* Merging an existing key with null/undefined **deletes the key**.
* Merging an existing key with a non-null value **updates the value**.
* Merging a new key **adds the new value**.

```ts
const x = {
  foo: "bar",
  num: 123,
  baz: "remove me"
}

const y = {
  num: 789,
  bool: True
  baz: null
}

merge(x,y)
/** ---------- Result -------------
 * {
 *   foo: "bar",
 *   num: 789,
 *   bool: True
 * }
 */
```

For objects, we recursively apply the above rules within the object. Merging multi-level objects strictly combines values on a level-by-level basis, so the first level of each JSON is merged, then the next, until there is nothing left to merge.

```ts
const x = {
  foo: {
    bar: {
      baz: 123
    }
  }
}

const y = {
  foo: {
    baz: 789
  }
}

merge(x,y)
/** ---------- Result -------------
 * {
 *   foo: {
 *     bar: {
 *       baz: 123
 *     },
 *     baz: 789
 *   }
 * }
 */
```
