"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function LoggedOut() {
    const pathname = usePathname();

    return (
            <nav className="">
                <ul className="flex space-x-4">    
                    <li>
                        <Link href="/Auth/Login" className={`hover:text-emerald-300 transition-colors ${pathname == "/Auth/Login" ? "text-emerald-300" : ""}`}>Login</Link>
                    </li>
                    <li>
                        <Link href="/Auth/Register" className={`hover:text-emerald-300 transition-colors ${pathname == "/Auth/Register" ? "text-emerald-300" : ""}`}>Register</Link>
                    </li>
                </ul>
            </nav>
        
    )
}

export default LoggedOut;