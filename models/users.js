const mongoose = require('mongoose');
const uniqueValiator = require('mongoose-unique-validator');
// schéma type pour une inscription //
const userSchema = mongoose.Schema({
               email: { type: String, required: true, unique: true},
               password: {type: String, required: true},
});
userSchema.plugin(uniqueValiator);

module.exports = mongoose.model('user', userSchema);