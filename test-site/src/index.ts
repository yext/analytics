import analytics from '../../src/index';


const chat = analytics({
  key: process.env.CHAT_API_KEY,
});

export function fireChatEvent() {
  chat.report({
    action: "CHAT_LINK_CLICK",
    referrerUrl: "http://www.yext-test-referrerurl.com",
    visitor: {
      "test-id-method": "visitor-test-id",
    },
    chat: {
      botId: "analytics-test-bot"
    }
  })
}