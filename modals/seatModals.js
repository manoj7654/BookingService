const mongoose=require("mongoose");


const seatSchema=mongoose.Schema({
    seatClass:String,
    isBooked:Boolean,
    bookings:[{type:"ObjectId",ref:"Booking"}],
   
})

const SeatModal=mongoose.model("Seat",seatSchema);

module.exports={SeatModal}