/**
 * Encrypted Mongo Model to persist sessions across restarts.
 */
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  shop: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const SessionModel = mongoose.model("session", sessionSchema);

module.exports = SessionModel;
