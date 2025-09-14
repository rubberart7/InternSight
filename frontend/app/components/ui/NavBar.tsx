import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="navbar">
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