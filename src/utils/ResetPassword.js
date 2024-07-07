import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendResetPasswordMail = async (email, token) => {

  const mailOption = {
    to: email,
    subject: "Email Verification",
    html: `Copy this token ${token}`,
  };

  try {
    await transporter.sendMail(mailOption);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw "Error sending email";
  }
};


export default sendResetPasswordMail