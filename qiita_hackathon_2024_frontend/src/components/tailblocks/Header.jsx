/* eslint-disable */

import Logo from "@/components/Logo"

export default function Header() {
    return (
        <header class="text-gray-600 body-font">
            <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a href="/lobby" class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <Logo></Logo>
                <span class="ml-3 text-xl" id="generated-id-1726902635829-97n7j7e2p">Open Lobby</span>
                </a>
                <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
                <a href="/lobby" class="mr-5 hover:text-gray-900" id="generated-id-1726902635829-adsfs">ロビー</a>
                <a href="/settings" class="mr-5 hover:text-gray-900" id="generated-id-1726902635829-o0pzxlbba">設定</a>
                <a href="/" class="mr-5 hover:text-gray-900" id="generated-id-1726902635829-9reuu9cas">ログアウト</a>
                </nav>
                {/* <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" id="generated-id-1726902635829-emxkyawu6">ログアウト</button> */}
            </div>
        </header>
    )
}