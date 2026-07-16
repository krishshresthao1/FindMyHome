const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium transition duration-300";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
      "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100",

    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
