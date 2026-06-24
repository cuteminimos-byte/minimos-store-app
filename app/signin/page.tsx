// Path: app/@modals/signin/page.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInModal() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1); // 1 = Email, 2 = OTP Code
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === 2 && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [step]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setStep(2);
  };

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Jab cross par click ho to wapis home background par aa jaye bina page tooray
  const closeModal = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs px-4">
      {/* Background par click karne se bhi modal band ho jaye */}
      <div className="absolute inset-0" onClick={closeModal} />

      <div className="bg-white w-full max-w-[440px] rounded-2xl shadow-2xl p-8 relative flex flex-col items-center z-10 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Close Cross Button */}
        <button onClick={closeModal} className="absolute right-4 top-4 text-gray-400 hover:text-black text-xl p-1 cursor-pointer transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>

        {/* Brand Logo */}
        <div className="mb-10 mt-2">
          <img src="/images/logo1.jpg" alt="Swoc Logo" className="w-[85px] h-[85px] object-contain" />
        </div>

        {/* STEP 1: EMAIL INTERFACE */}
        {step === 1 && (
          <div className="w-full text-left">
            <h1 className="text-2xl font-semibold tracking-tight mb-1 text-black">Sign in</h1>
            <p className="text-gray-500 text-[14px] mb-6">Sign in or create an account</p>

            <form onSubmit={handleEmailSubmit} className="space-y-5">
              <button type="button" onClick={() => setStep(2)} className="w-full bg-[#5a31f4] hover:bg-[#4924d6] text-white font-medium py-3 px-4 rounded-xl text-[15px] flex items-center justify-center cursor-pointer transition-colors">
                Continue with shop
              </button>

              <div className="relative flex py-1 items-center text-gray-300 text-xs">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-3 text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 focus:border-black focus:outline-none rounded-xl py-3 pl-4 pr-12 text-[15px] text-black transition-colors"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-600 hover:text-black transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                  </svg>
                </button>
                <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#e8e8e8] text-gray-700 text-[10px] font-medium px-2 py-0.5 rounded-full border border-white whitespace-nowrap shadow-xs">
                  Last used
                </span>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: OTP INTERFACE */}
        {step === 2 && (
          <div className="w-full text-left">
            <h1 className="text-2xl font-semibold tracking-tight mb-1 text-black">Enter code</h1>
            <p className="text-gray-500 text-[14px] mb-6">
              Sent to {email || "aliraza7798501@gmail.com"}{" "}
              <button type="button" onClick={() => setStep(1)} className="text-[#1a73e8] hover:underline cursor-pointer">
                Change
              </button>
            </p>

            <div className="flex justify-between gap-2.5 mb-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={data}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-full aspect-square text-center text-xl font-semibold border-2 border-gray-200 focus:border-[#1a73e8] focus:outline-none rounded-xl bg-white text-black transition-all"
                />
              ))}
            </div>
          </div>
        )}

        <div className="w-full text-center mt-8 border-t border-gray-100 pt-4">
          <Link href="/privacy-policy" className="text-xs font-medium text-[#1a73e8] hover:underline">
            Privacy policy
          </Link>
        </div>
      </div>
    </div>
  );
}