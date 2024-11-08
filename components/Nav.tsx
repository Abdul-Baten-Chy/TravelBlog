import Image from "next/image";
import Link from "next/link";
import home from "../public/icons/home.svg";
import notification from "../public/icons/notification.svg";
import logo from "../public/logo.png";
import { Avater } from "./Image";
import { Logout } from "./auth/Logout";

const Nav = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Link href="/">
          <Image
            width={100}
            height={100}
            alt="logo"
            className="max-w-[80px] rounded-xl lg:max-w-[100px]"
            src={logo}
          />
        </Link>

        <div className="flex items-center space-x-4">
          <Link href="/" className="btn-primary">
            <Image
              width={100}
              height={100}
              src={home}
              className="max-w-[30px]  lg:max-w-[50px]"
              alt="Home"
            />
            Home
          </Link>
          <button className="icon-btn">
            <Image
              width={100}
              height={100}
              src={notification}
              alt="Notification"
              className="max-w-[30px]  lg:max-w-[50px]"
            />
          </button>
          <Logout />

          <button className="flex-center !ml-8 gap-3">
            <Avater isName={true} isLogin={true}></Avater>
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
