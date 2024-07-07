import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendVerificationEmail = async (email, token) => {
  const url = `${process.env.BASE_URL}/api/users/verify?token=${token}`;

  const mailOption = {
    to: email,
    subject: "Email Verification",
    html: `Click <a href="${url}">here</a> to verify your email.`,
  };

  try {
    await transporter.sendMail(mailOption);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw "Error sending email";
  }
};


export default sendVerificationEmail