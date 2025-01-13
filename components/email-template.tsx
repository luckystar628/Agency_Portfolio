interface EmailTemplateProps {
  subject: string;
  message: string;
}

const EmailTemplate = ({ subject, message }: EmailTemplateProps) => (
  <div>
    <h1>{subject}</h1>
    <p>Thank you for contacting us!</p>
    <p>New message submitted:</p>
    <p>{message}</p>
  </div>
);

export default EmailTemplate;
