"use client"
 
import { LoginForm } from "@/components/LoginForm"

export default function Login() {
 
  return (
    <div className="loginForm px-auto w-full py-auto h-full">
      <div className="font-bold">ログイン</div>
      <div className="w-96">
        <LoginForm className={""}></LoginForm>
      </div>
    </div>
  )
}