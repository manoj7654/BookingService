const mongoose=require("mongoose");


const seatSchema=mongoose.Schema({
    seatClass:String,
    isBooked:Boolean,
    bookings:[{type:mongoose.Schema.type.ObjectId,ref:"booking"}]
})

const SeatModal=mongoose.model("seats",seatSchema);

module.exports={SeatModal}