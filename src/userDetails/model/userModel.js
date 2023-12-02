const mongoose = require("mongoose");
const logger = require("../../../config/winstonConfig");

const userModel = mongoose.model(
  "UserDetails",
  new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    phoneNumber: { type: Number },
    ageNumber: { type: Number },
    location: { type: String },
  }),
  "UserDetails"
);

module.exports = {
  userModel,

  checkUserExist: async ({
    name,
    password,
    email,
    phoneNumber,
    ageNumber,
    location,
  }) => {
    try {
      const pipeline = [
        {
          $match: {
            email,
          },
        },
        {
          $project: {
            name: 1,
            email: 1,
            password: 1,
            phoneNumber: 1,
            ageNumber: 1,
            location: 1,
          },
        },
      ];

      const result = await userModel.aggregate(pipeline);
      if (result.length > 0) {
        return true;
      }
      return false;
    } catch (error) {
      logger.error("error occur in checking user exist in database ", error);
      return;
    }
  },
};
