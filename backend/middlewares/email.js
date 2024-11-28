// email.js (middleware)

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',  // You can replace it with another service (e.g., Yahoo, Outlook)
  auth: {
    user: 'maytotmat@gmail.com',  // Replace with your email
    pass: 'kumqqqhabbeyqjae',     // Replace with your email app password
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Meb Blog House" <maytotmat@gmail.com>',  // Sender address
      to,  // Receiver's email address
      subject,  // Subject line
      html,  // HTML content
    });
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error;  // You can handle this differently depending on your needs
  }
};

module.exports = { sendEmail };
