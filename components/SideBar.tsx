import Link from "next/link";

export default function SideBar() {
  return (
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <Link href={"/"}>
        <li>Home</li>
      </Link>

      <li className="text-3xl my-5 font-lato">User Panel</li>
      <li>
        <Link href={"/user/profile"} className="font-lato">
          Profile
        </Link>
      </li>
      <li>
        <Link href={"/user/mypost"} className="mt-2 font-lato">
          My Posts
        </Link>
      </li>
      <li>
        <Link href={"/user/paysubscription"} className="mt-2 font-lato">
          Pay Subscription
        </Link>
      </li>

      {/* <li onClick={signOutUser} className="cursor-pointer">
            <span>Log Out</span>
          </li> */}
    </ul>
  );
}
