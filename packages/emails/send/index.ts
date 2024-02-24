import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export interface IEmailType {
    react: JSX.Element;
    subject: string;
    to: string[];
    from: string;
}

export async function sendEmail(email: IEmailType) {
    return await resend.emails.send(email);
}
