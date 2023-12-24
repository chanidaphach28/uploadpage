// components/getPosts.jsx
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const deleteImag = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/${id}`,
      //   { cache: "no-cache" },
      {
        method: "DELETE",
      }
    );
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};

const GetPosts = ({ data }) => {
  const router = useRouter();
  return (
    <div>
      <div className="grid  container mx-auto w-11/12 grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {data?.map((item, index) => (
          <div
            key={index}
            className="border shadow-lg rounded-lg hover:scale-105 duration-300"
          >
            <Image
              width={200}
              height={200}
              src={`http://localhost:3000/api/${item.imageUrl}`}
              alt={item.name}
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <div className="flex justify-between px-2 py-4">
              <p className="font-bold">{item.name}</p>
              <button
                onClick={() => {
                  deleteImag(item._id);
                  router.refresh();
                }}
              >
                <span className="bg-red-500 text-white p-1 rounded-md">
                  delete
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetPosts;