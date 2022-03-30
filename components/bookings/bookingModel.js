import mongoose from "mongoose";

// creating a booking schema
const bookingSchema = new mongoose.Schema(
  {
    currentAddress: {
      //Geo JSON
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
    },
    destinationAddress: {
      // Geo JSON
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      address: String,
      coordinates: [Number],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    cab: {
      type: mongoose.Schema.ObjectId,
      ref: "Cab",
    },
    bookedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.pre(/^find/, function (next) {
  this.populate("bookedBy").populate("cab");
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
