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
    const doc = await model.findOne(data);
    return doc ? doc : false;
  } catch (error) {
    return false;
  }
};
