import logo from "../../assets/images/Logo.png";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <img
          src={logo}
          alt="FindMyHome"
          className="w-56 animate-[fadeIn_1.2s_ease-in-out]"
          
        />

        <p className="mt-6 text-lg font-medium text-slate-600">
          Find My Home
        </p>
      </div>
    </div>
  );
}
