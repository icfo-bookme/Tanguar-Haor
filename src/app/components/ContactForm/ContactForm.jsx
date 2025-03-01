"use client";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import postPackageInfo from "@/utiles/postPacageInfo";

const ContactForm = ({propertyDetails}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    
    const emailData = {
      name: `${data.firstName} ${data.lastName}`, 
      email: data.email, 
      phoneNumber: data.phoneNumber, 
      message: data.additionalInfo, 
    };

    
    const apiData = {
      name: `${data.firstName} ${data.lastName}`,
      number: data.phoneNumber,
      address: data.address,
      additional_info: data.additionalInfo,
      property_name: propertyDetails[0]?.property_name
    };

    try {
      
      await emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL_JS_SERVICEID,
      process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATEID,
      emailData,
      process.env.NEXT_PUBLIC_EMAIL_JS_USERID
      );

     
      const apiResponse = await postPackageInfo(apiData);
      if (apiResponse.error) {
      toast.error("Failed to submit package info.");
      } else {
      toast.success("Package info submitted successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while processing your request.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-black">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", { required: true })}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full text-black"
            />
            {errors.firstName && <span className="text-red-500">First name is required</span>}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-black">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", { required: true })}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full text-black"
            />
            {errors.lastName && <span className="text-red-500">Last name is required</span>}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-black">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              placeholder="01xxxxxxx"
              {...register("phoneNumber", { required: true })}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full text-black"
            />
            {errors.phoneNumber && <span className="text-red-500">Phone number is required</span>}
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full text-black"
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-black">
              Address
            </label>
            <input
              type="text"
              id="address"
              {...register("address", { required: true })}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full text-black"
            />
            {errors.address && <span className="text-red-500">Address is required</span>}
          </div>

          {/* Additional Info */}
          <div>
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-black">
              Additional Info
            </label>
            <textarea
              id="additionalInfo"
              {...register("additionalInfo")}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full text-black"
            />
          </div>

          <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
