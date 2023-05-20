import type { NextApiRequest, NextApiResponse } from 'next'
const nodemailer = require("nodemailer");



type MailRes = {
  message: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<MailRes> ) {

  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    auth: {
      user: process.env.OUTLOOK_EMAIL,
      pass: process.env.OUTLOOK_PASSWORD
    }
  });

  const options = {
    from: process.env.OUTLOOK_EMAIL,
    to: req.body.email,
    subject: "Info about your dog match!",
    text: req.body.message,
    html: `<h4>Hi ${req.body.name},</h4>
            <p>Here is some information on your recent match!</p>
            <ul>
                <li>Dog Name: ${req.body.dogName}</li>
                <li>Owner Name: Raphael </li>
                <li>Location: ${req.body.location}</li>
                <li>Phone: ${req.body.phone}</li>
                <li>Email: ${req.body.dogEmail}</li>
            </ul>
            <p>If you wish to reply, please reply to ${req.body.email}</p>`
  }

  if(req.method === "POST") {
    try {
      await transporter.sendMail(options);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'max-age=180000');
        res.end("Message sent successfully!");
    } catch (err) {
      console.log(err);
      res.status(500).end()
    }
  }
  
  res.status(405).end()
}

