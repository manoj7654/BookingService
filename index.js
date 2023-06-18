// importing express for creating app
const express = require("express");
const { connection } = require("./config/db");
const app = express();

// dotenv for accessing port no from env file
require("dotenv").config();

// importing modals
const { BookingModal } = require("./modals/bookingModal");
const { SeatModal } = require("./modals/seatModals");
const { SeatPriceModal } = require("./modals/seatPriceModal");


// middleware
app.use(express.json());

const nodemailer=require("nodemailer");


// for creating new booking if the particular seat is not booked
app.post("/booking", async (req, res) => {
  try {
    const { seatIds, name, phoneNumber,email } = req.body;

    // for finding seat is booked or not
    const seats = await SeatModal.find({
      id: { $in: seatIds },
      isBooked: false,
    });
    // console.log(seats)

    // for storing seat_class
    let arr = [];
    for (let i = 0; i < seats.length; i++) {
      const { seat_class } = seats[i].toObject();
      arr.push(seat_class);
      // console.log(seat_class);
    }
    // console.log(arr)

    // here checking if seats are already booked then return message
    if (seats.length !== seatIds.length) {
      return res.status(400).json({ error: "Some seats are already booked" });
    }

    // for finding particular seat price
    const seatPrice = await SeatPriceModal.find({ seat_class: { $in: arr } });
    // console.log("seat price", seatPrice[0]._id);

    // for finding total seats
    const totalSeats = await SeatModal.find();
    //  console.log(totalSeats)
    let count = 0;
    for (let i = 0; i < totalSeats.length; i++) {
      count++;
    }
    //  console.log(count)

    // for counting total booked seat
    const bookSeats = await SeatModal.countDocuments({ isBooked: true });
    // console.log(bookSeats)

    // for finding totalAmount
    let pricing = 0;
    for (let i = 0; i < seatPrice.length; i++) {
      if (bookSeats / count < 0.4) {
        pricing += +seatPrice[i].min_price || +seatPrice[i].normal_price;
      } else if (bookSeats / count >= 0.4 && bookSeats / count <= 0.6) {
        pricing += +seatPrice[i].normal_price || +seatPrice[i].max_price;
      } else {
        pricing += +seatPrice[i].max_price || +seatPrice[i].normal_price;
      }
      // console.log(pricing);
    }
    // console.log(pricing)
   

    // if seats are not booked then users can book seats
    const booking = new BookingModal({
      seat: seats,
      name,
      phoneNumber,
      email,
      price: pricing,
    });


    await BookingModal.create(booking);

    seats.forEach(async (seat) => {
      seat.isBooked = true;
      seat.bookings.push(booking);
      await seat.save();
    });
    // console.log(result1);

    let updatePrice = "$" + pricing.toFixed(2);

    // for sending mail to users when they booked seat
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'manojsfstm5@gmail.com',
          pass: process.env.emailpassword
      }
  });
  
  const mailOptions = {
      from: 'manojsfstm5@gmail.com',
      to: `${email}`,
      subject: 'Booking Confirmation from Seat booking system',
      text: `Dear ${name} Your Booking is confirmed in Seat Booking System on ${new Date()} and your bookingId: ${booking._id}, totalAmount: ${updatePrice} .`
  };
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          return res.status(500).json({ message: 'Error while sending confirmation mail' });
      } else {
  //         // res.json({ msg: "new booking created successfully" })
         res.json({ bookingId: booking._id, totalAmount: updatePrice });
          return res.status(200).json({ message: 'Confiramtion sent to email', msg: "new booking created successfully" });
      }
  });

 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// for getting seats along with status
app.get("/seats", async (req, res) => {
  try {
    const seats = await SeatModal.find({}, { seat_class: 1, isBooked: 1,id:1 }).sort(
      { seat_class: 1 }
    );

    res.json(seats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// for finding bookings with the help of query
app.get("/bookings", async (req, res) => {
  const { userIdentifier } = req.query;
  try {
    // if userIdentifier is not present our database then it will throw an error
    if (!userIdentifier) {
      return res.status(400).json({ error: "User identifier is required" });
    }

    // here users can check bookings with email or phone number
    const bookings = await BookingModal.find({
      $or: [{ email: userIdentifier }, { phoneNumber: userIdentifier }],
    });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/seats/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const seat= await SeatModal.findOne({id:id},{bookings:0})
    // res.json(seat)
    if(!seat){
      res.status(400).json({ error: "Seat not found" });
    }else{
     // for storing seat_class
      const{seat_class}=seat
      // console.log(seat_class)

      // // for finding particular seat price
  const seatPrice = await SeatPriceModal.findOne({ seat_class: seat_class});
  // console.log("seatPrice",seatPrice);

    // // for finding total seats
  const totalSeats = await SeatModal.find();
  // //  console.log(totalSeats)
  let count = 0;
  for (let i = 0; i < totalSeats.length; i++) {
    count++;
  }
  //  console.log(count)

   // // for counting total booked seat
  const bookSeats = await SeatModal.countDocuments({ isBooked: true });
  // console.log(bookSeats)

  
      // for finding totalAmount
      let pricing = 0;
      // for (let i = 0; i < seatPrice.length; i++) {
        if (bookSeats / count < 0.4) {
          pricing += +seatPrice.min_price || +seatPrice.normal_price;
        } else if (bookSeats / count >= 0.4 && bookSeats / count <= 0.6) {
          pricing += +seatPrice.normal_price || +seatPrice.max_price;
        } else {
          pricing += +seatPrice.max_price || +seatPrice.normal_price;
        }
        // console.log(pricing);
      // }
      // console.log(pricing)

      res.status(200).json({"Seat":seat,"Price":pricing})
    }
        

  } catch (error) {
    res.status(400).json({ error: "Unable to find seat" });
  }
});


// listening server 

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connecte to DB");
  } catch (error) {
    console.log("Not able to connect database");
  }
  console.log(`Server is running on port no ${process.env.port}`);
});
