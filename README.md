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

### Combined Analytics
For a typical locator you will be using both Search and Pages analytics.

The experienceKey will come from your Answers experience on yext.com. You can signup for a free trial at
[https://www.yext.com/free-trial/](https://www.yext.com/free-trial/).

The businessId and siteId can both be found in your account.

```ts
import { provideAnalytics } from '@yext/analytics';

const analytics = provideAnalytics({
  experienceKey: '<your experience key>',
  experienceVersion: 'PRODUCTION',
  businessId: 123456, // this comes from the url of your Yext account
  featureId: 'My Locator', // the name of the feature in your features.json
  pageType: 'locator', // the type of page, can be 'entity', 'directory', 'locator', or 'static'
  product: 'storepages',
  production: false, // set to true if you are in the production environment
  siteId: 654321, // the id of your site, you can find this in the url of your deploy page
});
```

Now that we are initialized, we can add a page view.

```ts
analytics.pageView();
```

and if a user clicks on a search result, we can fire an appropriate event.

```ts
analytics.report({
  type: 'CTA_CLICK',
  entityId: '1',
  verticalKey: 'people',
  searcher: 'VERTICAL',
  queryId: '12345678-1234-1234-1234-123456789012'
});
```

### Search Analytics

```ts
import { provideSearchAnalytics } from '@yext/analytics';

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

### Pages Analytics

```ts
import {providePagesAnalytics} from '@yext/analytics';

const pagesAnalytics = providePagesAnalytics({
  businessId: 123456, // this comes from the url of your Yext account 
  featureId: 'My Page Set', // the name of the feature in your features.json
  pageType: 'entity', // the type of page, can be 'entity', 'directory', 'locator', or 'static'
  product: 'storepages',
  production: false, // set to true if you are in the production environment
  siteId: 654321, // the id of your site, you can find this in the url of your deploy page
  ids: [90210], // if your pageType is 'entity' this is required, and it is the uid of the entity 
});
```

Now that the pages analytics reporter is initialized, we can fire a pageview:
```ts
pagesAnalytics.pageView();
```

We can also fire an event on any other type of user interaction and give it a custom name:
```ts
pagesAnalytics.userInteraction('somebuttonclick');
```

#### Search Analytics Event Types
When specifying the analytics type, either the [AnalyticsEventType](./docs/analytics.analyticseventtype.md) enum
or its corresponding string can be specified. For example, you can specify the 'CTA_CLICK' event with either 'CTA_CLICK' or
with `AnalyticsEventType.CtaClick`. Once the event type is specified, TypeScript is able to enforce the required and
optional properties for that event type.

And that's it! See **[our documentation](./docs/analytics.md)** for a full list of analytics events.

## Module support
- The ESM (ES6) build will be used automatically by module bundlers that support it (e.g. Webpack). It can be specified directly by importing `@yext/analytics/lib/esm`
- The CommonJS build will be used automatically by Node, but it can be specified directly by importing `@yext/analytics/lib/commonjs`

## License

Yext Analytics is an open-sourced library licensed under the [BSD-3 License](./LICENSE).

## Third Party Licenses

The licenses of our 3rd party dependencies are collected here: [THIRD-PARTY-NOTICES](./THIRD-PARTY-NOTICES).