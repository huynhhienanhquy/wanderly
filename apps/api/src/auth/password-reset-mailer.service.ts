import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordResetMailerService {
  async send(email: string, token: string): Promise<void> {
    const webUrl = process.env.WEB_URL ?? 'http://localhost:3000';
    const resetUrl = `${webUrl}/reset-password?token=${encodeURIComponent(token)}`;
    if (process.env.NODE_ENV !== 'production') {
      console.info(`[password-reset] ${email}: ${resetUrl}`);
    }
    // Production provider integration will replace this adapter without changing auth logic.
  }
}
