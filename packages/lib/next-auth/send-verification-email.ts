import { addHours } from "date-fns";

import type { User } from "@workspace/db/client";
import { db } from "@workspace/db";
import { sendEmail } from "@workspace/emails/send";
import { VerifyEmailTemplate } from "@workspace/emails/templates";
import { getBaseUrl } from "../utils/get-base-url";


export async function sendVerificationEmail(user: User) {
    const token = await db.verificationToken.create({
        data: {
            identifier: "verify-email",
            userId: user.id,
            expires: addHours(Date.now(), 2),
        },
    });
    const verifyLink = `${getBaseUrl()}/verify-email?token=${token.id}`;
    return await sendEmail({
        react: VerifyEmailTemplate({ verifyLink: verifyLink }),
        subject: "Please verify your email",
        to: [user.email],
        from: process.env.SENDER_EMAIL_ADDRESS!, 
    });
}