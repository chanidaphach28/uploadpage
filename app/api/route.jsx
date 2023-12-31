import { NextResponse } from "next/server";
import { Readable } from "stream";

import Posts from "@/utils/posts";
import connectToDb from "@/utils/connectToDb";

export const revalidate = 0;

export const POST = async (req) => {
  const { client, bucket } = await connectToDb();

  let name;
  let image;
  const formData = await req.formData();
  for (const entries of Array.from(formData.entries())) {
    const [key, value] = entries;
    if (key === "name") {
      name = value;
    }

    if (typeof value === "object") {
      image = Date.now() + value.name;
      console.log("done");
      const buffer = Buffer.from(await value.arrayBuffer());
      const stream = Readable.from(buffer);
      const uploadStream = bucket.openUploadStream(image, {});
      await stream.pipe(uploadStream);
    }
  }

  const newItem = new Posts({
    name,
    imageUrl: image,
  });
  await newItem.save();

  return NextResponse.json({ msg: "ok" });
};

export const GET = async () => {
  const { client, bucket } = await connectToDb();

  const posts = await Posts.find({});
  return NextResponse.json(posts);
};
