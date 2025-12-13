const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const { transporter } = require("../../config/email.config");

class EmailService {
  sendVerifyCodeByEmail = async (email) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      // đọc file template
      const templatePath = path.join(
        __dirname,
        "../../templates/email.template.html"
      );
      const source = fs.readFileSync(templatePath, "utf8");

      // compile template
      const template = handlebars.compile(source);

      // inject data
      const html = template({ code });

      const info = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Your verification code",
        html,
      });

      if (info) return code;
      return null;
    } catch (err) {
      console.error("Send email error:", err);
      return null;
    }
  };
}

module.exports = new EmailService();
