const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_MAILER_GMAIL,
    pass: process.env.NODE_MAILER_PASS,
  },
});

async function sendEmail({ to, subject, message, email, name }) {
  try {
    const htmlContent = getEmailHTML({ message, email, name });

    await transporter.sendMail({
      from: `Portfolio Craft <${process.env.NODE_MAILER_GMAIL}>`,
      to,
      subject,
      html: htmlContent,
    });

    console.log("✅ Email sent to:", to);
  } catch (err) {
    console.error("❌ Email failed for:", to, err);
  }
}

function getEmailHTML({ message, email, name }) {
  return `
      <div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0;">        
        <div style="padding: 20px;">
          <p>Great news! You have received a message from a recruiter:</p>
          
          <div style="background-color: #f9f9f9; border-left: 4px solid #4CAF50; padding: 15px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><span style="color: #555;"> ${message}</span></p>
          </div>
          
          <p>If you would like to respond, simply connect directly with the recruiter.</p>
          
          <p>Best regards,<br />
          <strong>The Portfolio Craft Team</strong><br />
          <a href="mailto:${process.env.NODE_MAILER_GMAIL}" style="color: #007BFF;">Contact Us</a><br />
          <small>Portfolio Craft © 2025</small></p>
        </div>
        
        <div style="background-color: #f4f4f4; padding: 10px; text-align: center;">
          <p style="font-size: 12px; color: #999;">You are receiving this email because you received a message from a recruiter on Portfolio Craft. If you did not request this message, please ignore it.</p>
        </div>
      </div>
    `;
}

module.exports = sendEmail;
