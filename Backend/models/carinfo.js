const mongoose = require('mongoose');

const RarityroadSchema = new mongoose.Schema({
    companyompany: String,
    model: String,
    year: String
})

const  rarityRoadModel = mongoose.model("carsinfos",RarityroadSchema)
module.exports = rarityRoadModel