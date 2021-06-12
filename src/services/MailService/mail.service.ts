import mailgun, { Mailgun } from "mailgun-js";

interface MailBody {
  to: string;
  subject: string;
  html: string;
}

interface MailService {
  from: string;
  getMailClient: () => Mailgun;
  sendMessage: (mailBody: any) => Promise<Error | mailgun.messages.SendResponse>;
}

const MailService = (): MailService => {
  const client = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });
  const from = `test@${process.env.MAILGUN_DOMAIN}`;

  const getMailClient = (): Mailgun => {
    return client;
  };

  const sendMessage = async ({ to, subject, html }: MailBody): Promise<Error | mailgun.messages.SendResponse> => {
    return new Promise((resolve, reject) => {
      client.messages().send({ from, to, subject, html }, (error, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });
  };

  return {
    from,
    getMailClient,
    sendMessage,
  };
};

export default MailService;
