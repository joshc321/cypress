/**
 * @SendEmail
 */
import sgMail from '@sendgrid/mail'

function sendEmail(to, subject, text, html)
{
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
    to: to, // Change to your recipient
    from: 'cypress@joshcordero.com', // Change to your verified sender
    subject: subject,
    text: text,
    html: html,
    }
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })
}

export default sendEmail;
