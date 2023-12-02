const logger = require("../../../config/winstonConfig");
const userService = require("../services/userService");
const { userDbExistsCheck } = require("../../utils/constants");

module.exports = {
  createUser: async (req, res) => {
    const {
      route: { path },
      body: { name, email, password, phoneNumber, ageNumber, location },
    } = req;
    try {
      if (!name) {
        return res.status(400).send({ message: "name is required" });
      }
      if (!email) {
        return res.status(400).send({ message: "email is required" });
      }
      if (!password) {
        return res.status(400).send({ message: "password is required" });
      }
      if (!phoneNumber) {
        return res.status(400).send({ message: "phoneNumber is required" });
      }
      if (!ageNumber) {
        return res.status(400).send({ message: "ageNumber is required" });
      }
      if (!location) {
        return res.status(400).send({ message: "location is required" });
      }

      const response = await userService.createUser({
        name,
        email,
        password,
        phoneNumber,
        ageNumber,
        location,
      });

      if (response.ok == true && response.message == userDbExistsCheck.EXISTED) {
        return res.status(200).send({ ok: true, message: response.message });
      }
      return res.status(201).send({ ok: true, message: response.data });
    } catch (error) {
      logger.error("Error creating user:", error);
      res.status(400).send({ ok: false, message: error.message });
    }
  },
};
