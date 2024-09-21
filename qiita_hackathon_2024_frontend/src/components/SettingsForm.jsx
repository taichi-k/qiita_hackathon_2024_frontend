
"use client"
 
import { useForm } from "react-hook-form"
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
import { useRouter } from "next/router"
 
export function SettingsForm() {
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      // TODO: ここで既存の値を取得する
      email: "",
      password: "",
    },
  })
 
  function onSubmit(data) {
    // submit時
    console.log("onSubmit")
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
              <FormLabel>興味があること</FormLabel>
              <FormControl>
                <Input placeholder="ピアノ,ギター" {...field} />
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
              <FormLabel>SNSアカウント（X）</FormLabel>
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
        <Button type="submit">更新</Button>
      </form>
    </Form>
  )
}