const mongoose=require('mongoose')
// import mongoose from 'mongoose'
const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String
}, {collection: 'product',
    versionKey: false
})

module.exports = mongoose.model('product',productSchema)