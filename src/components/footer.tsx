'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        // Naye layout ke mutabiq w-screen aur negative margins hata kar w-full kar diya hai
        <div className="bg-[#1c1c1c] text-[#a3a3a3] text-sm font-light pt-8 pb-8 px-4 md:px-12 w-full">
            <div className="max-w-[1400px] mx-auto">

                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8">

                    {/* Column 1: Contact Us */}
                    <div className="flex flex-col text-white/70 gap-1.5 lg:col-span-1">
                        <h3 className="text-white font-bold text-base tracking-wider uppercase mb-2">Contact Us</h3>

                        <a
                            href="https://maps.google.com/?q=Chak+no+5/11.l,+Gakhranwala,+Near+Harappa+Toll+Plaza,+Chichawatni,+57200"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-start leading-relaxed text-neutral-400 hover:text-white hover:underline underline-offset-4 transition-all duration-200"
                        >
                            <span>Chak no 5/11.l Gakhranwala</span>
                            <span>Near Harappa Toll Plaza</span>
                            <span>Chichawatni, 57200</span>
                        </a>

                        <a href="mailto:Customercare@Swocclothing.Com" className="hover:text-white hover:underline underline-offset-4 transition-all duration-200 mt-2 w-fit">
                            Customercare@Swocclothing.Com
                        </a>

                        <a
                            href="https://wa.me/923151640537"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white hover:underline underline-offset-4 transition-all duration-200 leading-relaxed mt-1 block w-fit"
                        >
                            +92 315 164 0537 (WhatsApp Chat <br /> Only)
                        </a>
                    </div>

                    {/* Column 2: Customer Care */}
                    <div className="flex text-white/70 flex-col gap-1.5 lg:col-span-1">
                        <h3 className="text-white font-bold text-base tracking-wider uppercase mb-2">Customer Care</h3>
                        <Link href="/returnAndExchange" className="hover:text-white hover:underline underline-offset-4 transition-all duration-200 w-fit">Return And Exchange</Link>
                        <Link href="/faqs" className="hover:text-white hover:underline underline-offset-4 transition-all duration-200 w-fit">FAQs</Link>
                        <Link href="/contactUs" className="hover:text-white hover:underline underline-offset-4 transition-all duration-200 w-fit">Contact Us</Link>
                    </div>

                    {/* Column 3: Information (Separate Pages Link) */}
                    <div className="flex text-white/70 flex-col gap-1.5 lg:col-span-1">
                        <h3 className="text-white font-bold text-base tracking-wider uppercase mb-2">Information</h3>
                        <Link href="/aboutUs" className="hover:text-white hover:underline underline-offset-4 transition-all duration-200 w-fit">About Us</Link>
                        <Link href="/privacy-policy" className="hover:text-white hover:underline underline-offset-4 transition-all duration-200 w-fit">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="hover:text-white hover:underline underline-offset-4 transition-all duration-200 w-fit">Terms Of Service</Link>
                        <Link href="/resolution-policy" className="hover:text-white hover:underline underline-offset-4 transition-all duration-200 w-fit">Resolution Policy</Link>
                        <Link href="/payments" className="hover:text-white hover:underline underline-offset-4 transition-all duration-200 w-fit">Payments</Link>
                    </div>

                    {/* Column 4: Newsletter Sign Up */}
                    <div className="flex flex-col gap-1.5 items-start lg:col-span-2">
                        <h3 className="text-white font-bold text-base tracking-wider uppercase mb-2">Newsletter Sign Up</h3>
                        <p className="text-xs text-white/70 whitespace-nowrap">
                            Sign up for exclusive updates, new arrivals & insider only discounts
                        </p>

                        <div className="flex w-full max-w-xl mt-2 gap-2">
                            <input
                                type="email"
                                placeholder="enter your email address"
                                className="w-full max-w-2xs bg-transparent border border-white focus:outline-none px-6 py-6 text-xs placeholder-white/70"
                            />
                            <button className="bg-white w-[150px] text-black font-bold text-xs cursor-pointer uppercase tracking-widest px-6 py-6 shrink-0 transition-all duration-300 hover:bg-black hover:text-white hover:border-white border-transparent">
                                Submit
                            </button>
                        </div>

                        {/* Social Icons with Double Ring Hover Effect */}
                        <div className="flex items-center gap-3 mt-4">
                            <a
                                href="https://www.facebook.com/share/197ddcU2tE/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black transition-all duration-300 focus:outline-none hover:ring-2 hover:ring-white hover:ring-offset-4 hover:ring-offset-[#1c1c1c] hover:bg-white"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.8 0-5 1.57-5 4v2z" />
                                </svg>
                            </a>

                            <a
                                href="https://www.instagram.com/cute.minimospk?igsh=a3lucWNrdm9pZzdq"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black transition-all duration-300 focus:outline-none hover:ring-2 hover:ring-white hover:ring-offset-4 hover:ring-offset-[#1c1c1c] hover:bg-white"
                            >
                                <svg className="w-4 h-4 stroke-current stroke-[2] fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>

                            <a
                                href="https://www.tiktok.com/@cute.minimos?_r=1&_t=ZS-975DWcnhB1p"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black transition-all duration-300 focus:outline-none hover:ring-2 hover:ring-white hover:ring-offset-4 hover:ring-offset-[#1c1c1c] hover:bg-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
                    <p className="text-xs text-white">
                        Copyright © Swocclothing <span className="text-gray-600 mx-1">|</span> All rights reserved.
                    </p>

                    <div className="flex items-center gap-2">
                        <div className="bg-white px-2 py-1 rounded shadow-sm flex items-center justify-center h-7 w-11">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 object-contain" />
                        </div>
                        <div className="bg-white px-2 py-1 rounded shadow-sm flex items-center justify-center h-7 w-11">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 object-contain" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Footer;