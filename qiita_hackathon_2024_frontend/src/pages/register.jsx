"use client"
 
import { RegisterForm } from "@/components/RegisterForm"

export default function Register() {
 
  return (
    <div className="loginForm w-full pt-12 pb-32">
      <div className="w-80 mx-auto">
        <div className="font-bold mb-8">
          ユーザ登録
        </div>
        <div>
          <RegisterForm></RegisterForm>
        </div>
      </div>
    </div>
  )
}