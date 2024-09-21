"use client"
 
import { RegisterForm } from "@/components/RegisterForm"

export default function Register() {
 
  return (
    <div className="loginForm flex items-center justify-center">
      <div className="font-bold display: block;">ログイン</div>
      <div className="w-96 display: block;">
        <RegisterForm className={""}></RegisterForm>
      </div>
    </div>
  )
}