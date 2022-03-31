import getDistanceFromLatLonInKm from "../../helpers/calDistance";
import { deleteOne, findCab, findOne } from "../../helpers/common";
import Cab from "../cab/cabModel";
import Booking from "./bookingModel";

export const createBooking = async (req, res, next) => {
  try {
    const { currentAddress, destinationAddress } = req.body;
    const user = req.user;
    //   const bookedBy = req.user.id;

    /*
    getting latitude and longitude
    for calculating the distance
    */
    const currentLocation = currentAddress.coordinates.toString().split(",");
    const destinationLocation = destinationAddress.coordinates
      .toString()
      .split(",");

    console.log("start location", currentLocation);
    console.log("end location", destinationLocation);

    const lat1 = currentLocation[0];
    const lon1 = currentLocation[1];
    const lat2 = destinationLocation[0];
    const lon2 = destinationLocation[1];
    // getting distance for calculating the price
    const disInKm = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
    console.log(disInKm);

    // using math.ceil to get exact value not decimal value
    const price = Math.ceil(15 * disInKm);
    console.log(price);
    const radius = 10 / 3963.2;
    // finding cab in 10 miles
    const filterOption = {
      booked: false,
      currentLoc: {
        $geoWithin: {
          $centerSphere: [[lat1, lon1], radius],
        },
      },
    };

    const cab = await findCab(Cab, filterOption);

    console.log("=====>", cab);

    // if no cabs  are available
    if (!cab) {
      return res.status(404).json({
        message: "no cab are available in your area",
      });
    }

    // booking cab
    const bookcab = await Booking.create({
      currentAddress,
      destinationAddress,
      price,
      cab: cab._id,
      bookedBy: user.id,
    });
    // if booking
    if (bookcab) {
      cab.booked = true;
      await cab.save();
      return res.status(201).json({
        message: "cab booked",
        data: bookcab,
      });
    }
  } catch (error) {
    next(new Error(error));
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    console.log("heheheh");
    const _id = req.params.id;
    const user = req.user;

    const data = await Booking.deleteOne({ _id, bookedBy: user._id });
    console.log(data);

    return data
      ? res.status(200).json({
          message: "booking cancel",
          data,
        })
      : res.status(400).json({
          message: "cannot found any booking!",
        });
  } catch (error) {
    next(new Error(error));
  }
};
