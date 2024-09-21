/* eslint-disable */

import Logo from "@/components/Logo"
import Link from 'next/link'
import { useRouter } from 'next/router';
import UserContext from '../../../context/user_context';
import { useContext } from "react"

import { Zen_Kaku_Gothic_New, Rampart_One, Zen_Maru_Gothic, Shippori_Mincho } from 'next/font/google'
import ServiceName from "../ServiceName";

const myfont = Zen_Maru_Gothic({
  weight: ["500"],
  subsets: ["latin"]
});

export default function Header() {
    const router = useRouter();
    const { logout } = useContext(UserContext);
    const handleLogoutClick = () => {
        logout()
        console.log('user successfully logged out!');
        router.replace('/');
    }
    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a href="/lobby" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <Logo></Logo>
                    <ServiceName></ServiceName>
                </a>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <Link href="/lobby" className={`mr-5 hover:text-gray-900 ${myfont.className}`} id="generated-id-1726902635829-adsfs">
                        ロビー
                    </Link>
                    <Link href="/settings" className={`mr-5 hover:text-gray-900 ${myfont.className}`} id="generated-id-1726902635829-o0pzxlbba">
                        設定
                    </Link>
                    <a href="/" className={`mr-5 hover:text-gray-900 ${myfont.className}`} id="generated-id-1726902635829-9reuu9cas"></a>
                    <span
                        onClick={() => handleLogoutClick()}
                        className={`mr-5 hover:text-gray-900 ${myfont.className}`}
                        id="generated-id-1726902635829-9reuu9cas"
                    >
                        ログアウト
                    </span>
                </nav>
                {/* <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" id="generated-id-1726902635829-emxkyawu6">ログアウト</button> */}
            </div>
        </header>
    )
}