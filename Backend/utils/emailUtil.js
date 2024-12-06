import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendOtpEmail = async (email, otp) => {
    const message = {
        to: email,
        from: process.env.SENDER_EMAIL, // Your verified sender email
        subject: 'Verify Your Email',
        text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
        html: `<p>Your OTP is <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
    };

    await sgMail.send(message);
};
