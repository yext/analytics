import { analytics } from '@yext/analytics';


const analyticsProvider = analytics({
  key: process.env.YEXT_API_KEY,
  sessionTrackingEnabled: false
}).with({
  action: "CHAT_LINK_CLICK",
  pageUrl: "http://www.yext-test-pageurl.com",
  destinationUrl: "http://www.yext-test-destinationurl.com",
  referrerUrl: "http://www.yext-test-referrerurl.com",
  label: "test-label",
  timestamp: new Date(),
  bot: false,
  browserAgent: {
    browser: "test-browser",
    browserVersion: "test-browser-version",
    os: "test-os",
    osVersion: "test-os-version",
    device: "test-device",
    deviceClass: "test-device-class",
    userAgent: "test-user-agent",
  },
  clientSdk: {
    "testsdk": "version",
  },
  internalUser: false,
  chat: {
    botId: "analytics-test-bot"
  },
    count: 1,
  customTags: {
    "testcustomtag": "testcustomtagvalue",
  },
  customValues: {
    "testcustomvalue": 1,
  },
  entity: "testEntityId",
  ip: {
    address: "0.0.0.0",
    algorithm: "HASH",
  },
  visitor: {
    "test-id-method": "visitor-test-id",
  },
});


const analyticsProvideWithSessionTracking = analytics({
  key: process.env.YEXT_API_KEY,
}).with({
  action: "CHAT_LINK_CLICK",
  pageUrl: "http://www.yext-test-pageurl.com",
  destinationUrl: "http://www.yext-test-destinationurl.com",
  referrerUrl: "http://www.yext-test-referrerurl.com",
  label: "test-label",
  timestamp: new Date(),
  bot: false,
  browserAgent: {
    browser: "test-browser",
    browserVersion: "test-browser-version",
    os: "test-os",
    osVersion: "test-os-version",
    device: "test-device",
    deviceClass: "test-device-class",
    userAgent: "test-user-agent",
  },
  clientSdk: {
    "sdk": "version",
  },
  internalUser: false,
  chat: {
    botId: "analytics-test-bot"
  },
  count: 1,
  customTags: {
    "testcustomtag": "testcustomtagvalue",
  },
  customValues: {
    "testcustomvalue": 1,
  },
  entity: "testEntityId",
  ip: {
    address: "0.0.0.0",
    algorithm: "HASH",
  },
  visitor: {
    "test-id-method": "visitor-test-id",
  },
});

export function fireChatEvent() {
  analyticsProvider.report();
}

export function fireCallToActionEvent() {
  analyticsProvider.report({action: "CALL_TO_ACTION"});
}

export function fireEventWithSessionTracking() {
  analyticsProvideWithSessionTracking.report({
    sessionId: "12345"
  });
}

