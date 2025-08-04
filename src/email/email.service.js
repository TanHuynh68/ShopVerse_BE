const { transporter } = require("../../config/email.config");

class emailSerivce {
  // Create a transporter for SMTP
  sendVerifyCodeByEmail = async (email) => {
    let code = Math.floor(100000 + Math.random() * 900000) + "";
    try {
      const info = await transporter.sendMail({
        from: process.env.SMTP_USER, // sender address
        to: email, // list of receivers
        subject: "Your verify code", // Subject line
        text: "", // plain text body
        html: code,
      });
      if (info) {
        return code;
      }
      return null;
    } catch (err) {
      console.error("Error while sending mail", err);
    }
  };
}
module.exports = new emailSerivce();
