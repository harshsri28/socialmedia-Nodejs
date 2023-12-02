const logger = require("../../../config/winstonConfig");
const { userModel, checkUserExist } = require("../model/userModel");
const { userDbExistsCheck } = require("../../utils/constants");

module.exports = {
  createUser: async ({
    name,
    email,
    password,
    phoneNumber,
    ageNumber,
    location,
  }) => {
    try {
      const response = await checkUserExist({
        name,
        email,
        password,
        phoneNumber,
        ageNumber,
        location,
      });

      if (response == true) {
        return { ok: true, message: userDbExistsCheck.EXISTED };
      }

      const newUser = new userModel({
        name,
        email,
        password,
        phoneNumber,
        ageNumber,
        location,
      });

      await newUser.save();
      return { ok: true, data: userDbExistsCheck.SAVED_SUCCESSFULLY };
    } catch (error) {
      logger.error("occur occur in service createUser", error);
      return { ok: false, message: "something went wrong" };
    }
  },
};
