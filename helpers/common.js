// create doc
export const create = async (model, data) => {
  try {
    const doc = await model.create(data);
    return doc ? doc : false;
  } catch (error) {
    return false;
  }
};

// find one doc
export const findOne = async (model, data) => {
  try {
    data.isDeleted = false;
    const doc = await model.findOne(data);
    return doc ? doc : false;
  } catch (error) {
    return false;
  }
};

// find all doc
export const find = async (model) => {
  try {
    const doc = await model.find({ isDeleted: false });
    return doc ? doc : false;
  } catch (error) {
    return false;
  }
};

// delete one doc
export const deleteOne = async (model, data) => {
  try {
    console.log("deleteone");
    console.log(data);
    const doc = await model.findOneAndUpdate(data, {
      isDeleted: true,
    });
    // console.log("got data", doc);
    return doc ? doc : false;
  } catch (error) {
    new Error(error);
  }
};
