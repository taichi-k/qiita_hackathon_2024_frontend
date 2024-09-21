
"use client"
 
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/router"
import axios from "axios"
import { useContext } from "react"
import UserContext from '../../context/user_context';
 
export function LoginForm() {
  const router = useRouter()
  const { login } = useContext(UserContext);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  async function onSubmit(data) {
    try {
      const formData = {
        user: {
          email: data.email,
          password: data.password,
        }
      }

      // POSTリクエストでデータを送信
      const response = await axios.post('https://miyablo.sakura.ne.jp/kosugiiz/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(response)
      if (response.data.status !== '200') {
        throw new Error(response.data.message)
      } else {
        const login_user_id = response.data.data.user_id
        console.log("ログイン成功:", login_user_id)
        login(login_user_id)
        router.replace('/lobby');
      }
    } catch (error) {
      console.error("ログインエラー:", error)
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
                <Input placeholder="****@****" {...field} />
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
                <Input type="password" placeholder="****" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">ログイン</Button>
      </form>
    </Form>
  )
}