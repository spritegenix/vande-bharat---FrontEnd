import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, TextareaAutoGrowing } from "../Input";
import Button from "../Button";
import { useRaiseQuery } from "@/app/_queryCall/csr";

// Define the schema using zod
const formSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters long")
    .max(50, "Full name cannot exceed 50 characters")
    .nonempty("Full name is required"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  mobileNo: z
    .string()
    .nonempty("Mobile number is required")
    .refine((val) => /^\+\d{1,3}\d{10,15}$/.test(val), {
      message: "Enter a valid phone number with a country code (e.g., +91 1234567890).",
    }),
  subject: z.string().nonempty("Subject is required"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .max(500, "Message cannot exceed 500 characters")
    .nonempty("Message is required"),
});

// Define the form input types
type FormData = z.infer<typeof formSchema>;

const subjectOptions = [
  "Finding a suitable Expert",
  "Raise a Complaint against a firm/ Expert",
  "Raise a Complaint against a user",
  "General query",
  "Other issues",
] as const;

const HelpForm: React.FC = () => {
  const { raiseQuery, loading, error, data } = useRaiseQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // console.log("Form Data:", data);
    try {
      await raiseQuery({
        name: data.fullName,
        email: data.email,
        phone: data.mobileNo,
        subject: data.subject,
        message: data.message,
      });
    } catch (err) {
      console.error("Failed to raise query:", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold text-bg1">Talk to Our Experts</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name Input */}
        <div>
          <Input type="text" {...register("fullName")} placeholder=" " label="Full Name" />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <Input type="email" {...register("email")} placeholder=" " label="Email Address" />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        {/* Mobile No Input */}
        <div>
          <Input type="text" {...register("mobileNo")} placeholder=" " label="Mobile Number" />
          {errors.mobileNo && (
            <p className="mt-1 text-sm text-red-500">{errors.mobileNo.message}</p>
          )}
        </div>

        {/* Subject Select */}
        <div>
          <select
            className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-zinc-500 outline-none duration-200 focus:outline-bg1"
            {...register("subject")}
          >
            <option value="">Select a subject</option>
            {subjectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
        </div>

        {/* Message TextArea */}
        <div>
          <TextareaAutoGrowing
            id="message"
            {...register("message")}
            rows={4}
            placeholder=" "
            label="Message"
          />
          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
        {error && <p className="mt-1 text-sm text-red-500">{error?.message}</p>}
        {data && <p className="mt-1 text-sm text-green-500">{data?.message}</p>}
      </form>
    </div>
  );
};

export default HelpForm;
