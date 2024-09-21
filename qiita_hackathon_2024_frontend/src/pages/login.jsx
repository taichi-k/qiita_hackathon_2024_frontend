"use client"
 
import { LoginForm } from "@/components/LoginForm"
// import Header from "@/components/tailblocks/Header"

export default function Login() {
 
  return (
    <>
      <div className="loginForm w-full pt-12 pb-32">
        <div className="w-80 mx-auto">
          <div className="font-bold mb-8">
            ログイン
          </div>
            <LoginForm className={""}></LoginForm>
        </div>
      </div>
    </>
  )
}