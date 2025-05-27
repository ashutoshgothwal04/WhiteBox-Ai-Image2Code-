"use client";

import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CloudUpload, Loader2Icon, WandSparkles, X } from "lucide-react";

import { supabase } from "@/configs/supabaseClient";
import { useAuthContext } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AiModelList = [
  { name: "Gemini Google", Icon: "/google.png" },
  { name: "llama By Meta", Icon: "/meta.png" },
  { name: "Deepkseek", Icon: "/deepseek.png" }, // typo is required for matching
];


const ImageUpload = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [model, setModel] = useState<string>();
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { user } = useAuthContext();

  const OnImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const OnConvertToButtonClick = async () => {
    if (!file || !model || !description) {
      toast.error("Please complete all fields before submitting.");
      return;
    }

    try {
      setLoading(true);
      const fileName = `${Date.now()}.png`;

      // Upload to Supabase
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(`Image_to_Code/${fileName}`, file);

      if (uploadError) throw uploadError;

      // Get public URL (no error returned from this method)
      const { publicUrl } = supabase.storage
        .from("images")
        .getPublicUrl(`Image_to_Code/${fileName}`).data;

      if (!publicUrl) {
        throw new Error("Failed to retrieve image URL.");
      }

      const uid = uuidv4();

      const result = await axios.post("/api/wireframe-to-code", {
        uid,
        model,
        description,
        imageUrl: publicUrl,
        email: user?.email,
      });

      toast.success("Uploaded and converted successfully!");
      router.push(`/view-code/${uid}`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Something went wrong during upload.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT PANEL: Image Upload or Preview */}
        {!previewUrl ? (
          <div className="p-7 flex flex-col items-center justify-center border border-dashed rounded-md shadow-md">
            <CloudUpload className="h-10 w-10 text-primary" />
            <h2 className="font-bold text-lg">Upload Image</h2>
            <p className="text-gray-400 mt-3">
              Click button to select wireframe Image
            </p>
            <div className="p-5 border-dashed flex mt-7 justify-center">
              <label htmlFor="imageSelect">
                <span className="p-2 bg-blue-100 font-medium text-primary rounded-md px-5 cursor-pointer">
                  Select Image
                </span>
              </label>
              <input
                type="file"
                id="imageSelect"
                className="hidden"
                onChange={OnImageSelect}
                accept="image/*"
              />
            </div>
          </div>
        ) : (
          <div className="p-5 border border-dashed relative">
            <Image
              src={previewUrl || '/path/to/placeholder-image.png'}
              alt="Image Preview"
              width={500}
              height={300}
              className="w-full h-[300px] object-contain"
              unoptimized
            />
            <X
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => {
                setPreviewUrl(null);
                setFile(null);
              }}
            />
          </div>
        )}

        {/* RIGHT PANEL: Form Section */}
        <div className="p-7 border shadow-md rounded-lg">
          <h2 className="font-bold text-lg">Select AI Model</h2>
          <Select onValueChange={setModel}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select AI Model" />
            </SelectTrigger>
            <SelectContent>
              {AiModelList.map(({ name, Icon }) => (
                <SelectItem key={name} value={name}>
                  <div className="flex items-center gap-2">
                    <Image src={Icon} alt={name} width={20} height={20} />
                    <span>{name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <h2 className="font-bold text-lg mt-7">Webpage Description</h2>
          <Textarea
            className="mt-3 h-[200px]"
            placeholder="e.g., Convert this image into JSX code..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center">
        <Button onClick={OnConvertToButtonClick} disabled={loading}>
          {loading ? (
            <Loader2Icon className="animate-spin h-4 w-4" />
          ) : (
            <>
              <WandSparkles className="mr-2 h-4 w-4" />
              Convert to Code
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
