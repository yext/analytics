import { analytics } from '@yext/analytics';

/** Note: there is currently a bug when sending requests in FireFox where the Network tab
 * will show NS_ERROR_FAILURE under transferred even though the response is successful
 * and Yext successfuly recieved the data.
 * For Yext employees there is more info here:
 * https://yext.slack.com/archives/G8UMH43HP/p1693419787243609?thread_ts=1693411231.167479&cid=G8UMH43HP
 *
 * We will continue investigating this make a fix if necessary.
 */
const analyticsProvider = analytics({
  authorizationType: 'apiKey',
  authorization: process.env.YEXT_API_KEY,
  sessionTrackingEnabled: false
}).with({
  action: 'CHAT_LINK_CLICK',
  pageUrl: 'http://www.yext-test-pageurl.com',
  destinationUrl: 'http://www.yext-test-destinationurl.com',
  referrerUrl: 'http://www.yext-test-referrerurl.com',
  label: 'test-label',
  timestamp: new Date(),
  bot: false,
  browserAgent: {
    browser: 'test-browser',
    browserVersion: 'test-browser-version',
    os: 'test-os',
    osVersion: 'test-os-version',
    device: 'test-device',
    deviceClass: 'test-device-class',
    userAgent: 'test-user-agent'
  },
  clientSdk: {
    testsdk: 'version'
  },
  internalUser: false,
  chat: {
    botId: 'analytics-test-bot'
  },
  count: 1,
  customTags: {
    testcustomtag: 'testcustomtagvalue'
  },
  customValues: {
    testcustomvalue: 1
  },
  entity: 'testEntityId',
  ip: {
    address: '0.0.0.0',
    algorithm: 'HASH'
  },
  visitor: {
    'test-id-method': 'visitor-test-id'
  }
});

const analyticsProvideWithSessionTracking = analytics({
  authorizationType: 'apiKey',
  authorization: process.env.YEXT_API_KEY
}).with({
  action: 'CHAT_LINK_CLICK',
  pageUrl: 'http://www.yext-test-pageurl.com',
  destinationUrl: 'http://www.yext-test-destinationurl.com',
  referrerUrl: 'http://www.yext-test-referrerurl.com',
  label: 'test-label',
  timestamp: new Date(),
  bot: false,
  browserAgent: {
    browser: 'test-browser',
    browserVersion: 'test-browser-version',
    os: 'test-os',
    osVersion: 'test-os-version',
    device: 'test-device',
    deviceClass: 'test-device-class',
    userAgent: 'test-user-agent'
  },
  clientSdk: {
    sdk: 'version'
  },
  internalUser: false,
  chat: {
    botId: 'analytics-test-bot'
  },
  count: 1,
  customTags: {
    testcustomtag: 'testcustomtagvalue'
  },
  customValues: {
    testcustomvalue: 1
  },
  entity: 'testEntityId',
  ip: {
    address: '0.0.0.0',
    algorithm: 'HASH'
  },
  visitor: {
    'test-id-method': 'visitor-test-id'
  }
});

export function fireChatEvent() {
  analyticsProvider.report();
}

export function fireSearchEvent() {
  analyticsProvider.report({
    action: 'PRODUCT',
    chat: null,
    search: {
      searchId: '11111111-1111-1111-1111-111111111111',
      queryId: '11111111-1111-1111-1111-111111111111',
      verticalKey: 'test-vertical-key',
      isDirectAnswer: false,
      versionLabel: 'PRODUCTION',
      versionNumber: 1,
      experienceKey: 'test-experience-key'
    }
  });
}

export function firePagesEvent() {
  analyticsProvider.report({
    action: 'WEBSITE',
    chat: null,
    pages: {
      siteUid: 123456789,
      template: 'test-template'
    }
  });
}

export function fireCallToActionEvent() {
  analyticsProvider.report({ action: 'CTA_CLICK' });
}

export function fireEventWithSessionTracking() {
  analyticsProvideWithSessionTracking.report();
}
