const mongoose=require("mongoose");

const bookingSchema=mongoose.Schema({
    name:String,
    phoneNumber:Number,
    seat:[{type:mongoose.Schema.type.ObjectId,ref:"seat"}]
})

const BookingModal=mongoose.model("bookings",bookingSchema);

module.exports={BookingModal}