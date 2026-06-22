"use client";

import DashboardHeading from "@/components/DashboardHeading";
import { createArtwork } from "@/lib/actions/artworks";

import { useSession } from "@/lib/auth-client";
import { uploadImage } from "@/utils/uploadImage";
import {
  Button,
  Card,
  CardHeader,
  Input,
  TextArea,
  Form,
  Label,
} from "@heroui/react";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaImage, FaPalette } from "react-icons/fa";

const AddArtworkPage = () => {

    const router = useRouter();


  const { data: session } = useSession();

  const CATEGORIES = [
    "Digital Art",
    "Painting",
    "Illustration",
    "3D Art",
    "Photography",
    "Abstract",
    "Other",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    console.log(data)
    try {
      const imageFile = data.image?.[0];

        const imageUrl = await uploadImage(imageFile);
    //     console.log(imageUrl, "imageurl");



      const payload = {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        category: data.category,
        image: imageUrl,
        artistEmail: session?.user?.email,
        artistName: session?.user?.name,
        artistId:session?.user?.id,
        status: "active"
      };

   



      const result = await createArtwork(payload);

   

      console.log(result);

      if (result.insertedId) {
        toast.success("Artwork uploaded successfully!");

        // router.push("/artworks");
        router.push("/dashboard/artist");

      } else {
        toast.error(result.message || "Failed to upload artwork");
      }

    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // shared input style (theme focus fix)
  const inputClass =
    "w-full bg-[#12121C] border border-[#27273A]/50 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#B342F2] focus:border-[#B342F2] transition";

  return (
    <div className="space-y-6 mt-6 px-2 sm:px-0">
      <DashboardHeading
        title="Add Artwork"
        description="Upload your creative masterpiece to ArtHub marketplace"
      />

      <div className="max-w-3xl mx-auto w-full">
        <Card className="bg-[#0C0C14]/60 border border-[#27273A]/40 backdrop-blur-xl shadow-2xl rounded-2xl w-full">
          <CardHeader className="border-b border-[#27273A]/40 p-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FaPalette className="text-[#B342F2]" />
              Create New Artwork
            </h3>
            <p className="text-[#8E8E9F] text-xs mt-1">
              Fill all required details before publishing your artwork
            </p>
          </CardHeader>

          <div className="p-6">
            <Form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">

              {/* TITLE */}
              <div className="w-full">
                <Label className="text-[#8E8E9F] text-sm">Title</Label>
                <Input
                  placeholder="Enter artwork title"
                  className={inputClass}
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* IMAGE */}
              <div className="w-full">
                <Label className="text-[#8E8E9F] text-sm">Artwork Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  id="image"
                  startContent={<FaImage className="text-[#8E8E9F]" />}
                  className={inputClass}
                  {...register("image", { required: "Image is required" })}
                />
                {errors.image && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* CATEGORY + PRICE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

                {/* CATEGORY */}
                <div className="w-full">
                  <Label className="text-[#8E8E9F] text-sm">Category</Label>
                  <select
                  id="category"
                    className={inputClass}
                    {...register("category", {
                      required: "Category is required",
                    })}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* PRICE */}
                <div className="w-full">
                  <Label className="text-[#8E8E9F] text-sm">Price ($)</Label>
                  <Input
                  
                    type="number"
                    placeholder="0.00"
                    className={inputClass}
                    {...register("price", {
                      required: "Price is required",
                      valueAsNumber: true,
                      min: { value: 0, message: "Price cannot be negative" },
                    })}
                  />
                  {errors.price && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="w-full">
                <Label className="text-[#8E8E9F] text-sm">Description</Label>
                <TextArea
                  placeholder="Describe your artwork..."
                  className={`${inputClass} min-h-[120px]`}
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 20,
                      message: "Minimum 20 characters required",
                    },
                  })}
                />
                {errors.description && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#7928CA] via-[#B342F2] to-[#F242C2] text-white font-bold h-11 rounded-xl shadow-lg hover:opacity-90 transition"
              >
                Publish Artwork
              </Button>

            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddArtworkPage;