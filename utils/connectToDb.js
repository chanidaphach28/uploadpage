import mongoose from "mongoose";

let client = null;
let bucket = null;

const MONGOB_URI = process.env.MONGOB_URI;

async function connectToDb() {
  if (client) {
    return { client, bucket };
  }

  await mongoose.connect(MONGOB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client = mongoose.connection;
  const db = mongoose.connection; // Use mongoose.connection directly
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "images",
  });

  console.log("Connected to the Database");
  return { client, bucket };
}

export default connectToDb;