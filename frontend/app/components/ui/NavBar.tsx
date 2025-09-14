import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="flex flex-row justify-between items-center bg-white rounded-full p-4 w-full px-10 max-w-[1200px] mx-auto">
            <Link href="/">
                <p className="text-2xl font-bold text-gradient">InternSight</p>
            </Link>
            <Link href="/enter-resume" className="primary-button w-fit">
                Enter Resume
            </Link>
        </nav>
    )
}
export default Navbar