// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Setup the Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE,
    port: 587, // Or the port used by your SMTP service
    secure: false, // True for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Endpoint to handle payment success
app.post('/api/payment-success', async (req, res) => {
    const { orderID, email, productName, downloadLink } = req.body;

    // Validate payment with PayPal (for demo, we'll assume payment is valid)
    // You'd normally use PayPal's API to verify the payment here

    // Prepare the email content
    const mailOptions = {
        from: 'noreply@rileyb.co.uk',
        to: email,
        subject: 'Your Download Link',
        text: `Thank you for purchasing ${productName}. You can download it using the following link: ${downloadLink}`,
        html: `<p>Thank you for purchasing <strong>${productName}</strong>.</p><p>You can download it using the following link: <a href="${downloadLink}">${downloadLink}</a></p>`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to send email' });
        }
        res.status(200).json({ message: 'Email sent successfully' });
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
