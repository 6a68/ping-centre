"use strict";

const yup = require("yup");

const schema = yup.object().required().strict().shape({
  client_id: yup.string().required(),
  topic: yup.string().required(),
  event_type: yup.string().required(),
});

module.exports = schema;
