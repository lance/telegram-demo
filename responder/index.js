const axios = require('axios');
const token = process.env.API_KEY;
const url = `https://api.telegram.org/bot${token}`;
const sendMessage = `${url}/sendMessage`;

// Sanity check - we can't do anything without an API token
if (!token) {
  throw new Error('No $API_KEY found.');
}

function handle(_, event) {
  // We are expecting to receive a CloudEvent. If we don't, just return
  if (!event || !event.data) {
    console.error('No CloudEvent received');
    return {
      message: 'No CloudEvent received'
    };
  }

  // The event data contains the chat ID and the text translation
  const data = JSON.parse(event.data)
  const chat_id = data?.origin?.chat?.id;
  const translation = data?.translations?.[0];

  if (!chat_id) {
    // If there is no chat ID, we can't respond
    console.error("No chat ID available", d)
  } else {
    // Send the translation to the chat
    axios.post(sendMessage, {
      chat_id,
      text: `Translation: ${translation}`
    }).catch(err => console.error(err));
  }
  return { code: 204, headers: {}, response: "OK" };
}

module.exports = { handle };