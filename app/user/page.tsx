export default async function userPage() {
  let posts;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
      next: { tags: ["posts"] },
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    posts = await res.json();
    console.log(posts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  return (
    <div>
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col mt-8 md:mt-10 ml-6">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Click
        </label>
      </div>
    </div>
  );
}
