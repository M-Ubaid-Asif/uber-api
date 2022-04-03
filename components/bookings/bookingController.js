import logger from "../../config/logger";
import getDistanceFromLatLonInKm from "../../helpers/calDistance";
import { create, deleteOne, find, findOne } from "../../helpers/common";
import Cab from "../cab/cabModel";
import Booking from "./bookingModel";

export const createBooking = async (req, res, next) => {
  try {
    logger.info("inside createbooking controller");
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
    //filter for finding cab in 10 miles
    const filterOption = {
      booked: false,
      currentLoc: {
        $geoWithin: {
          $centerSphere: [[lat1, lon1], radius],
        },
      },
    };

    const cab = await findOne(Cab, filterOption);

    console.log("=====>", cab);

    // if no cabs  are available
    if (!cab) {
      return res.status(404).json({
        message: "no cab are available in your area",
      });
    }

    const data = {
      currentAddress,
      destinationAddress,
      price,
      cab: cab._id,
      bookedBy: user.id,
    };
    // booking cab
    const bookcab = await create(Booking, data);
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
    logger.info("inside deletebooking controllers");
    const _id = req.params.id;
    const user = req.user;

    const filter = { _id, user: user.id };
    const data = await deleteOne(Booking, filter);
    console.log("---->", data);

    if (!data) {
      res.status(400).json({
        message:
          "you dont any booking yet! or your booking is already canceled",
      });
    }

    console.log(data.cab._id);
    const cab = await Cab.findById(data.cab._id);
    cab.booked = false;
    await cab.save();

    res.status(200).json({
      message: "booking cancel",
      data,
    });
  } catch (error) {
    next(new Error(error));
  }
};

export const getNearByCab = async (req, res, next) => {
  try {
    logger.info("inside getNearBycab controller");
    const { lat, lon } = req.body;
    if (!lat || !lon) {
      return res.status(400).json({
        status: "failed",
        message: "please provide latitude and longitude",
      });
    }

    const radius = 10 / 3963.2;

    const filter = {
      booked: false,
      currentLoc: {
        $geoWithin: {
          $centerSphere: [[lat, lon], radius],
        },
      },
    };

    const cabs = await Cab.find(filter);
    return cabs.length > 0
      ? res.status(200).json({
          cabs,
        })
      : res.status(403).json({
          message: "no cab are available in your area!",
        });
  } catch (error) {
    next(new Error(error));
  }
};

export const getMybookings = async (req, res, next) => {
  try {
    const user = req.user;
    const data = {
      bookedBy: user.id,
    };
    const pastbookings = await find(Booking, data);

    pastbookings.length > 0
      ? res.status(200).json({
          status: "success",
          data: pastbookings,
        })
      : res.status(403).json({
          status: "failed",
          data: "No bookings",
        });
  } catch (error) {
    next(new Error(error));
  }
};
