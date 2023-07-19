const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");
module.exports = class SendEmail {
  constructor(user, url, homepageLink) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.homepage = homepageLink;
    this.from = `${process.env.platform} <${process.env.EMAIL_FROM}>`;
  }
  createTransport() {
    return nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: process.env.SEND_GRID_USERNAME,
        pass: process.env.SEND_GRID_PASSWORD,
      },
    });
  }
  //send Actual email
  async send(template, subject) {
    //Render Hml base Template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      name: this.name,
      url: this.url,
      subject,
      homepage: this.url,
      admin: process.env.EMAIL_FROM,
      platform: process.env.platform,
    });
    //Email Option
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: html,
      text: htmlToText.fromString(html),
    };
    //send Email
    await this.createTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", `Welcome To ${process.env.platform} Family`);
  }
  async sendPasswordReset() {
    await this.send("passwordReset", "Your Password Reset Token");
  }
  async sendEmailVerification() {
    await this.send("emailVerification", "Email Confirmation");
  }
};
