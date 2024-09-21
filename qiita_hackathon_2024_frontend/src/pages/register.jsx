"use client"
 
import { RegisterForm } from "@/components/RegisterForm"
import { Zen_Maru_Gothic } from 'next/font/google'

const myfont = Zen_Maru_Gothic({
  weight: ["400"],
  subsets: ["latin"]
});

export default function Register() {

  return (
    <div className="loginForm w-full pt-12 pb-32">
      <div className="w-80 mx-auto">
        <div className={`font-bold text-xl mb-8 ${myfont.className}`}>
          ユーザ登録
        </div>
        <div>
          <RegisterForm></RegisterForm>
        </div>
      </div>
    </div>
  )
}