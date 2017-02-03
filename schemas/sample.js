"use strict";

const yup = require("yup");
const commonSchema = require("./commonSchema");

const schema = commonSchema.shape({
  value: yup.boolean().required(),
});

module.exports = schema;
