const express = require("express");
const { db } = require("../db");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const JWT = require('jsonwebtoken');
dotenv.config();

const adminRegistration = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
    } = req.body;

    // Validations
    const requiredFields = [
      name,
      email,
      password,
      phone
      ];

    if (requiredFields.some((field) => !field)) {
      return res.status(400).json({ error: "All fields are required" });
    }


    // Hash the "password" 
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
   
    // Check if the user already exists
    const checkUserQuery = "SELECT * FROM admin WHERE email = ?";
    

    db.query(checkUserQuery, [email], (err, result) => {
      if (err) {
        console.error("Error checking if user exists in MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        // Check if there are any rows in the result
        if (result.length > 0) {
          return res.status(400).json({
            error: "Admin already exists.",
          });
        } else {
          // User not found, proceed with registration
          const insertUserQuery = `
            INSERT INTO admin (
              name, email, phone,password
            ) VALUES (?, ?, ?, ?)
          `;

          const insertUserParams = [
            name,
            email,
            phone,
            hashedPassword,
          ];

          db.query(
            insertUserQuery,
            insertUserParams,
            (insertErr, insertResult) => {
              if (insertErr) {
                console.error("Error inserting user:", insertErr);
                res.status(500).json({ error: "Internal server error" });
              } else {
                console.log("Admin registered successfully");
                return res.status(200).json({
                  success: true,
                  message: "Admin registered successfully",
                });
              }
            }
          );
        }
      }
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({
      success: false,
      message: "Error in registration",
      error: error.message,
    });
  }
};

const adminLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    

    // Validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check user in MySQL
    const checkUserQuery = "SELECT * FROM admin WHERE email = ?";
    db.query(checkUserQuery, [email], async (err, results) => {
      if (err) {
        console.error("Error checking admin in MySQL:", err);
        return res.status(500).send({
          success: false,
          message: "Internal server error",
          error: err,
        });
      }

      if (results.length === 0) {
        return res.status(404).send({
          success: false,
          message: "Email is not registered",
        });
      }

      const user = results[0];

      // Compare passwords
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }

      // Generate token
      const token = await JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie('access_token' , token , { httpOnly : true}).status(200).send({
        success: true,
        message: "Login successfully",
        user: {
          id: user.uid,
          name: user.name,
          email: user.email,
          phone: user.phone,
          
        },
        token,
      });

    });
  } catch (error) {
    console.log(error);
    console.error("Error in registration:", error);
    res.status(500).json({ success: false, message: "Error in login",error: error.message });
  }
};






module.exports = {
  adminRegistration, adminLoginController
}