
"use client"
import { getGoogleAuthURL } from "@/services/auth";

export  default function LoginButton () {
  const handleLogin = () => {
    window.location.href = getGoogleAuthURL();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-black via-gray-900 to-blue-950">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 hover:shadow-blue-500/20 transition-all duration-300">
           
          {/* Logo Section */}
          <div className="text-center space-y-3">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl blur opacity-30 animate-pulse"></div>
              <img
                src="/logo.png"
                alt="Logo"
                className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Sign in to continue to{" "}
                <span className="font-semibold text-blue-400">ClickStore</span>
              </p>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="group relative w-full px-6 py-4 
                       bg-white border-2 border-gray-200 rounded-2xl 
                       text-gray-700 font-semibold text-base
                       shadow-sm hover:shadow-lg
                       hover:border-blue-400 hover:bg-gradient-to-r hover:from-white hover:to-blue-50
                       active:scale-[0.98] active:shadow-sm
                       transition-all duration-200 ease-out
                       focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
          >
            <div className="flex items-center justify-center gap-3">
              {/* Google Icon */}
              <div className="relative">
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google"
                  className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              
              {/* Button Text */}
              <span className="group-hover:text-blue-600 transition-colors duration-200">
                Continue with Google
              </span>
            </div>
            
            {/* Subtle hover effect overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-blue-50/0 to-transparent group-hover:via-blue-50/40 transition-all duration-300"></div>
          </button>

          {/* Footer Text */}
          <div className="text-center pt-2">
            <p className="text-xs sm:text-sm text-gray-400">
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="text-blue-400 hover:text-blue-500 font-medium transition-colors duration-200"
              >
                Terms of Service
              </a>
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl animate-pulse -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl animate-pulse -z-10 animation-delay-1000"></div>
      </div>
    </div>
  );
};
