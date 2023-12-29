export type SendEmailInput = {
    title: string;
    reciepient: string;
    body: string
    templatePayload: object;
    subject: string;
    cc?: string[];
}