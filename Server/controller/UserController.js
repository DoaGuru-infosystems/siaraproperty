const express = require("express");
const { db } = require("../db");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const JWT = require('jsonwebtoken');
dotenv.config();
var nodemailer = require('nodemailer');

const userRegistration = (req, res) => {
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
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    

    db.query(checkUserQuery, [email], (err, result) => {
      if (err) {
        console.error("Error checking if user exists in MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        // Check if there are any rows in the result
        if (result.length > 0) {
          return res.status(400).json({
            error: "User already exists.",
          });
        } else {
          // User not found, proceed with registration
          const insertUserQuery = `
            INSERT INTO users (
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
                console.log("User registered successfully");
                return res.status(200).json({
                  success: true,
                  message: "User registered successfully",
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

const loginController = (req, res) => {
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
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkUserQuery, [email], (err, results) => {
      if (err) {
        console.error("Error checking user in MySQL:", err);
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
      const match =  bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }

      // Generate token
      const token =  JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
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

const interestedUser = (req, res) => {
  const { propertyId, propertyName, name, email, phone, message } = req.body;

  const sql = 'INSERT INTO intrestedusers (property_id, propertyName, userName, userEmail,userPhone, message) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(sql, [propertyId, propertyName, name, email, phone, message], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).json({ success: false, error: 'Internal Server Error' , message: 'Internal Server Error'});
    } else {
      res.status(200).json({ success: true, message: 'Data inserted successfully' });
    }
  });
};

const contactedUser = (req, res) => {
  const { name, email, phone, message } = req.body;

  const sql = 'INSERT INTO contacted_user ( name, email, phone, message) VALUES (?, ?, ?, ?)';

  db.query(sql, [ name, email, phone, message], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).json({ success: false, error: 'Internal Server Error' , message: 'Internal Server Error'});
    } else {
      res.status(200).json({ success: true, message: 'Data inserted successfully' });
    }
  });
};

const getInterestedUsers = (req, res) => {
  const sql = 'SELECT * FROM intrestedusers ORDER BY id DESC';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error retrieving user data from MySQL:', err);
      res.status(500).json({ success: false, error: 'Internal Server Error', message: 'Internal Server Error' });
    } else {
      if (result.length > 0) {
        res.status(200).json({ success: true, data: result });
      } else {
        res.status(404).json({ success: false, error: 'No users found', message: 'No users found' });
      }
    }
  });
};

const getRegisterUsers = (req, res) => {
  const sql = 'SELECT * FROM users ORDER BY uid DESC';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error retrieving user data from MySQL:', err);
      res.status(500).json({ success: false, error: 'Internal Server Error', message: 'Internal Server Error' });
    } else {
      if (result.length > 0) {
        res.status(200).json({ success: true, data: result });
      } else {
        res.status(404).json({ success: false, error: 'No users found', message: 'No users found' });
      }
    }
  });
};


const getContactedUsers = (req, res) => {
  const sql = 'SELECT * FROM contacted_user ORDER BY id DESC';

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error retrieving user data from MySQL:', err);
      res.status(500).json({ success: false, error: 'Internal Server Error', message: 'Internal Server Error' });
    } else {
      if (result.length > 0) {
        res.status(200).json({ success: true, data: result });
      } else {
        res.status(404).json({ success: false, error: 'No users found', message: 'No users found' });
      }
    }
  });
};

const deleteContactedUser = (req, res) => {
  const userId = req.params.userId;

  const sql = 'DELETE FROM contacted_user WHERE id = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error deleting user from MySQL:', err);
      res.status(500).json({ success: false, error: 'Internal Server Error', message: 'Internal Server Error' });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({ success: true, message: 'User deleted successfully' });
      } else {
        res.status(404).json({ success: false, error: 'User not found', message: 'User not found' });
      }
    }
  });
};

const deleteIntrestedUser = (req, res) => {
  const userId = req.params.userId;

  const sql = 'DELETE FROM intrestedusers WHERE id = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error deleting user from MySQL:', err);
      res.status(500).json({ success: false, error: 'Internal Server Error', message: 'Internal Server Error' });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({ success: true, message: 'User deleted successfully' });
      } else {
        res.status(404).json({ success: false, error: 'User not found', message: 'User not found' });
      }
    }
  });
};


const deleteRegisteredUser = (req, res) => {
  const userId = req.params.userId;

  const sql = 'DELETE FROM users WHERE uid = ?';

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error deleting user from MySQL:', err);
      res.status(500).json({ success: false, error: 'Internal Server Error', message: 'Internal Server Error' });
    } else {
      if (result.affectedRows > 0) {
        res.status(200).json({ success: true, message: 'User deleted successfully' });
      } else {
        res.status(404).json({ success: false, error: 'User not found', message: 'User not found' });
      }
    }
  });
};


const forgotPassword = (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(404).send({
        success: false,
        message: "Invalid email",
      });
    }

    // Check user in MySQL
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkUserQuery, [email], (err, results) => {
      if (err) {
        console.error("Error checking user in MySQL:", err);
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

      // Generate token
      const token = JWT.sign({ id: user.uid }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      var transporter = nodemailer.createTransport({
        host: "mail.SiaraProperties.com",
        port: 465,
        secure: true, // Use SSL
        auth: {
          user: "info@SiaraProperties.com",
          pass: "SiaraProperties@123",
        },
      });

      var mailOptions = {
        from: "info@SiaraProperties.com",
        to: email,
        subject: "Password reset link",
        text: `Click this link to reset password  http://localhost:4000/reset-password/${user.uid}/${token}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .send({
          success: true,
          message: "Password reset link sent to your email",
          user: {
            id: user.uid,
            name: user.name,
            email: user.email,
            phone: user.phone,
          },
        });
    });
  } catch (error) {
    console.log(error);
    console.error("Error in registration:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error in login",
        error: error.message,
      });
  }
};

const resetPassword = (req, res) => {
  const { id, token } = req.params;
  const newPassword = req.body.password; // Assuming the password is sent in the request body

  // Validate if newPassword is present
  if (!newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "New password is required" });
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(500).json({ success: false, message: "Invalid token" });
    } else {
      const userIdFromToken = decoded.id;

      // Check if the user IDs match
      if (id != userIdFromToken) {
        return res
          .status(403)
          .json({ success: false, message: "Unauthorized access" });
      }

      const hashedPassword = bcrypt.hashSync(newPassword, 10);

      // Update the user's password in the database
      const updatePasswordQuery = "UPDATE users SET password = ? WHERE uid = ?";
      db.query(
        updatePasswordQuery,
        [hashedPassword, id],
        (updateErr, updateResults) => {
          if (updateErr) {
            console.error("Error updating password in MySQL:", updateErr);
            return res.status(500).json({
              success: false,
              message: "Internal server error while updating password",
              error: updateErr,
            });
          }

          if (updateResults.affectedRows === 0) {
            return res.status(404).json({
              success: false,
              message: "User not found for the provided ID",
            });
          }

          res.status(200).json({
            success: true,
            message: "Password reset successfully",
          });
        },
      );
    }
  });
};

const adminForgotPassword = (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(404).send({
        success: false,
        message: "Invalid email",
      });
    }

    // Check user in MySQL
    const checkUserQuery = "SELECT * FROM admin WHERE email = ?";
    db.query(checkUserQuery, [email], (err, results) => {
      if (err) {
        console.error("Error checking user in MySQL:", err);
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

      // Generate token
      const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      var transporter = nodemailer.createTransport({
        host: "mail.SiaraProperties.com",
        port: 465,
        secure: true, // Use SSL
        auth: {
          user: "info@SiaraProperties.com",
          pass: "SiaraProperties@123",
        },
      });

      var mailOptions = {
        from: "info@SiaraProperties.com",
        to: email,
        subject: "Password reset link",
        text: `Click this link to reset password  https://admin.SiaraProperties.com/reset-password/${user.id}/${token}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .send({
          success: true,
          message: "Password reset link sent to your email",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
          },
        });
    });
  } catch (error) {
    console.log(error);
    console.error("Error in registration:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error in login",
        error: error.message,
      });
  }
};

const adminResetPassword = (req, res) => {
  const { id, token } = req.params;
  const newPassword = req.body.password; // Assuming the password is sent in the request body

  // Validate if newPassword is present
  if (!newPassword) {
    return res.status(400).json({ success: false, message: "New password is required" });
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(500).json({ success: false, message: "Invalid token" });
    } else {

      const userIdFromToken = decoded.id;
     
      // Check if the user IDs match
      if (id != userIdFromToken) {
        return res.status(403).json({ success: false, message: "Unauthorized access" });
      }

      const hashedPassword = bcrypt.hashSync(newPassword, 10);

      // Update the user's password in the database
      const updatePasswordQuery = "UPDATE admin SET password = ? WHERE id = ?";
      db.query(updatePasswordQuery, [hashedPassword, id], (updateErr, updateResults) => {
        if (updateErr) {
          console.error("Error updating password in MySQL:", updateErr);
          return res.status(500).json({
            success: false,
            message: "Internal server error while updating password",
            error: updateErr,
          });
        }

        if (updateResults.affectedRows === 0) {
          return res.status(404).json({
            success: false,
            message: "User not found for the provided ID",
          });
        }

        res.status(200).json({
          success: true,
          message: "Password reset successfully",
        });
      });
    }
  });
};






module.exports = {
  userRegistration, loginController,interestedUser,getInterestedUsers, getRegisterUsers,contactedUser, getContactedUsers,forgotPassword,resetPassword,adminForgotPassword,adminResetPassword,deleteContactedUser,deleteIntrestedUser,deleteRegisteredUser}