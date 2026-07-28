import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { verifyEmail, resendOtp } from "../../services/api";

const VerifyEmailForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [code, setCode] = useState("");

  const [cooldown, setCooldown] = useState(0);

  const [isSending, setIsSending] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await verifyEmail({
        email,
        code,
      });
      
      toast.success(response.data.message);

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.detail);
    }

   
  };

   useEffect(() => {
     if (!email) return;

     const cooldownKey = `otpCooldown_${email}`;

     const endTime = localStorage.getItem(cooldownKey);

     if (!endTime) return;

     const remaining = Math.ceil((Number(endTime) - Date.now()) / 1000);

     if (remaining > 0) {
       setCooldown(remaining);
     } else {
       localStorage.removeItem(cooldownKey);
     }
   }, [email]);

  useEffect(() => {
    if (!email) return;

    const cooldownKey = `otpCooldown_${email}`;

    if (cooldown <= 0) {
      localStorage.removeItem(cooldownKey);
      return;
    }

    const timer = setTimeout(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [cooldown, email]);

 const handleResendOtp = async () => {
   if (isSending || cooldown > 0) return;

   setIsSending(true);

   const endTime = Date.now() + 60000;

   const cooldownKey = `otpCooldown_${email}`;

   localStorage.setItem(cooldownKey, endTime);
   setCooldown(60);

   try {
     const response = await resendOtp(email);

     toast.success(response.data.message);
   } catch (error) {
     // Allow retry if sending failed
    localStorage.removeItem(cooldownKey);
     setCooldown(0);

     toast.error(
       error.response?.data?.detail || "Failed to resend verification code.",
     );
   } finally {
     setIsSending(false);
   }
 };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <form
        onSubmit={handleVerify}
        className="w-[400px] rounded-xl bg-white p-8 shadow-lg"
      >
        <h2 className="mb-2 text-center text-3xl font-bold">Verify Email</h2>

        <p className="mb-6 text-center text-gray-500">
          Enter the 6-digit code sent to
          <br />
          <span className="font-semibold">{email}</span>
        </p>

        <input
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mb-6 w-full rounded-xl border p-4 text-center text-2xl tracking-[12px]"
          placeholder="000000"
        />

        <p className="mt-4 text-center text-sm text-gray-500">
          Didn't receive the code?
        </p>

        <button
          type="button"
          onClick={handleResendOtp}
          disabled={isSending || cooldown > 0}
          className={`mt-2 w-full font-semibold transition ${
            isSending || cooldown > 0
              ? "cursor-not-allowed text-gray-400"
              : "text-blue-600 hover:underline"
          }`}
        >
          {isSending
            ? "Sending..."
            : cooldown > 0
              ? `Resend Code (${cooldown}s)`
              : "Resend Code"}
        </button>

        <button className="w-full rounded-xl bg-blue-600 p-4 text-white hover:bg-blue-700">
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default VerifyEmailForm;
