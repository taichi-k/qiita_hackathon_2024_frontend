/* eslint-disable */

"use client"
 
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
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
 
export function RegisterForm() {
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  function onSubmit(data) {
    // submit時
    console.log(`onSubmit: ${data}`)
    router.replace("/lobby")
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
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>プロフィールアイコン</FormLabel>
              <FormControl>
                <Input type="file" placeholder="アイコンを選択" {...field} />
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
              <FormLabel>パスワード</FormLabel>
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
              <FormLabel>パスワード</FormLabel>
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