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

/**
 * Sends notification to Admin when a new popup enquiry is received
 */
const sendPopupLeadNotification = async ({ name, phone, email, propertyType, message }) => {
  const adminEmail = process.env.EMAIL_USER || "doaguruinfosystems@gmail.com";
  const emailSubject = "popup lead of siara propertys";
  const propType = propertyType || "General Enquiry";
  const userEmail = email && email.trim() ? email.trim() : null;
  const userMessage = message && message.trim() ? message.trim() : "";

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0d8cc; border-radius: 10px; background-color: #fdfcf9;">
      <div style="text-align: center; border-bottom: 2px solid #b8895a; padding-bottom: 15px; margin-bottom: 20px;">
        <h2 style="color: #2c2c28; margin: 0;">🏠 New Popup Lead Received</h2>
        <p style="color: #b8895a; margin: 5px 0 0; font-weight: bold; letter-spacing: 1px;">SIARA PROPERTIES</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #555; width: 35%;">Customer Name:</td>
          <td style="padding: 10px 0; color: #222; font-weight: bold;">${name}</td>
        </tr>
        <tr style="background-color: #f6f3ed;">
          <td style="padding: 10px; font-weight: bold; color: #555;">Mobile Number:</td>
          <td style="padding: 10px; color: #b8895a; font-weight: bold; font-size: 16px;">
            <a href="tel:+91${phone}" style="color: #b8895a; text-decoration: none;">+91 ${phone}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #555;">Email Address:</td>
          <td style="padding: 10px 0; color: #222;">${userEmail ? `<a href="mailto:${userEmail}">${userEmail}</a>` : '<span style="color: #999;">Not provided</span>'}</td>
        </tr>
        <tr style="background-color: #f6f3ed;">
          <td style="padding: 10px; font-weight: bold; color: #555;">Interested In:</td>
          <td style="padding: 10px; color: #222; font-weight: bold;">${propType}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #555;">Requirement / Locality:</td>
          <td style="padding: 10px 0; color: #333;">${userMessage || 'Interested in property consultation in Jabalpur.'}</td>
        </tr>
        <tr style="background-color: #f6f3ed;">
          <td style="padding: 10px; font-weight: bold; color: #555;">Date & Time:</td>
          <td style="padding: 10px; color: #666;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</td>
        </tr>
      </table>
      <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #e0d8cc; font-size: 12px; color: #888; text-align: center;">
        This is an automated popup lead notification from Siara Properties website.
      </div>
    </div>
  `;

  const emailText = `New Popup Lead received on Siara Properties:
Name: ${name}
Phone: +91 ${phone}
Email: ${userEmail || 'Not provided'}
Interested In: ${propType}
Message: ${userMessage || 'N/A'}
Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  return sendEmail({
    to: adminEmail,
    subject: emailSubject,
    text: emailText,
    html: emailHtml,
  });
};

module.exports = {
  sendEmail,
  sendEmailController,
  sendPopupLeadNotification,
};
