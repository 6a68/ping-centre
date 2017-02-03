"use strict";

const yup = require("yup");
const commonSchema = require("./commonSchema");

// commonSchema keys not shown below:
// - event_type, called "event" in testpilot docs, and "method" in
//   testpilot-metrics docs;
// - client_id, called "clientId" in the Telemetry ping.
const schema = commonSchema.required().strict().shape({
  // Require that the commonSchema "topic" field always be "testpilot".
  topic: yup.string().matches(/^testpilot$/).required(),

  // Additional "testpilot" event fields:
  // object: what was affected by "event", e.g., a button.
  object: yup.string().required(),
  // client_time: non-PII timestamp, integer number of seconds since Firefox
  //              application start.
  client_time: yup.number().integer().required(),

  // A few particularly useful fields plucked out of the Telemetry ping:
  firefox_version: yup.string().required(),
  locale: yup.string().required(),
  addon_version: yup.string().required(),
  os_name: yup.string().required(),
  os_version: yup.string().required(),

  // The entire raw event sent to Telemetry, serialized as a JSON string.
  // Allows other client data fields to be (slowly) queried in Redshift.
  // Also allows the original data to be reprocessed later.
  raw: yup.string().required()
});

module.exports = schema;
