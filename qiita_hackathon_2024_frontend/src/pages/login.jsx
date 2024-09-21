"use client"
 
import { LoginForm } from "@/components/LoginForm"
// import Header from "@/components/tailblocks/Header"
import { Zen_Maru_Gothic } from 'next/font/google'

const myfont = Zen_Maru_Gothic({
  weight: ["400"],
  subsets: ["latin"]
});

export default function Login() {
 
  return (
    <>
      <div className="loginForm w-full pt-12 pb-32">
        <div className="w-80 mx-auto">
          <div className={`font-bold text-xl mb-8 ${myfont.className}`}>
            ログイン
          </div>
            <LoginForm className={""}></LoginForm>
        </div>
      </div>
    </>
  )
}