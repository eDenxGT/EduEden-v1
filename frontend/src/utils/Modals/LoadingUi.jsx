import React from 'react';
import { PiGraduationCap } from "react-icons/pi";

const LoadingUi = ({ isDarkMode = true }) => {
  const letters = ['E', 'd', 'u', 'E', 'd', 'e', 'n'];
  
  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="flex flex-col items-center gap-4">
        <PiGraduationCap className="h-12 w-12 text-[#FF5722] animate-bounce" />
        <div className="flex items-center">
          {letters.map((letter, index) => (
            <span
              key={index}
              className={`text-4xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              } ${index === 3 ? 'text-[#FF5722]' : ''} opacity-0 animate-fadeIn`}
              style={{
                animationDelay: `${index * 200}ms`,
                animationFillMode: 'forwards'
              }}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className={`w-16 h-1 mt-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div className="w-full h-full bg-[#FF5722] animate-loading"></div>
        </div>
      </div>
    </div>
  );
};

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes loading {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }

  .animate-loading {
    animation: loading 1.5s infinite;
  }
`;
document.head.appendChild(style);

export default LoadingUi;