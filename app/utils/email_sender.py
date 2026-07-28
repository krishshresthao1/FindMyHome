import smtplib
import os

from pathlib import Path
from dotenv import load_dotenv

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

ENV_PATH = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(dotenv_path=ENV_PATH, override=True)


def send_verification_email(receiver_email: str, otp: str):

    sender_email = os.getenv("EMAIL_ADDRESS")
    sender_password = os.getenv("EMAIL_PASSWORD")

    subject = "Find My Home - Email Verification"

    body = f"""
            Hello,

            Your verification code is:

            {otp}

            This code will expire in 5 minutes.

            If you did not create an account, please ignore this email.

            Find My Home
            """         

    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject

    message.attach(MIMEText(body, "plain"))

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()

        server.login(sender_email, sender_password)
        server.send_message(message)

if __name__ == "__main__":
    send_verification_email(
    "krishshrestha120@gmail.com",
    "123456"
    )