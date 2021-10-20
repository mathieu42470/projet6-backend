const mongoose = require('mongoose');
const uniqueValiator = require('mongoose-unique-validator')
const userSchema = mongoose.Schema({
               email: { Type: String, required: true, unique: true},
               password: {Type: String, required: true},
});
userSchema.plugin(uniqueValiator);

module.exports = mongoose.model('user', userSchema);