const mongoose = require('mongoose')

const CustomerSchema = mongoose.Schema(
    {
        CustomerId: Number,
        Fullname:   String,
        Address:    String
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model('Customer','CustomerSchema')