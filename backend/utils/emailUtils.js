const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

const createTransporter = () => {
	return nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});
};

const sendEmail = async (email, subject, htmlContent) => {
	try {
		const transporter = createTransporter();
		const mailOptions = {
			from: `"EduEden" <${process.env.EMAIL_USER}>`,
			to: email,
			subject: subject,
			html: htmlContent,
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error("Error sending email:", error);
				throw new Error("Error in sending email");
			} else {
				console.log("Email sent:", info.response);
			}
		});
	} catch (error) {
		console.error("Email sending error: ", error);
		throw new Error("Error in sending email");
	}
};
const sendOTPEmail = async (email, otp) => {
   const htmlContent = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
         <!-- Logo Text Section -->
         <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="font-size: 48px; font-weight: bold; margin: 0;">
               🎓 <span style="color: #333333;">Edu</span><span style="color: #FF5722;">Eden</span>
            </h1>
         </div>

         <h2 style="color: #ff5722; text-align: center; margin-bottom: 30px;">
            Welcome to Your Learning Journey! 🌱
         </h2>
         
         <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
            We're excited to have you join our community of learners! Let's make your education journey amazing together. 📚✨
         </p>
         
         <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center;">
            <p style="margin-bottom: 10px; font-size: 16px;">Your verification code is:</p>
            <h1 style="background-color: #f2f2f2; color: #ff5722; font-size: 36px; margin: 10px 0; padding: 20px; border-radius: 8px; letter-spacing: 5px;">
               ${otp}
            </h1>
            <p style="color: #666; font-size: 14px;">
               ⏰ Code expires in 2 minutes
            </p>
         </div>
         
         <p style="font-size: 14px; color: #666; margin-top: 20px;">
            🔒 For your security, please don't share this code with anyone.
         </p>
         
         <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="font-size: 14px; color: #888;">
               Questions? We're here to help! 💡<br>
               Contact us at <a href="mailto:support@edueden.com" style="color: #ff5722; text-decoration: none;">support@edueden.com</a>
            </p>
         </div>

         <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #888;">
            © ${new Date().getFullYear()} EduEden. All rights reserved.
         </div>
      </div>
   `;

   const subject = '🔑 Verify Your EduEden Account';
   await sendEmail(email, subject, htmlContent);
}



const sendWelcomeMail = async (email) => {
	const subject = "Welcome to EduEden";
	sendEmail(email, subject);
};

const sendPasswordResetEmail = async (email, resetLink) => {
	const message = `Click the link below to reset your password: ${resetLink}`;
	const subject = "Password Reset Request";
	sendEmail(email, subject);
};

module.exports = {
	sendOTPEmail,
	sendWelcomeMail,
	sendPasswordResetEmail,
};
