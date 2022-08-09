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

## Features

- Works in both the **browser** and **Node.js**
- 100% **TypeScript**, with detailed analytics event models
- Compatible with both **CommonJS** and **ES6** imports

## Getting Started

First, install the library via [npm](https://www.npmjs.com/get-npm):

```bash
npm install @yext/analytics
```

Next, import and initialize the library in your application.  Yext currently has different analytics reporting features 
between Search and Pages and so they have slightly different interfaces for working with them.  There is also a combined
interface that you can use when you are building a Search experience entirely on Pages (e.g. a Locator or a Help Site).

### Search Analytics

```ts
import { provideSearchAnalytics } from '@yext/analytics'; // can also be imported as provideAnalytics

const searchAnalytics = provideSearchAnalytics({
  experienceKey: '<your experience key>',
  experienceVersion: 'PRODUCTION',
  businessId: 123456, // this comes from the url of your Yext account
});
```

To use the library with Node, use the following import instead:
```ts
const { provideSearchAnalytics } = require('@yext/analytics');
``` 

Now that the search analytics reporter is initialized, let's fire off an event:

```ts
searchAnalytics.report({
  type: 'CTA_CLICK',
  entityId: '1',
  verticalKey: 'people',
  searcher: 'VERTICAL',
  queryId: '12345678-1234-1234-1234-123456789012'
});
```

#### Search Analytics Event Types
When specifying the analytics type, either the [SearchAnalyticsEventType](./docs/analytics.searchanalyticseventtype.md) enum
or its corresponding string can be specified. For example, you can specify the 'CTA_CLICK' event with either 'CTA_CLICK' or
with `AnalyticsEventType.CtaClick`. Once the event type is specified, TypeScript is able to enforce the required and
optional properties for that event type.

### Pages Analytics

```ts
import { providePagesAnalytics } from '@yext/analytics';

const pagesAnalytics = providePagesAnalytics({
  debug: false, // enables console debugging logs if set to true
  pageType: {
    pageSetId: 'My  Page Set', // the name of the feature in your features.json or the name of your template file
    id: 90210, // the uid of the entity your page represents
    name: 'static',
  },
  pagesReferrer: 'https://www.google.com', // e.g. document.referrer
  path: '/foo/bar', // e.g. window.location.pathname
  businessId: 12345, // this comes from the url of your Yext account
  production: false, // set to true if you are in the production environment
  siteId: 654321, // the id of your site, you can find this in the url of your deploy page
});
```

Now that the pages analytics reporter is initialized, we can fire a pageview:
```ts
pagesAnalytics.pageView();
```

If a user clicks on a CTA, we can track a CTA Click Event

```ts
import { CtaClick } from '@yext/analytics';

pagesAnalytics.track(CtaClick);
```

We can also fire an event on any other type of user interaction and give it a custom name:
```ts
pagesAnalytics.track({eventType: 'C_MY_CUSTOM_EVENT'});
```

### Conversion Tracking

Yext offers conversion tracking that can attribute values to conversion events that are driven by user interaction
with Yext's products.  Once you have [setup conversion tracking](https://hitchhikers.yext.com/modules/ana104-conversion/01-conversion-overview/)
you can create a conversionTracking provider like so:

```ts
import { provideConversionTrackingAnalytics } from '@yext/analytics';
const conversionTracker = provideConversionTrackingAnalytics();
```

In order to track conversions, you will need to set a Cookie on your users and pass the id of that cookie to the 
conversion tracker when a conversion event occurs.  Which can be done like so:

```ts
conversionTracker.trackConversion({
  cookieId: '12466678', //the unique id that you generated for the user cookie
  cid: '12345-abcde-67890-fghij', //the value of the tag found in the conversion tracking setup page in your account
  cv: 10, // the optional monetary value of the conversion event.
})
```

Additionally, if you are implementing Conversion tracking on a pages site, once you have setup the pages analytics
tracker, you should turn on conversion tracking so that interactions on your pages site can be properly credited with 
conversions.  That can be done like so:

```ts
pagesAnalytics.setConversionTrackingEnabled(true, 'cookie id of the user goes here');
```

Then, when you track a page view it will automatically be credited for conversion tracking purposes. Additionally, if
an event on your pages should be treated as a conversion, you would track it like so:

```ts
pagesAnalytics.track('event_to_track', {
  cid: '12345-abcde-67890-fghij', // the value of the tag found in the conversion tracking setup page in your account
  cv: 10, // the optional monetary value of the conversion event.
});
```

And that's it! See **[our documentation](./docs/analytics.md)** for a full list of analytics events.

## Module support
- The ESM (ES6) build will be used automatically by module bundlers that support it (e.g. Webpack). It can be specified directly by importing `@yext/analytics/lib/esm`
- The CommonJS build will be used automatically by Node, but it can be specified directly by importing `@yext/analytics/lib/commonjs`

## License

Yext Analytics is an open-sourced library licensed under the [BSD-3 License](./LICENSE).

## Third Party Licenses

The licenses of our 3rd party dependencies are collected here: [THIRD-PARTY-NOTICES](./THIRD-PARTY-NOTICES).