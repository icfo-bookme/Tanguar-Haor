"use client";
import { useState } from "react";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        journeyDate: "",
        additionalRequirements: "",
        countryCode: "+880", // Default country code for Bangladesh
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic (e.g., sending to an API)
        console.log("Form Submitted:", formData);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
           
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4">
                    {/* First Name */}
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>

                    {/* Email Address */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>

                    {/* Phone Number (with country code) */}
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <div className="flex mt-2">
                            <select
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-l-md w-24"
                            >
                                <option value="+880">+880 (Bangladesh)</option>
                                <option value="+1">+1 (USA)</option>
                                <option value="+44">+44 (UK)</option>
                                <option value="+91">+91 (India)</option>
                                {/* Add more country options as needed */}
                            </select>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                                className="p-2 border border-gray-300 rounded-r-md w-full"
                            />
                        </div>
                    </div>

                    {/* Preferred Journey Date (datetime) */}
                    <div>
                        <label htmlFor="journeyDate" className="block text-sm font-medium text-gray-700">
                            Preferred Journey Date
                        </label>
                        <input
                            type="datetime-local"
                            id="journeyDate"
                            name="journeyDate"
                            value={formData.journeyDate}
                            onChange={handleChange}
                            required
                            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>

                    {/* Additional Requirements */}
                    <div>
                        <label htmlFor="additionalRequirements" className="block text-sm font-medium text-gray-700">
                            Additional Requirements
                        </label>
                        <textarea
                            id="additionalRequirements"
                            name="additionalRequirements"
                            value={formData.additionalRequirements}
                            onChange={handleChange}
                            rows="3"
                            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
