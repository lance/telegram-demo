const { CloudEvent, HTTP } = require('cloudevents');
const { Translate } = require('@google-cloud/translate').v2;

// Use the Google translation API
const translate = new Translate();

// CloudEvent response defaults
const defaults = {
  source: "ksvc:translate",
  type: "knative.function.translation",
  datacontenttype: "application/json"
}

// Handler function, invoked with a CloudEvent
const handle = async (_, event) => {
  if (!event || !event.data) return
  const data = event.data

  const translations = await translate.translate(data.text, { to: "en", model: "base"})
  return HTTP.binary(new CloudEvent({
    ...defaults,
    data: {
      // Return a CloudEvent with the English translated text
      translations,
      // Include the original data
      origin: data,
    }
  }));
};

module.exports = { handle };
