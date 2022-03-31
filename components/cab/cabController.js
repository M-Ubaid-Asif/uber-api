import Cab from "./cabModel";

import {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} from "./handlerFactory.js";

export const createCab = createOne(Cab);

export const getCab = getOne(Cab);

export const getAllCabs = getAll(Cab);

export const updateCab = updateOne(Cab);

export const deleteCab = deleteOne(Cab);
