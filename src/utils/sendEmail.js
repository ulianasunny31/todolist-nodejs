import createHttpError from 'http-errors';
import { SMTP } from '../constants/index.js';
import { getEnvVariables } from './getEnvVariables.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: getEnvVariables(SMTP.SMTP_HOST),
  port: Number(getEnvVariables(SMTP.SMTP_PORT)),
  auth: {
    user: getEnvVariables(SMTP.SMTP_USER),
    pass: getEnvVariables(SMTP.SMTP_PASSWORD),
  },
});

export async function sendEmail(options) {
  const email = await transporter.sendMail(options);

  if (email.rejected && email.rejected.length > 0) {
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }

  return email;
}
