import os
import resend
from dotenv import load_dotenv

load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")


def send_verification_email(email: str, otp: str):

    try:
        response = resend.Emails.send(
            {
                "from": "FindMyHome <onboarding@resend.dev>",
                "to": [email],
                "subject": "Verify your FindMyHome account",
                "html": f"""
                    <h2>Welcome to FindMyHome</h2>
                    <p>Your verification OTP is:</p>
                    <h1>{otp}</h1>
                    <p>This OTP expires soon.</p>
                """,
            }
        )

        print("RESEND RESPONSE:", response)

    except Exception as e:
        print("RESEND FAILED:", repr(e))
        raise e