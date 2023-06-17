# Seat Booking System

This is a seat booking system implemented using Node.js and Express framework. The system allows users to book seats, check seat availability, and retrieve booking information based on user identifier.

# Installation
1. Clone the repository
   
        git clone https://github.com/manoj7654/BookingService.git

2. Dependecies

        npm init -y  // 
        npm i express // for creating route
        npm i nodemone // for start node.js server
        npm i dotenv  //import invironment variable for .env file
        npm i mongoose //for creating sehcema and modal
        npm i nodemailer //Module for sending emails

            example :
            "dependencies": {
                "dotenv": "^16.1.4",
                "express": "^4.18.2",
                "mongoose": "^7.2.4",
                "nodemailer": "^6.9.3",
                "nodemon": "^2.0.22"
            }

# for starting the server
    npm run server


# API Endpoints
1. Create a new booking
  
  * URL : /booking
  * Method : POST
  * Reques body:
    
    1. seatIds //It accept array of seatIds for booking.
    2. name  // Name of the users for making the booking 
    3. phoneNumber // phone Number of the users for making the booking
    4. email    // Email of the users for making the booking

        example:
        
                {
            "seatIds": ["1", "2"],

            "name": "Manoj Kumar",

            "phoneNumber": "7654504943",
            
            "email": "manojsfstm5@gmail.com"
            }


 * Response : if seat is not booked then users cans see in response booking successful with seat price and booking id or if seat already booked then users can see in response seats are already booked.
   
  

 * Success Response:

    1.Status Code: 200

    2. Response Body:
    bookingId: ID of the created booking.
    totalAmount: Total amount to be paid for the booking.

      example :

            {
                "bookingId": "648d2dc9691ec8b29251421d",
                "totalAmount": "$477.06"
            }

 * Error Response:

   1.Status Code: 400

   2.Response Body:
error: Error message indicating the reason for the failure.

2.Get Seat Availability
 
 * URL : /seats
 * Method : GET
 * Response body:
   
   1. It retruns array of seat objects containing of the following fileds:
       
      * seat_class // class of the seat
      * isBooked //It is indication either seats are booked or not.
      * id  // id of particular seat

            example :
                [
                    {
                        "_id": "6489716cfc877b172b5c4729",
                        "isBooked": false,
                        "seat_class": "A"
                    },
                    {
                        "_id": "6489716cfc877b172b5c47f2",
                        "isBooked": false,
                        "seat_class": "A"
                    }]

3. Find Bookings 
  * URL : /booking?userIdentifier
  * Method : GET
  *  Query Params: 

       1. userIdentifier //Email address or phoneNumber of the users

 * Response body :
    
    1. It return an array of booking objects matching the provided userIdentifier
  

            example :

            [
            {
                "_id": "648b64baff4338680586f1eb",
                "name": "Nikhil Kumar",
                "phoneNumber": "8340227841",
                "price": "183.44",
                "seat": [
                "6489716cfc877b172b5c4684"
                ],
                "__v": 0
            },
            {
                "_id": "648c7f6e7e1d0452d81067e8",
                "name": "Nikhil Kumar",
                "phoneNumber": "8340227841",
                "price": "296.21",
                "seat": [
                "6489716cfc877b172b5c4685"
                ],
                "__v": 0
            }]


4. Get Seat Details
  * URL : /seats/id
  * Method : GET
  * Path Params :
     
     1. id // id of the seat
 * Response body:

  1. Seat //It returns object containing details of the seat with the provided id

2. Price  // It returns total price of the booking seat.

        example :

        {
        "Seat": {
            "_id": "6489716cfc877b172b5c4682",
            "id": 30,
            "seat_identifier": "767276921-9",
            "isBooked": true,
            "seat_class": "J",
            "__v": 1
        },
        "Price": 406.24
        }
   
# Database
This application is used a MongoDB database to store seat and booking information and users details.