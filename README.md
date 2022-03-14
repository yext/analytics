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

Next, import and initialize the library in your application.

The experienceKey will come from your Answers experience on yext.com. You can signup for a free trial at [https://www.yext.com/free-trial/](https://www.yext.com/free-trial/).

```ts
import { provideAnalytics } from '@yext/analytics';

const analytics = provideAnalytics({
  experienceKey: '<your experience key>',
  experienceVersion: 'PRODUCTION',
  businessId: 123456,
});
```

To use the library with Node, use the following import instead:
```ts
const { provideAnalytics } = require('@yext/analytics');
``` 

Now that the analytics reporter is initialized, let's fire off an event:

```ts
analytics.report({
  type: 'CTA_CLICK',
  entityId: '1',
  verticalKey: 'people',
  searcher: 'VERTICAL',
  queryId: '12345678-1234-1234-1234-123456789012'
});
```

### Analytics Event Types
When specifying the analytics type, either the [AnalyticsEventType](./docs/analytics.analyticseventtype.md) enum
or its corresponding string can be specified. For example, you can specify the 'CTA_CLICK' event with either 'CTA_CLICK' or
with `AnalyticsEventType.CtaClick`. Once the event type is specified, TypeScript is able to enforce the required and
optional properties for that event type.

And that's it! See **[our documentation](./docs/analytics.md)** for a full list of analytics events.

### Module support
- The ESM (ES6) build will be used automatically by module bundlers that support it (e.g. Webpack). It can be specified directly by importing `@yext/analytics/lib/esm`
- The CommonJS build will be used automatically by Node, but it can be specified directly by importing `@yext/analytics/lib/commonjs`

## License

Yext Analytics is an open-sourced library licensed under the [BSD-3 License](./LICENSE).

## Third Party Licenses

The licenses of our 3rd party dependencies are collected here: [THIRD-PARTY-NOTICES](./THIRD-PARTY-NOTICES).