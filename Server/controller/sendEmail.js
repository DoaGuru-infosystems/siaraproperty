const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

/**
 * Reusable function to send emails using the project's mail configuration.
 * @param {Object} options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content
 * @param {string} options.html - HTML content (optional)
 * @returns {Promise<any>}
 */
const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT) || 465,
    secure: process.env.EMAIL_SECURE === "false" ? false : true, // Use SSL/TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Siara Properties" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: subject || "Notification from Siara Properties",
    text: text,
    html: html,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error in nodemailer sendMail:", error);
        reject(error);
      } else {
        console.log("Email sent successfully: " + info.response);
        resolve(info);
      }
    });
  });
};

/**
 * Controller to handle POST requests for sending emails.
 */
const sendEmailController = async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    if (!to) {
      return res.status(400).json({
        success: false,
        message: "Recipient email (to) is required",
      });
    }

    const info = await sendEmail({ to, subject, text, html });
    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      info: info.response,
    });
  } catch (error) {
    console.error("Error in sendEmailController:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
};

module.exports = {
  sendEmail,
  sendEmailController,
};
