import connectToDb from "@/utils/connectToDb";
import { NextResponse } from "next/server";
import Posts from "@/utils/posts";

export const revalidate = 0;

export const GET = async (req, { params }) => {
  const { client, bucket } = await connectToDb();

  const { data } = params;

  const files = await bucket
    .find({
      filename: data,
    })
    .toArray();

  // the result is an array and I take the first
  // element that I found
  const file = files[0];

  // reading file using openDownloadStreamByName
  const stream = bucket.openDownloadStreamByName(file.filename);

  return new NextResponse(stream, {
    Headers: { "Content-Type": file.contentType },
  });
};

export const DELETE = async (req, { params }) => {
  const { client, bucket } = await connectToDb();

  try {
    const { data } = params;
    const deletedPost = await Posts.findByIdAndRemove(data);

    const files = await bucket
      .find({
        filename: deletedPost.imageUrl,
      })
      .toArray();

    // the result is an array and I take the first
    // element that I found
    const file = files[0];
    bucket.delete(file._id);
    return NextResponse.json({ msg: "ok" });
  } catch (e) {
    console.log(e);
  }
};
