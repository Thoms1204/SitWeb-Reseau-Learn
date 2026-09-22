// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(to: string, token: string): Promise<void> {
  console.log(`Sending verification email to ${to} with token ${token}`);
}

export async function sendPasswordResetEmail(to: string, token: string): Promise<void> {
  console.log(`Sending password reset to ${to} with token ${token}`);
}

export async function sendDeletionConfirmationEmail(to: string, token: string): Promise<void> {
  console.log(`Sending deletion confirmation to ${to} with token ${token}`);
}

export async function sendExportReadyEmail(to: string, downloadUrl: string): Promise<void> {
  console.log(`Sending export ready to ${to} with URL ${downloadUrl}`);
}

export async function sendDeletionScheduledEmail(to: string, cancelUrl: string): Promise<void> {
  console.log(`Sending deletion scheduled to ${to} with URL ${cancelUrl}`);
}
