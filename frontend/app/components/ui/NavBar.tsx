import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between items-center bg-white rounded-full p-4 w-full px-10 max-w-[1200px] mx-auto">
      <Link href="/">
        <p className="text-2xl font-bold text-gradient">InternSight</p>
      </Link>
      <div className="flex flex-row gap-4 items-center">
        <Link href="/login" className="secondary-button w-fit">
          Login
        </Link>
        <Link href="/signup" className="primary-button w-fit">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;