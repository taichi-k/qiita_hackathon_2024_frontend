/* eslint-disable */

"use client"

import { useForm } from "react-hook-form"
import { useState, useContext } from "react"
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
import UserContext from '../../context/user_context';

export function RegisterForm() {
  const { login } = useContext(UserContext);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      interests: "",
      twitter: "",
      nickname: "",
    },
  })

  const [iconBase64, setIconBase64] = useState(null)

  // 画像ファイルをBase64に変換
  const handleIconChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setIconBase64(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  async function onSubmit(data) {
    try {
      const formData = {
        user: {
          email: data.email,
          password: data.password,
          interested_in: data.interests,
          twitter_screenname: data.twitter,
          nickname: data.nickname,
          icon: iconBase64 || '',
        }
      }

      // POSTリクエストでデータを送信
      const response = await axios.post('https://miyablo.sakura.ne.jp/kosugiiz/signup', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(response)
      if (response.data.status !== '200') {
        throw new Error(response.data.message)
      } else {
        const login_user_id = response.data.data.user_id
        console.log("登録成功:", login_user_id)
        login(login_user_id)
        router.replace('/lobby');
      }
    } catch (error) {
      console.error("登録エラー:", error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input placeholder="メールアドレス" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード</FormLabel>
              <FormControl>
                <Input type="password" placeholder="パスワード" {...field} />
              </FormControl>
              <FormDescription>
                8文字以上
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>プロフィールアイコン</FormLabel>
          <FormControl>
            <Input type="file" accept='image/*' onChange={handleIconChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <img 
          src={iconBase64} 
          alt='input_icon' 
          className="w-48 h-48 object-cover"
        />

        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ニックネーム</FormLabel>
              <FormControl>
                <Input placeholder="ニックネーム" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>勉強中の内容</FormLabel>
              <FormControl>
                <Input placeholder="興味" {...field} />
              </FormControl>
              <FormDescription>
                カンマ区切り
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twitter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>XのID</FormLabel>
              <FormControl>
                <Input placeholder="XのID" {...field} />
              </FormControl>
              <FormDescription>
                登録したい人だけ
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">新規登録</Button>
      </form>
    </Form>
  )
}
