require('dotenv').config()
const cors = require('cors');
const { App } = require('@slack/bolt');

const app = new App({
  signingSecret: process.env.BOLT_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

app.message('hello', async ({message, say}) => {
  await say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hey there <@${message.user}>!`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Click Me"
          },
          "action_id": "button_click"
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Farmhouse",
              "emoji": true
            },
            "value": "click_me_123"
          },
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Kin Khao",
              "emoji": true
            },
            "value": "click_me_123",
            "url": "https://google.com"
          },
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Ler Ros",
              "emoji": true
            },
            "value": "click_me_123",
            "url": "https://google.com"
          }
        ]
      }
    ],
    text: `Hey there <@${message.user}>!`
  });
});

app.message('check time logs', async ({message, say}) => {
  await say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "You need to check your time log?"
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Check your time log",
            "emoji": true
          },
          "value": "click_me_123",
          "url": "https://toggl.com",
          "action_id": "button-action"
        }
      }
    ],
    text: "Time log check"
  });
});

app.error((error) => {
  // Check the details of the error to handle cases where you should retry sending a message or stop the app
  console.error(error);
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log(`⚡️ Bolt app is running!`);
})();