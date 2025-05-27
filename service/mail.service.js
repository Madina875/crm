const nodemailer = require("nodemailer");
const config = require("config");
const recipient = config.get("smtp_recepient");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      host: config.get("smtp_host"),
      port: config.get("smtp_port"),
      secure: false,
      auth: {
        user: config.get("smtp_user"),
        pass: config.get("smtp_password"),
      },
    });
  }

  async sendMail(recipients, otp) {
    await this.transporter.sendMail({
      from: config.get("smtp_user"),
      to: recipient,
      subject: "Itterm akkauntini faollashtirish ",
      text: "",
      html: `
         <div>
           <h2>Kod</h2>
            <h3>${otp}</h3>
           </div>
        `,
    });
  }
}

module.exports = new MailService();
