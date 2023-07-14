const { provideAnalytics, provideChatAnalytics } = require('@yext/analytics');
const dotenv = require('dotenv')
dotenv.config();

async function searchAnalyticsTest() {
  const analytics = provideAnalytics({
    experienceKey: 'rosetest',
    experienceVersion: 'PRODUCTION',
    businessId: 123,
  });
  
  const response = await analytics.report({
    type: 'CTA_CLICK',
    entityId: '1',
    verticalKey: 'people',
    searcher: 'VERTICAL',
    queryId: '95751527-9db6-4859-8278-60d1c060b6c0'
  });
  console.log("Search response", response);
}


async function chatAnalyticsTest() {
  const chatAnalytics = provideChatAnalytics({
    apiKey: process.env.CHAT_API_KEY,
    sessionTrackingEnabled: true,
  });
  const chatResponse = await chatAnalytics.report({
    action: "CHAT_LINK_CLICK",
    chat: {
      botId: "analytics-test-bot"
    }
  });
  console.log("Chat response", chatResponse);
}

searchAnalyticsTest()
chatAnalyticsTest()