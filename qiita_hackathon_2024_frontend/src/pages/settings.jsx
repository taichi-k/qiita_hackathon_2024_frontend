"use client"
 
import { SettingsForm } from "@/components/SettingsForm"
import Header from "@/components/tailblocks/Header"

export default function Settings() {
 
  return (
    <>
      <Header></Header>
      <div className="loginForm w-full pt-8 pb-32">
      <div className="w-80 mx-auto">
        <div className="font-bold mb-8">
          プロフィール編集
        </div>
        <SettingsForm className={""}></SettingsForm>
      </div>
    </div>
    </>
  )
}