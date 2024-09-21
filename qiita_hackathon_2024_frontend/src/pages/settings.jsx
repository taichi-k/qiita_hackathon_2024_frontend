"use client"
 
import { SettingsForm } from "@/components/SettingsForm"
import Header from "@/components/tailblocks/Header"
import { Zen_Maru_Gothic } from 'next/font/google'

const myfont = Zen_Maru_Gothic({
  weight: ["400"],
  subsets: ["latin"]
});

export default function Settings() {
 
  return (
    <>
      <Header></Header>
      <div className="loginForm w-full pt-8 pb-32">
      <div className="w-80 mx-auto">
        <div className={`font-bold text-xl mb-8 ${myfont.className}`}>
          プロフィール編集
        </div>
        <SettingsForm className={""}></SettingsForm>
      </div>
    </div>
    </>
  )
}