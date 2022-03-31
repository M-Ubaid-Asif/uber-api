// create factory function
export const create = async (model, data) => {
  try {
    const doc = await model.create(data);
    return doc ? doc : false;
  } catch (error) {
    return false;
  }
};

// find one factory function
export const findOne = async (model, data) => {
  try {
    data.isDeleted = false;
    const doc = await model.findOne(data);
    return doc ? doc : false;
  } catch (error) {
    return false;
  }
};

export const find = async (model) => {
  try {
    data.isDeleted = false;
    const doc = await model.find();
    return doc ? doc : false;
  } catch (error) {
    return false;
  }
};

// find all cabs
export const findCabs = async (model, filter) => {
  try {
    const doc = await model.find(filter);
    return doc ? doc : false;
  } catch (error) {
    return false;
  }
};
