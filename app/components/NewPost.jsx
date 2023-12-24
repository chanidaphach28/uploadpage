
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const NewPost = () => {
  const { register, handleSubmit, reset } = useForm();
  const [previewPdf, setPreviewPdf] = useState(null);
  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type === "application/pdf") {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewPdf(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviewPdf(null);
    }
  };

  const onSubmit = async (data) => {
    let formData = new FormData();

    formData.append("name", data.name);
    for (let pdf of data.pdfUrl) {
      formData.append(pdf.name, pdf);
    }

    await fetch("/api", {
      method: "POST",
      body: formData,
    });

    // Clear form data and reset input fields
    setPreviewPdf(null);
    reset();
    router.refresh();
  };

  return (
    <main className="flex flex-col items-center justify-between">
      <div className="max-w-md mx-auto">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="input1"
            >
              Text Input 1
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="input1"
              type="text"
              placeholder="Enter text input 1"
              {...register("name")}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fileInput"
            >
              PDF Input
            </label>
            <input
              type="file"
              accept="application/pdf"
              className="file-input file-input-bordered w-full max-w-xs"
              id="fileInput"
              {...register("pdfUrl")}
              onChange={handleFileChange}
            />
            {previewPdf && (
              <Image
                src={previewPdf}
                type="application/pdf"
                width="300"
                height="500"
              />
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default NewPost;
