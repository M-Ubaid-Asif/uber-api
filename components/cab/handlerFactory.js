import { catchAsync } from "../../utils/catchAsyn";
import AppError from "../../utils/appError";

//Factory function for create

export function createOne(Model) {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
}

//Factory function for update

export function updateOne(Model) {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    //Return an error if no data found
    if (!doc) {
      return next(new AppError("No document found with given id", 404));
    }

    res.status(200).json({
      stutus: "success",
      data: {
        data: doc,
      },
    });
  });
}

// Factory function for delete

export function deleteOne(Model) {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    //Return an error if doc is not found
    if (!doc) {
      return next(new AppError("Data not found with given id", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
}

// Factory function to get one document
export function getOne(Model, populateOptions) {
  return catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

    //Return an error if doc is not found
    if (!doc) {
      return next(new AppError("Data not found with given id", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
}

// Factory function to get all document

export function getAll(Model) {
  return catchAsync(async (req, res, next) => {
    //To allow for nested Get Reviews
    let filter = {};
    if (req.params.userId) filter = { user: req.params.userId };

    //Execute the query
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    // Send Response

    res.status(200).json({
      status: "success",
      result: doc.length,
      data: {
        data: doc,
      },
    });
  });
}
