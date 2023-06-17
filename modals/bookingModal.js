const mongoose=require("mongoose");


const bookingSchema=mongoose.Schema({
    name:String,
    phoneNumber:String,
    email:String,
    price:String,
    seat:[{type:"ObjectId",ref:"Seat"}]
    
})

const BookingModal=mongoose.model("Booking",bookingSchema);

module.exports={BookingModal}