import sgMail from "@sendgrid/mail";
import "dotenv/config";

sgMail.setApiKey(process.env.MY_SENDGRID_API_KEY);

export const sendOtpEmail = async (to, name, otp) => {
  const msg = {
    to,
    from: process.env.MY_SENDGRID_EMAIL,
    subject: "Verify Your Account - OTP Code",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Hello ${name},</h2>
        <p>Your OTP for account verification is:</p>
        <h1 style="letter-spacing: 4px;">${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
        <p>Do not share this code with anyone.</p>
        <br/>
        <strong>Team Ecommerce</strong>
      </div>
    `,
  };

  await sgMail.send(msg);
};
