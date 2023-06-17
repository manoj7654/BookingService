const mongoose=require("mongoose");


const seatSchema=mongoose.Schema({
    seat_class:String,
    isBooked:Boolean,
    seat_identifier:String,
    id:Number,
    bookings:[{type:"ObjectId",ref:"Booking"}],
   
})

const SeatModal=mongoose.model("Seat",seatSchema);

module.exports={SeatModal}