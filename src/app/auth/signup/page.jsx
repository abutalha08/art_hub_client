"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  Card,
  CardHeader,
  CardContent as CardBody,
  Input,
  Button,
  Label,
  Form,
  Select,
  SelectTrigger,
  SelectValue,
  SelectIndicator,
  SelectPopover,
  ListBox,
  ListBoxItem,
} from "@heroui/react";

import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import { IoColorPaletteSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { uploadImage } from "@/utils/uploadImage";


export default function RegisterPage() {
    const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

//   console.log(errors);


   const onSubmit = async (data) => {

    console.log(data);


  try {
    const imageFile = data.image[0];
    const imageUrl = await uploadImage(imageFile);
    console.log(imageUrl);

    const { data: signUpData, error: signUpError } =
      await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        image: imageUrl,
        role: data.role,
      });

      console.log(signUpData, signUpError);

    if (signUpError) {
      toast.error(signUpError.message || "Registration failed");
      return;
    }

    toast.success("Registration successful");
    router.push("/");
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};
    console.log(errors);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen bg-[#0B0B12] grid grid-cols-1 lg:grid-cols-2 font-sans selection:bg-[#B342F2]/20"
    >
      {/* LEFT SIDE */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="hidden lg:flex relative flex-col justify-end p-14 overflow-hidden border-r border-[#27273A]/30"
      >
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1400&auto=format&fit=crop')`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-[#0B0B12]/50 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 max-w-md">
          <p className="text-3xl md:text-4xl font-serif italic text-white leading-relaxed tracking-wide">
            “Every artist was first an amateur.”
          </p>

          <p className="text-sm text-[#8E8E9F] mt-4">— Ralph Waldo Emerson</p>
        </div>
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="flex items-center justify-center p-6 sm:p-10 md:p-14"
      >
        {/* CARD */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="w-full max-w-xl border border-[#27273A]/40 bg-[#12121C]/85 backdrop-blur-2xl shadow-[0_30px_120px_rgba(0,0,0,0.75)] rounded-2xl p-6">
            {/* HEADER */}
            <CardHeader className="flex flex-col gap-5 items-start pb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7928CA] to-[#B342F2] flex items-center justify-center shadow-lg shadow-[#7928CA]/25">
                  <IoColorPaletteSharp className="text-white text-xl" />
                </div>

                <span className="text-2xl font-bold tracking-wide bg-gradient-to-r from-white via-[#E032C4] to-[#B342F2] bg-clip-text text-transparent">
                  ArtHub
                </span>
              </div>

              <h1 className="text-4xl font-semibold text-white tracking-tight leading-snug">
                Create your account
              </h1>

              <p className="text-[#8E8E9F] text-sm leading-relaxed max-w-md">
                Join thousands of artists and collectors on ArtHub and start
                your creative journey today.
              </p>
            </CardHeader>

            {/* BODY */}
            <CardBody className="gap-4">
              <Form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 w-full"
              >
                {/* NAME */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1.5"
                >
                  <Label className="text-[#8E8E9F] text-sm">Full Name</Label>
                  <Input
                    {...register("name", { required: "Name is Required" })}
                    id="name"
                    placeholder="John Doe"
                    startContent={<FaUser className="text-[#52526B]" />}
                    className="w-full bg-[#161622]/60 border border-[#27273A]/60 hover:border-[#B342F2]/40 focus-within:!border-[#B342F2] focus:outline-none focus:ring-2 focus:ring-[#B342F2]/40 rounded-xl"
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </motion.div>

                {/* EMAIL */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1.5"
                >
                  <Label className="text-[#8E8E9F] text-sm">
                    Email Address
                  </Label>
                  <Input
                    {...register("email", { required: "Email is Required" })}
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    startContent={<FaEnvelope className="text-[#52526B]" />}
                    className="w-full bg-[#161622]/60 border border-[#27273A]/60 hover:border-[#B342F2]/40 focus-within:!border-[#B342F2] focus:outline-none focus:ring-2 focus:ring-[#B342F2]/40 rounded-xl"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </motion.div>

                {/* IMAGE */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1.5"
                >
                  <Label className="text-[#8E8E9F] text-sm">
                    Profile Image URL
                  </Label>
                  <Input
                    {...register("image", { required: "image is Required" })}
                    type="file"
                    accept="image/*"
                  
                    id="image"
                    placeholder="https://example.com/avatar.jpg"
                    startContent={<FaImage className="text-[#52526B]" />}
                    className="w-full bg-[#161622]/60 border border-[#27273A]/60 hover:border-[#B342F2]/40 focus:outline-none focus:ring-2 focus:ring-[#B342F2]/40 rounded-xl"
                  />
                  {errors.image && (
                    <p className="text-red-500">{errors.image.message}</p>
                  )}
                </motion.div>

                {/* PASSWORD */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1.5"
                >
                  <Label className="text-[#8E8E9F] text-sm">Password</Label>
                  <Input
                    {...register("password", {
                      required: "Password is required",
                      
                    })}
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    startContent={<FaLock className="text-[#52526B]" />}
                    className="w-full bg-[#161622]/60 border border-[#27273A]/60 hover:border-[#B342F2]/40 focus:outline-none focus:ring-2 focus:ring-[#B342F2]/40 rounded-xl"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </motion.div>

                {/* ROLE */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1.5"
                >
                  <div className="flex flex-col gap-2 w-full">
                    <Label
                      htmlFor="role"
                      className="text-sm font-semibold text-[#8E8E9F]"
                    >
                      Select Role
                    </Label>

                    <select
                      id="role"
                      {...register("role", { required: "Role is required" })}
                      className="w-full bg-[#161622]/60 border border-[#27273A]/60 hover:border-[#B342F2]/40 focus:border-[#B342F2] focus:outline-none focus:ring-2 focus:ring-[#B342F2]/40 text-white rounded-xl p-3 transition"
                    >
                      <option
                        value=""
                        
                        className="bg-[#12121C] text-[#8E8E9F]"
                      >
                        Select your role
                      </option>

                      <option value="buyer" className="bg-[#12121C] text-white">
                        Buyer (Browse & Purchase Art)
                      </option>

                      <option
                        value="artist"
                        className="bg-[#12121C] text-white"
                      >
                        Artist (Upload & Sell your work)
                      </option>
                    </select>

                    {errors.role && (
                      <p className="text-red-500 text-sm">
                        {errors.role.message}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full h-12 font-semibold text-white bg-gradient-to-r from-[#7928CA] via-[#B342F2] to-[#F242C2] shadow-lg shadow-[#B342F2]/20 rounded-xl hover:shadow-[#B342F2]/30 transition"
                >
                  Create Account
                </motion.button>
              </Form>

              {/* DIVIDER */}
              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-[#27273A]/40" />
                <span className="mx-4 text-xs text-[#52526B] uppercase">
                  Or Continue With
                </span>
                <div className="flex-grow border-t border-[#27273A]/40" />
              </div>

              {/* GOOGLE */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-[#27273A]/60 hover:bg-[#161622]/50 text-white rounded-xl h-11 transition"
              >
                <FcGoogle className="text-xl" />
                <span>Continue with Google</span>
              </motion.button>

              {/* FOOTER */}
              <p className="text-center text-sm text-[#8E8E9F] mt-6">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#B342F2] hover:text-[#F242C2] font-semibold transition"
                >
                  Log In
                </Link>
              </p>
            </CardBody>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
