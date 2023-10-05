const mongoose = require('mongoose')
const profileSchema = new mongoose.Schema({
    Image: {
        type: String,
        required: true
    }
})
const profileModel = mongoose.model('profiles', profileSchema)
module.exports = profileModel 