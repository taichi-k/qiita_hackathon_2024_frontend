/* eslint-disable */

"use client"

import { useForm } from "react-hook-form"
import { useState, useContext, useEffect } from "react"
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

import { OverlaySpinner } from '@/components/OverlaySpinner';

import { Zen_Maru_Gothic } from 'next/font/google'

const myfont = Zen_Maru_Gothic({
  weight: ["400"],
  subsets: ["latin"]
});


export function SettingsForm() {
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useContext(UserContext); // userIdをコンテキストから取得
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

  // ページ描画時にAPIからユーザーデータを取得して初期値を設定
  useEffect(() => {
    setIsLoading(true)
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://miyablo.sakura.ne.jp/kosugiiz/user/${userId}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.status !== '200') {
          throw new Error(response.data.message);
        }

        const userData = response.data.data;
        console.log("ユーザー情報取得成功:", userData);
        // APIで取得したデータをフォームの初期値として設定
        form.reset({
          email: userData.email,
          nickname: userData.nickname,
          password: "", // パスワードはセキュリティのために空にしておく
          interests: userData.interested_in,
          twitter: userData.twitter_screenname,
        });
        // アイコンも更新
        setIconBase64(userData.icon);
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.error("ユーザー情報取得エラー:", error);
      }
    };

    if (userId) {
      fetchUserData(); // userId が存在する場合にのみデータを取得
    }
  }, [userId, form]);

  async function onSubmit(data) {
    setIsLoading(true)

    try {
      const formData = {
        user: {
          email: data.email,
          password: data.password,
          icon: iconBase64 || '',
          nickname: data.nickname,
          interested_in: data.interests,
          twitter_screenname: data.twitter,
        }
      }

      // POSTリクエストでデータを送信
      const response = await axios.patch(`https://miyablo.sakura.ne.jp/kosugiiz/user/${userId}`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(response)
      if (response.data.status !== '200') {
        throw new Error(response.data.message)
      } else {
        console.log("更新成功:")
        setIsLoading(false)
        router.replace('/lobby');
      }
    } catch (error) {
      setIsLoading(false)
      console.error("登録エラー:", error)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-6 ${myfont.className}`}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input className={"border border-yellow-900 shadow"} placeholder="****@****" {...field} />
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
                  <Input className={"border border-yellow-900 shadow"} type="password" placeholder="****" {...field} />
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
              <Input  className={"border border-yellow-900 shadow text-xs leading-normal"} type="file" placeholder="アイコンを選択" accept='image/*' onChange={handleIconChange}  />
            </FormControl>
            <FormMessage />
          </FormItem>
          {
            iconBase64&& <img 
              src={iconBase64} 
              alt='input_icon' 
              className="w-48 h-48 object-cover"
            />
          }

          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ニックネーム</FormLabel>
                <FormControl>
                  <Input className={"border border-yellow-900 shadow"} placeholder="ニックネーム" {...field} />
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
                <FormLabel>自習室で勉強してる事</FormLabel>
                <FormControl>
                  <Input className={"border border-yellow-900 shadow"} placeholder="例: 数学,IT,音楽" {...field} />
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
                  <Input  className={"border border-yellow-900 shadow"} placeholder="XのID" {...field} />
                </FormControl>
                <FormDescription>
                  登録したい人だけ
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="" type="submit">更新</Button>
        </form>
      </Form>
      {isLoading && <OverlaySpinner />}
    </>
  )
}
