"use client"
 
import { RegisterForm } from "@/components/RegisterForm"

export default function Register() {
 
  return (
    <div className="loginForm flex items-center justify-center">
      <div className="font-bold display: block;">ユーザ登録</div>
      <div className="w-96 display: block;">
        <RegisterForm className={""}></RegisterForm>
      </div>
    </div>
  )
}