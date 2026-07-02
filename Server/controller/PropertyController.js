const express = require("express");
const { db } = require("../db");
const mysql = require("mysql");
const dotenv = require("dotenv");
const fs = require('fs');
const path = require('path');
const JWT = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
dotenv.config();


const addProperty =  (req,res) => {
    const formData = req.body;

     // Check if all required fields are present
     const requiredFields = [
    
     "property_address",
       "property_city", 
       "property_description" ,
        "property_type",
       "bhk" ,
        "new_resale",
        "structure",
        "price" ,
       "square_ft" ,
       "dimension" ,
        "car_parking" ,
        "year_built" ,
        "facing" ,
        'furnishing' ,
        "carpet_area" ,
        "bathroom" ,
        'property_on_floor' ,
        'flooring' ,
       'age_of_property',
        'parking' ,
        'lift'];
     const missingFields = requiredFields.filter(field => !formData.hasOwnProperty(field));
     if (missingFields.length > 0) {
        return res.status(400).json({ error: `All fields are require` });
    }

    // Insert the form data into the MySQL database
    const sql = 'INSERT INTO properties SET ?'; // Replace your_table_name with the actual table name
    db.query(sql, formData, (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const insertedData = { ...formData, id: result.insertId };
            console.log('Form data inserted successfully');
            res.status(200).json({ data:insertedData, message: 'Form submitted successfully' });
        }
    });
}


// method for edit property .

const editProperty =   (req, res) => {
    const propertyId = req.params.propertyId;
    const formData = req.body;

    // Check if all required fields are present
    const requiredFields = [
        "property_address",
        "property_city",
        "property_description",
        "property_type",
        "bhk",
        "new_resale",
        "structure",
        "price",
        "square_ft",
        "dimension",
        "car_parking",
        "year_built",
        "facing",
        'furnishing',
        "carpet_area",
        "bathroom",
        'property_on_floor',
        'flooring',
        'age_of_property',
        'parking',
        'lift'
    ];

    const missingFields = requiredFields.filter(field => !formData.hasOwnProperty(field));
    if (missingFields.length > 0) {
        return res.status(400).json({success: false, error: `All fields are required`,message: `All fields are required` });
    }

    // Update the property data in the MySQL database
    const sql = 'UPDATE properties SET ? WHERE id = ?'; // Replace 'properties' with your actual table name
    db.query(sql, [formData, propertyId], (err, result) => {
        if (err) {
            console.error('Error updating data in MySQL:', err);
            res.status(500).json({success: false, error: 'Internal Server Error', message: 'Internal Server Error'});
        } else {
            if (result.affectedRows === 0) {
                // No property found with the given ID
                res.status(404).json({success: false, error: 'Property not found' , message: 'Property not found' });
            } else {
                console.log('Property data updated successfully');
                res.status(200).json({success: true, message: 'Property updated successfully' });
            }
        }
    });
};

// method for delete property only not images

// const delete_Property =  (req, res) => {
//     const propertyId = req.params.propertyId;

//     // Check if the property with the given ID exists
//     const checkSql = 'SELECT * FROM properties WHERE id = ?'; // Replace 'properties' with your actual table name
//     db.query(checkSql, propertyId, (checkErr, checkResult) => {
//         if (checkErr) {
//             console.error('Error checking property existence in MySQL:', checkErr);
//             res.status(500).json({success:false, error: 'Internal Server Error', message: 'Internal Server Error'  });
//         } else {
//             if (checkResult.length === 0) {
//                 // No property found with the given ID
//                 res.status(404).json({success:false,  error: 'Property not found', message: 'Property not found' });
//             } else {
//                 // Delete the property from the MySQL database
//                 const deleteSql = 'DELETE FROM properties WHERE id = ?'; // Replace 'properties' with your actual table name
//                 db.query(deleteSql, propertyId, (deleteErr, deleteResult) => {
//                     if (deleteErr) {
//                         console.error('Error deleting data in MySQL:', deleteErr);
//                         res.status(500).json({ success:false, error: 'Internal Server Error', message: 'Internal Server Error' });
//                     } else {
//                         console.log('Property deleted successfully');
//                         res.status(200).json({ success:true, message: 'Property deleted successfully' });
//                     }
//                 });
//             }
//         }
//     });
// };

// method for delete all images when delete property
const deletePropertyImages = (imageId, callback) => {
  const sqlSelect = 'SELECT * FROM properties_images WHERE id = ?';
  const sqlDelete = 'DELETE FROM properties_images WHERE id = ?';

  db.query(sqlSelect, [imageId], (err, results) => {
      if (err) {
          console.error('Error fetching property image from MySQL:', err);
          callback(err);
      } else {
          if (results.length > 0) {
              const image = results[0].image;
              const imageName = path.basename(image);
              const imagePath = path.join(__dirname, '..', 'uploads', imageName);

              if (fs.existsSync(imagePath)) {
                  fs.unlinkSync(imagePath);
              } else {
                  console.error('File not found:', imagePath);
              }

              db.query(sqlDelete, [imageId], (errDelete) => {
                  if (errDelete) {
                      console.error('Error deleting property image from MySQL:', errDelete);
                      callback(errDelete);
                  } else {
                      console.log('Property image deleted successfully');
                      callback(null);
                  }
              });
          } else {
              console.error('Property image not found');
              callback('Property image not found');
          }
      }
  });
};


// method for delete property and all images associated with it.
const delete_Property = (req, res) => {
  const propertyId = req.params.propertyId;

  // Check if the property with the given ID exists
  const checkSql = 'SELECT * FROM properties WHERE id = ?';
  db.query(checkSql, propertyId, (checkErr, checkResult) => {
      if (checkErr) {
          console.error('Error checking property existence in MySQL:', checkErr);
          res.status(500).json({ success: false, error: 'Internal Server Error', message: 'Internal Server Error' });
      } else {
          if (checkResult.length === 0) {
              // No property found with the given ID
              res.status(404).json({ success: false, error: 'Property not found', message: 'Property not found' });
          } else {
              // Delete all images associated with the property
              const deleteImagesSql = 'SELECT id FROM properties_images WHERE property_id = ?';
              db.query(deleteImagesSql, propertyId, (imageErr, imageResults) => {
                  if (imageErr) {
                      console.error('Error fetching property images from MySQL:', imageErr);
                      res.status(500).json({ success: false, error: 'Internal Server Error', message: 'Internal Server Error' });
                  } else {
                      const deleteImagePromises = imageResults.map((image) => {
                          return new Promise((resolve) => {
                              deletePropertyImages(image.id, (err) => {
                                  resolve(err);
                              });
                          });
                      });

                      // Wait for all image deletions to complete
                      Promise.all(deleteImagePromises).then((errors) => {
                          const hasError = errors.some((err) => err !== null);

                          if (hasError) {
                              res.status(500).json({ success: false, error: 'Error deleting property images', message: 'Error deleting property images' });
                          } else {
                              // All images deleted successfully, now delete the property
                              const deleteSql = 'DELETE FROM properties WHERE id = ?';
                              db.query(deleteSql, propertyId, (deleteErr) => {
                                  if (deleteErr) {
                                      console.error('Error deleting property in MySQL:', deleteErr);
                                      res.status(500).json({ success: false, error: 'Internal Server Error', message: 'Internal Server Error' });
                                  } else {
                                      console.log('Property and associated images deleted successfully');
                                      res.status(200).json({ success: true, message: 'Property and associated images deleted successfully' });
                                  }
                              });
                          }
                      });
                  }
              });
          }
      }
  });
};


// method for upload images
const uploadImages =  (req, res) => {
    // Get propertyid from request body or parameters
    const {property_id} = req.body;

      // If property_id is not received, send a response
      if (!property_id) {
        return res.status(400).json({ success: false, message: "Property ID is required" });
    }

    // Access the array of uploaded files from req.files
    const images = req.files;

     // If no images are selected, send a response
     if (!images || images.length === 0) {
        return res.status(400).json({ success: false, message: "No images selected" });
    }

    // Use a counter to track the number of successful database inserts
    let successfulInserts = 0;

    // Process each image and save its path to the database
    images.forEach((image, index, array) => {
        const imagePath = image.filename; // Store only the filename

        // Insert the image path into the database
        db.query(
            'INSERT INTO properties_images (property_id	, image) VALUES (?, ?)',
            [property_id, imagePath],
            (err, results) => {
                if (err) {
                    console.error('Error saving image path to the database:', err);
                    res.status(400).json({success:false, message:err})
                } else {
                    console.log('Image path saved to the database!');
                    successfulInserts++;

                      // If all images have been processed, send a success response
                      if (successfulInserts === array.length) {
                        res.status(200).json({ success: true, message:"images saved successfully" });
                    }
                }
            }
        );
    });

};

//Method to get all property details 

const getAllProperty = (req, res) =>{
    const sql = 'SELECT * FROM properties WHERE isSold = "0"'; // Replace properties with your actual table name

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching properties from MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json({ data: results, message: 'Properties fetched successfully' });
        }
    });

}

//Method to get all property For Admin 

const getAllPropertyAdmin = (req, res) =>{
  const sql = 'SELECT * FROM properties ORDER BY id DESC'; // Replace properties with your actual table name

  db.query(sql, (err, results) => {
      if (err) {
          console.error('Error fetching properties from MySQL:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          res.status(200).json({ data: results, message: 'Properties fetched successfully' });
      }
  });

}

 //Method to get all property by type.

const getPropertyByType = (req, res) =>{

    const propertyType = req.params.propertyType;
    
    const sql = 'SELECT * FROM properties WHERE property_type = ? AND property_for = "sale" AND isSold = "0"'; // Replace properties with your actual table name

    db.query(sql,[propertyType] , (err, results) => {
        if (err) {
            console.error('Error fetching properties from MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if(results.length > 0){
                res.status(200).json({success:true, data: results, message: `${propertyType} Properties fetched successfully`});
            }
            else{
                res.status(404).json({success:false, error: 'Property not found',message:"Property not found" });
                
            }
            
        }
    });

}

// method to get property by type and bhk no.

const getPropertyByTypeAndBhk = (req, res) => {
    const propertyType = req.params.propertyType;
    const bhk = req.params.bhk; // Added line to get BHK from URL parameter

    const sql = 'SELECT * FROM properties WHERE property_type = ? AND bhk = ? AND property_for = "sale" AND isSold = "0"'; // Updated SQL query

    db.query(sql, [propertyType, bhk], (err, results) => {
        if (err) {
            console.error('Error fetching properties from MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                res.status(200).json({ success: true, data: results, message: `${propertyType} ${bhk} Properties fetched successfully` });
            } else {
                res.status(404).json({ success: false, error: 'Property not found', message: "Property not found" });
            }
        }
    });
}

//get Property For Resale

const getPropertyForResaleAndType = (req, res) => {
    const propertyType = req.params.propertyType;
    

    const sql = 'SELECT * FROM properties WHERE property_type = ? AND new_resale = "resale" AND property_for = "sale" AND isSold = "0"'; // Updated SQL query

    db.query(sql, [propertyType], (err, results) => {
        if (err) {
            console.error('Error fetching properties from MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                res.status(200).json({ success: true, data: results, message: `${propertyType} Properties fetched successfully` });
            } else {
                res.status(404).json({ success: false, error: 'Property not found', message: "Property not found" });
            }
        }
    });
}

//Method to get all rented property.

const getPropertyForRent = (req, res) =>{

    
    
    const sql = 'SELECT * FROM properties WHERE property_for = "rent" AND isSold = "0"'; // Replace properties with your actual table name

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching properties from MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if(results.length > 0){
                res.status(200).json({success:true, data: results, message: `Rented Properties fetched successfully`});
            }
            else{
                res.status(404).json({success:false, error: 'Property not found',message:"Property not found" });
                
            }
            
        }
    });

}

//

const getPropertyForRentByType = (req, res) =>{

    
    const propertyType = req.params.propertyType;
    const sql = 'SELECT * FROM properties WHERE property_for = "rent" AND property_type = ? AND isSold = "0"'; // Replace properties with your actual table name

    db.query(sql,[propertyType], (err, results) => {
        if (err) {
            console.error('Error fetching properties from MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if(results.length > 0){
                res.status(200).json({success:true, data: results, message: `Rented Properties fetched successfully`});
            }
            else{
                res.status(404).json({success:false, error: 'Property not found',message:"Property not found" });
                
            }
            
        }
    });

}



 //Method to get all property Images 
const getAllPropertyImages = (req, res) =>{
    const sql = 'SELECT * FROM properties_images'; // Replace properties with your actual table name

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching properties from MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const updatedResults = results.map(row => ({
                ...row,
                image: `${process.env.BACKEND_BASE_URL}/uploads/${path.basename(row.image)}`
            }));
            res.status(200).json({ data: updatedResults, message: 'Properties images fetched successfully' });
        }
    });

}



const getPropertyById = (req, res) => {
    const propertyId = req.params.propertyId;
    const sqlSelect = 'SELECT * FROM properties WHERE id = ?';
    const sqlUpdateVisits = 'UPDATE properties SET visits = visits + 1 WHERE id = ?';

    db.beginTransaction((err) => {
        if (err) {
            console.error('Error starting database transaction:', err);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
            return;
        }

        // Step 1: Fetch property details
        db.query(sqlSelect, [propertyId], (selectErr, results) => {
            if (selectErr) {
                console.error('Error fetching property from MySQL:', selectErr);
                res.status(500).json({ success: false, error: 'Internal Server Error' });
                db.rollback();
            } else {
                if (results.length > 0) {
                    // Step 2: Update visit count
                    db.query(sqlUpdateVisits, [propertyId], (updateErr) => {
                        if (updateErr) {
                            console.error('Error updating property visit count:', updateErr);
                            res.status(500).json({ success: false, error: 'Internal Server Error' });
                            db.rollback();
                        } else {
                            // Commit the transaction
                            db.commit((commitErr) => {
                                if (commitErr) {
                                    console.error('Error committing transaction:', commitErr);
                                    res.status(500).json({ success: false, error: 'Internal Server Error' });
                                    db.rollback();
                                } else {
                                    res.status(200).json({
                                        success: true,
                                        data: results[0],
                                        message: 'Property fetched successfully',
                                    });
                                }
                            });
                        }
                    });
                } else {
                    res.status(404).json({ success: false, error: 'Property not found', message: 'Property not found' });
                    db.rollback();
                }
            }
        });
    });
};


//Method to get one property by Id

const getPropertyImagesById = (req, res) => {
    const propertyId = req.params.propertyId;
     // Assuming the parameter name in the route is 'propertyId'
    const sql = 'SELECT * FROM properties_images WHERE property_id = ?'; // Replace properties with your actual table name

    db.query(sql, [propertyId], (err, results) => {
        if (err) {
            console.error('Error fetching property from MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                const updatedResults = results.map(row => ({
                    ...row,
                    image: `${process.env.BACKEND_BASE_URL}/uploads/${path.basename(row.image)}`
                }));
                res.status(200).json({success:true, data: updatedResults, message: 'Property images fetched successfully' });
            } else {
                res.status(404).json({success:false, error: 'Property not found' ,message:"Property not found" });
            }
        }
    });
}

//method to delete property images by id

const deletePropertyImageById = (req, res) => {
    const imageId = req.params.imageId;

    const sqlSelect = 'SELECT * FROM properties_images WHERE id = ?';
    const sqlDelete = 'DELETE FROM properties_images WHERE id = ?';

    db.query(sqlSelect, [imageId], (err, results) => {
        if (err) {
            console.error('Error fetching property image from MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                
                // Delete the image file from the server if needed
                const image = results[0].image; // Assuming the column name for the image path is 'image'
                const imageName = path.basename(image);  // Extract the file name from the URL
                const imagePath = path.join(__dirname, '..', 'uploads', imageName);  // for the provide the proper path

                // Check if the file exists
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                } else {
                    console.error('File not found:', imagePath);
                }
              
                db.query(sqlDelete, [imageId], (errDelete) => {
                    if (errDelete) {
                        console.error('Error deleting property image from MySQL:', errDelete);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                    

                        res.status(200).json({
                            success: true,
                            message: 'Property image deleted successfully',
                        });
                    }
                });
            } else {
                res.status(404).json({ success: false, error: 'Property image not found', message: 'Property image not found' });
            }
        }
    });
};

// method for suggested property for user

const getSuggestedProperty = (req, res) => {
    const sql = 'SELECT * FROM properties WHERE id IN (SELECT property_id FROM suggestions) AND property_for = "sale" AND isSold = "0"';
     // Assuming the parameter name in the route is 'propertyId'
    // const sql = 'SELECT * FROM properties_images WHERE property_id = ?';
     // Replace properties with your actual table name

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching property from MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                res.status(200).json({success:true, data: results, message: 'suggested Property fetched successfully' });
            } else {
                res.status(200).json({success:false, error: 'Property not found' ,message:'Property not found' });
            }
        }
    });
}

// method for suggested property for admin

const getSuggestedPropertyAdmin = (req, res) => {
  const sql = 'SELECT * FROM properties WHERE id IN (SELECT property_id FROM suggestions) AND property_for = "sale"';
   // Assuming the parameter name in the route is 'propertyId'
  // const sql = 'SELECT * FROM properties_images WHERE property_id = ?';
   // Replace properties with your actual table name

  db.query(sql, (err, results) => {
      if (err) {
          console.error('Error fetching property from MySQL:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          if (results.length > 0) {
              res.status(200).json({success:true, data: results, message: 'suggested Property fetched successfully' });
          } else {
              res.status(200).json({success:false, error: 'Property not found' ,message:'Property not found' });
          }
      }
  });
}

// method for suggested property images
const getSuggestedPropertyImages = (req, res) => {
    const sql = 'SELECT * FROM properties_images WHERE property_id IN (SELECT property_id FROM suggestions)';
     // Assuming the parameter name in the route is 'propertyId'
    // const sql = 'SELECT * FROM properties_images WHERE property_id = ?';
     // Replace properties with your actual table name

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching property from MySQL:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                const updatedResults = results.map(row => ({
                    ...row,
                    image: `${process.env.BACKEND_BASE_URL}/uploads/${path.basename(row.image)}`
                }));
                res.status(200).json({ success:true, data: updatedResults, message: 'suggested Property fetched successfully' });
            } else {
                res.status(404).json({success:false, error: 'Property not found' ,message:"Property not found" });
            }
        }
    });
}

//method to post suggested property.

const addSuggestedPropperty = (req, res) => {
    const { property_id } = req.body;
   
  
    if (!property_id) {
      return res.status(400).json({success: false, error: 'Missing required fields' , message:"Property Id required" });
    }

       // Check if the property_id already exists
  const selectQuery = 'SELECT * FROM suggestions WHERE property_id = ?';
  const selectValues = [property_id];

  db.query(selectQuery, selectValues, (selectErr, selectResults) => {
    if (selectErr) {
      console.error('Error checking property_id:', selectErr);
      return res.status(500).json({ success: false, error: 'Internal Server Error', message: 'Internal Server Error' });
    }

    if (selectResults.length > 0) {
      // The property_id already exists in the database
      return res.status(409).json({ success: false, error: 'Conflict', message: 'Property ID already exists' });
    }

  
    const insertQuery = 'INSERT INTO suggestions ( property_id) VALUES (?)';
    const values = [ property_id];
  
    db.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error('Error inserting property:', err);
        return res.status(500).json({success: false, error: 'Internal Server Error',message:'Internal Server Error' });
      }
  
      console.log('Suggested Property inserted successfully');
      res.json({ success: true, property_id: result.insertId , message : "Suggested property added successfully" });
    });
});
  };

// method to get most visited property;

const getMostVisitedProperties = (req, res) => {
    const sqlSelectMostVisited = 'SELECT * FROM properties WHERE property_for = "sale" AND isSold = "0" ORDER BY visits DESC LIMIT 20'; // Adjust the LIMIT as needed

    db.query(sqlSelectMostVisited, (error, results) => {
        if (error) {
            console.error('Error fetching most visited properties:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        } else {
            res.status(200).json({
                success: true,
                data: results,
                message: 'Most visited properties fetched successfully',
            });
        }
    });
};

// method to get Recently posted property;

const getRecentlyPostedProperties = (req, res) => {
    const sqlSelectMostVisited = 'SELECT * FROM properties WHERE property_for = "sale" AND isSold = "0" ORDER BY id DESC LIMIT 20'; // Adjust the LIMIT as needed

    db.query(sqlSelectMostVisited, (error, results) => {
        if (error) {
            console.error('Error fetching most visited properties:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        } else {
            res.status(200).json({
                success: true,
                data: results,
                message: 'Most visited properties fetched successfully',
            });
        }
    });
};


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


  const adminRegistration =  (req, res) => {
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
  
  const adminLoginController =  (req, res) => {
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
      db.query(checkUserQuery, [email],  (err, results) => {
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

    //method for property marked as sold.

    const markedAsSold = (req, res) => {
      const propertyId = req.params.propertyId;
  
      const sql = "UPDATE properties SET isSold = '1' WHERE id = ?";
      db.query(sql, [propertyId], (err, result) => {
        if (err) {
          console.error("Error updating data in MySQL:", err);
          res
            .status(500)
            .json({
              success: false,
              error: "Internal Server Error",
              message: "Internal Server Error",
            });
        } else {
          if (result.affectedRows === 0) {
            // No property found with the given ID
            res
              .status(404)
              .json({
                success: false,
                error: "Property not found",
                message: "Property not found",
              });
          } else {
            console.log("Property Mark as Sold successfully");
            res
              .status(200)
              .json({ success: true, message: "Property Mark as Sold successfully" });
          }
        }
      });
    };
  
    const romeveAsSold = (req, res) => {
      const propertyId = req.params.propertyId;
  
      const sql = "UPDATE properties SET isSold = '0' WHERE id = ?";
      db.query(sql, [propertyId], (err, result) => {
        if (err) {
          console.error("Error updating data in MySQL:", err);
          res
            .status(500)
            .json({
              success: false,
              error: "Internal Server Error",
              message: "Internal Server Error",
            });
        } else {
          if (result.affectedRows === 0) {
            // No property found with the given ID
            res
              .status(404)
              .json({
                success: false,
                error: "Property not found",
                message: "Property not found",
              });
          } else {
            console.log("Property remove as Sold successfully");
            res
              .status(200)
              .json({ success: true, message: "Property remove as Sold successfully" });
          }
        }
      });
    };
  
    // method to remove property from suggested property.

    const removeSuggestedProperty =  (req, res) => {
      const propertyId = req.params.propertyId;
  
      // Check if the property with the given ID exists
      const checkSql = 'SELECT * FROM suggestions WHERE property_id = ?'; // Replace 'properties' with your actual table name
      db.query(checkSql, propertyId, (checkErr, checkResult) => {
          if (checkErr) {
              console.error('Error checking property existence in MySQL:', checkErr);
              res.status(500).json({success:false, error: 'Internal Server Error', message: 'Internal Server Error'  });
          } else {
              if (checkResult.length === 0) {
                  // No property found with the given ID
                  res.status(404).json({success:false,  error: 'Property not found', message: 'Property not found' });
              } else {
                  // Delete the property from the MySQL database
                  const deleteSql = 'DELETE FROM suggestions WHERE property_id = ?'; // Replace 'properties' with your actual table name
                  db.query(deleteSql, propertyId, (deleteErr, deleteResult) => {
                      if (deleteErr) {
                          console.error('Error deleting data in MySQL:', deleteErr);
                          res.status(500).json({ success:false, error: 'Internal Server Error', message: 'Internal Server Error' });
                      } else {
                          console.log('Property remove successfully');
                          res.status(200).json({ success:true, message: 'Property remove successfully' });
                      }
                  });
              }
          }
      });
  };






module.exports = {addProperty, interestedUser, adminLoginController, adminRegistration, userRegistration, loginController, uploadImages, getAllProperty,getAllPropertyImages,getPropertyById ,getPropertyImagesById ,getSuggestedProperty ,addSuggestedPropperty,getSuggestedPropertyImages,getPropertyByType,getMostVisitedProperties,getRecentlyPostedProperties,getPropertyForRent,editProperty,delete_Property,deletePropertyImageById, getPropertyByTypeAndBhk , getPropertyForRentByType,getPropertyForResaleAndType,markedAsSold,romeveAsSold,removeSuggestedProperty,getAllPropertyAdmin,getSuggestedPropertyAdmin}