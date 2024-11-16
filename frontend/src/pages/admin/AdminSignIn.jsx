import { useState } from 'react';
import { 
  Lock,
  Sun,
  Moon,
  Eye,
  EyeOff,
  ArrowRight,
  Mail
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminSignIn() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Admin form submitted:', formData);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Implement Google OAuth login
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-gray-100 to-gray-200'}`}>
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className={`max-w-md mx-auto rounded-lg shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`p-8`}>
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-white'} shadow-md`}>
                  <Lock className={`h-6 w-6 ${isDarkMode ? 'text-blue-400' : 'text-[#ff6b35]'}`} />
                </div>
                <span className={`${isDarkMode && 'text-white'} text-2xl font-bold `}>
                  Admin <span className={isDarkMode ? 'text-blue-400' : 'text-[#ff6b35]'}>Panel</span>
                </span>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-100'
                } shadow-md`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Sign in to Dashboard
            </h2>

            <div className="space-y-6">
              <button
                onClick={handleGoogleLogin}
                className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                <span>Continue with Google</span>
              </button>

              <div className="flex items-center gap-4">
                <div className={`flex-1 h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>OR</span>
                <div className={`flex-1 h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              </div> 

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 rounded-lg ${
                        isDarkMode 
                          ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-400' 
                          : 'bg-white text-gray-900 border-gray-300 focus:border-blue-600'
                      } border focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                      placeholder="admin@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Password
                  </label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-12 py-2 rounded-lg ${
                        isDarkMode 
                          ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-400' 
                          : 'bg-white text-gray-900 border-gray-300 focus:border-blue-600'
                      } border focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                      placeholder="Enter Password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      ) : (
                        <Eye className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      name="remember"
                      checked={formData.remember}
                      onChange={handleChange}
                      className={`h-4 w-4 rounded ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-blue-400 focus:ring-blue-400' 
                          : 'bg-white border-gray-300 text-blue-600 focus:ring-blue-600'
                      } focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50`}
                    />
                    <label htmlFor="remember" className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Remember me
                    </label>
                  </div>
                  <a 
                    href="#" 
                    className={`text-sm font-medium ${
                      isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gradient-to-r from-[#ff6b35] to-[#ff8c35] hover:from-[#ff8c35] hover:to-[#ff6b35]'
                  }`}
                >
                  Sign In
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>

              <p className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Need help?{' '}
                <a 
                  href="#" 
                  className={`font-medium ${
                    isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                  }`}
                >
                  Contact support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}