import type { Transporter } from "nodemailer";

export enum MailResponseStatuses {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}

export default class MailService {
  private readonly nodemailer = require("nodemailer");
  private readonly mailOptions: IMailOptions | null = null;
  private readonly transporter: Transporter | null = null;

  constructor(from: string, to: string, subject: string, text: string) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("dotenv").config();

    // set options
    this.mailOptions = {
      from: from,
      to: to,
      subject: subject,
      text: text,
    };

    // set transporter
    this.transporter = this.nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  /**
   * This method is used to
   * send mail
   * @private
   */
  public async sendMail() {
    if (!this.transporter) return;
    if (!this.mailOptions) return;

    try {
      const mailResponse = await this.transporter.sendMail(this.mailOptions);
      console.log(mailResponse);

      return MailResponseStatuses.SUCCESS;
    } catch (error: any) {
      console.log(error);
      return MailResponseStatuses.ERROR;
    }
  }
}
