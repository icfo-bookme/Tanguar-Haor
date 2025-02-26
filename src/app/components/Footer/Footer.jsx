import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Roboto } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: ['400',], });

const Footer = () => {
    return (
        <footer className={` ${roboto.className} bg-gray-800 text-white`}>
            <div className="footer-wrapper bg-gray-900">
                <div className="container py-8 w-[85%] mx-auto">
                    <div className="footer-area">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Company Section */}
                            <div className="single-footer-caption">
                                <div className="footer-tittle mb-6">
                                    <h4 className="title text-lg font-semibold text-gray-200 mb-4">Company</h4>
                                    <ul className="listing space-y-2">
                                        <li className="single-lsit">
                                            <Link href="/about" className="text-gray-400 hover:text-blue-400 transition duration-300">About Us</Link>
                                        </li>
                                        <li className="single-lsit">
                                            <Link href="/news" className="text-gray-400 hover:text-blue-400 transition duration-300">News</Link>
                                        </li>
                                        <li className="single-lsit">
                                            <Link href="/faq" className="text-gray-400 hover:text-blue-400 transition duration-300">FAQ</Link>
                                        </li>
                                        <li className="single-lsit">
                                            <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition duration-300">Contact</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Explore Section */}
                            <div className="single-footer-caption">
                                <div className="footer-tittle mb-6">
                                    <h4 className="title text-lg font-semibold text-gray-200 mb-4">Explore</h4>
                                    <ul className="listing space-y-2">
                                        <li className="single-lsit">
                                            <Link href="/faq" className="text-gray-400 hover:text-blue-400 transition duration-300">FAQ</Link>
                                        </li>
                                        <li className="single-lsit">
                                            <Link href="/tour-list" className="text-gray-400 hover:text-blue-400 transition duration-300">Tour Listings</Link>
                                        </li>
                                        <li className="single-lsit">
                                            <Link href="/destination" className="text-gray-400 hover:text-blue-400 transition duration-300">Destinations</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Quick Links Section */}
                            <div className="single-footer-caption">
                                <div className="footer-tittle mb-6">
                                    <h4 className="title text-lg font-semibold text-gray-200 mb-4">Quick Links</h4>
                                    <ul className="listing space-y-2">
                                        <li className="single-lsit">
                                            <Link href="/" className="text-gray-400 hover:text-blue-400 transition duration-300">Home</Link>
                                        </li>
                                        <li className="single-lsit">
                                            <Link href="/about" className="text-gray-400 hover:text-blue-400 transition duration-300">About Us</Link>
                                        </li>
                                        <li className="single-lsit">
                                            <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition duration-300">Contact Us</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Contact Section */}
                            <div className="single-footer-caption">
                                <div className="footer-tittle mb-6">
                                    <h4 className="title text-lg font-semibold text-gray-200 mb-4">Contact</h4>
                                    <ul className="listing space-y-2">
                                        <li className="single-lsit">
                                            <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
                                                70/A Floor Divo Tower Melbourne, Australia
                                            </a>
                                        </li>
                                        <li className="single-lsit">
                                            <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
                                                <div className="d-flex gap-4">
                                                    <i className="ri-phone-line"></i> (00) +888 123456 789
                                                </div>
                                            </a>
                                        </li>
                                        <li className="single-lsit">
                                            <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">
                                                <div className="d-flex gap-4">
                                                    <i className="ri-mail-line"></i> example@gmail.com
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                   {/* Footer Middle Area */}
<div className="footer-middle-area text-gray-950 py-8 bg-white rounded-xl p-6 md:p-12 mt-20">
    <div className="footer-body flex flex-col md:flex-row justify-between gap-10 md:gap-20 lg:gap-40 items-center">
        <div className="footer-content space-y-4 flex-1 text-center md:text-left">
            <div className="logo">
                <Image 
                    src="/assets/images/tangular-logo.svg"
                    alt="travello" 
                    className="changeLogo mx-auto md:mx-0"
                    width={180}
                    height={100}
                />
                
            </div>
            <p className="pera text-gray-700">
                Travel is a transformative and enriching experience that allows individuals to explore new destinations, cultures, and landscapes.
            </p>
        </div>
        <div className="footer-right flex-1 text-center md:text-left">
            <h4 className="title text-lg font-semibold mb-4">Subscribe Our Newsletter</h4>
            <div className="subscribe-wrapper bg-white p-4 rounded-md shadow-md inline-block md:w-auto">
                <input
                    className="footer-search p-2 w-full md:w-64 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 md:mb-0 md:mr-4"
                    type="email"
                    name="footer"
                    placeholder="Enter Your Email"
                />
                <button className="subscribe-btn bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 w-full md:w-auto">
                    Subscribe
                </button>
            </div>
        </div>
    </div>

    {/* Footer Bottom */}
    <div className="footer-bottom py-4 mt-8">
        <ul className="listing flex flex-col md:flex-row justify-center md:justify-start gap-6 space-x-0 md:space-x-6">
            <li className="single-list">
                <Link href="/terms-condition" className="single text-gray-700 hover:text-blue-600 transition duration-300">
                    Terms of use
                </Link>
            </li>
            <li className="single-list">
                <Link href="/privacy-policy" className="single text-gray-700 hover:text-blue-600 transition duration-300">
                    Privacy and Cookies Statement
                </Link>
            </li>
            <li className="single-list">
                <Link href="/contact" className="single text-gray-700 hover:text-blue-600 transition duration-300">
                    How the site works
                </Link>
            </li>
        </ul>
    </div>
</div>

                </div>
            </div>

            {/* Footer Bottom Area */}
            <div className="footer-bottom-area py-4 bg-gray-900 text-center">
                <div className="container mx-auto">
                    <div className="d-flex justify-between gap-4 flex-wrap">
                        <p className="pera text-gray-400">
                            © <span className="current-year">2023</span> Travello. All rights reserved.
                        </p>
                        
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
