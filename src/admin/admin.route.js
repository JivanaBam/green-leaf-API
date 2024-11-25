import express from "express";
import { registerAdminValidationSchema } from "./admin.validation.js";
import Admin from "./admin.model.js";
import bcrypt from "bcrypt";

const router = express.Router();

// register Admin
router.post(
  "/admin/register",
  async (req, res, next) => {
    // extract data from req.body
    const data = req.body;
    // console.log(data);

    // validate data using schema
    try {
      const validatedData = await registerAdminValidationSchema.validate(data);
      req.body = validatedData;
    } catch (error) {
      // if validation fails, throw error
      return res.status(400).send({ message: error.message });
    }

    // call next fun
    next();
  },
  async (req, res) => {
    // extract new admin from req.body
    const newAdmin = req.body;

    //? check if admin with provided name already exists in our system
    //find admin by password
    const admin = await Admin.findOne({ name: newAdmin.name });

    //if match, throw error
    if (admin) {
      return res
        .status(409)
        .send({ message: "Admin with same name is already exists." });
    }

    //just before saving user, we need to creat hashed password
    const plainPassword = newAdmin.password;
    const saltPassword = 10; // to add randomness

    const hashedPassword = await bcrypt.hash(plainPassword, saltPassword);
    // console.log(hashedPassword);

    // update new admin password with hashed password
    newAdmin.password = hashedPassword;

    //save user
    await Admin.create(newAdmin);

    // send res
    return res
      .status(200)
      .send({ message: "Admin is registered successfully." });
  }
);

export default router;
