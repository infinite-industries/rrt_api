// keys for API requests

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const keySchema = new Schema({
	id: { type: String, index: true },
	organization: String,
	user_name: String
}, { collection: "dev_keys" });

module.exports = mongoose.model("DevKey", keySchema);
