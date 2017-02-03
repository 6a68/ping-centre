"use strict";

const Joi = require("joi-browser");
const commonSchema = require("./commonSchema");

// commonSchema keys not shown below:
// - event_type, called "event" in testpilot docs, and "method" in
//   testpilot-metrics docs;
// - client_id, called "clientId" in the Telemetry ping.
const schema = commonSchema.keys({
  // Require that the commonSchema "topic" field always be "testpilot".
  topic: Joi.string().valid("testpilot").required(),

  // Additional "testpilot" event fields:
  // object: what was affected by "event", e.g., a button.
  object: Joi.string().required(),
  // client_time: non-PII timestamp, integer number of seconds since Firefox
  //              application start.
  client_time: Joi.number().integer().required(),

  // A few particularly useful fields plucked out of the Telemetry ping:
  firefox_version: Joi.string().required(),
  locale: Joi.string().required(),
  addon_version: Joi.string().required(),
  os_name: Joi.string().required(),
  os_version: Joi.string().required(),

  // The entire raw event sent to Telemetry, serialized as a JSON string.
  // Allows other client data fields to be (slowly) queried in Redshift.
  // Also allows the original data to be reprocessed later.
  raw: Joi.string().required()
});

module.exports = schema;
