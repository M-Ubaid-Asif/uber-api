import mongoose from "mongoose";
const { schema, model } = mongoose;

// Create Schema for cab

const cabSchema = new schema({
  booked: {
    type: Boolean,
    default: false,
  },
  location: {
    //GeoJSON
    type: {
      type: String,
      default: "Point",
      enum: ["point"],
    },
    coordinates: [Number], //[lng, lat]
  },
  driver: {
    type: Schema.ObjectId,
    ref: "User",
    required: [true, "A Cab must have a driver"],
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
