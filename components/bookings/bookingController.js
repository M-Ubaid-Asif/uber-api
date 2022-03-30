import getDistanceFromLatLonInKm from "../../helpers/calDistance";
import { findCabs, findOne } from "../../helpers/common";
import Booking from "./bookingModel";

export const createBooking = async (req, res, next) => {
  const { currentAddress, destinationAddress } = req.body;
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
  // waiting for cab model
  const filterOption = {
    booked: false,
    location: {
      $geoWithin: {
        $centerSphere: [[lat1, lon1]],
      },
    },
  };

  const cabs = await findCabs(Cab, filterOption).get("_id");
  const bookcab = await Booking.create({
    currentAddress,
    destinationAddress,
    price,
  });
};
