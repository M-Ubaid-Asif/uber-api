import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Create Schema for cab

const cabSchema = new Schema({
  booked: {
    type: Boolean,
    default: false,
  },
  currentLoc: {
    //GeoJSON
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      required: true,
    }, //[lng, lat]
  },
  driver: {
    type: Schema.ObjectId,
    ref: "Driver",
    required: [true, "A Cab must have a driver"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

//Populate the driver

cabSchema.pre(/^find/, function (next) {
  this.populate({
    path: "driver",
    select: "-__v -passwordChangedAt",
  });
  next();
});

cabSchema.index({ location: "2d" });

//Model from schema
const Cab = model("Cab", cabSchema);

export default Cab;
