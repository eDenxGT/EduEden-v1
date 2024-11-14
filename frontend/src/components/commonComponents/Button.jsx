/* eslint-disable react/prop-types */

const Button = ({ type = "button", text, onClick, className, children, disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-1.5 px-3 text-sm transition-colors ${className} 
        ${disabled ? "bg-[#ffc4b1] cursor-not-allowed" : "bg-[#FF5722] hover:bg-[#F4511E] text-white"}`}
      disabled={disabled}
    >
      {text}
      {children}
    </button>
  );
}

export default Button;
