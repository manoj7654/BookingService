const mongoose=require("mongoose");

const seatPriceSchema=mongoose.Schema({
   seat_class:String,
   min_price:String,
   max_price:String,
   normal_price:String
})

const SeatPriceModal=mongoose.model("SeatPrice",seatPriceSchema);

module.exports={SeatPriceModal}