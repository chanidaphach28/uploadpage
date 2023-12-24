import GetPosts from "./components/GetPosts";
import NewPost from "./components/newPost";

const getData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api", { cache: "no-store" });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};

export default async function Home() {
  const data = await getData();

  return (
    <div className="">
      <div className=" my-20">
        <NewPost />
        <GetPosts data={data} />
      </div>
    </div>
  );
}