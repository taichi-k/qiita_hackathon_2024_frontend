import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Index() {
  return (
    <div className="w-full h-auto">
      <div className="mx-auto w-fit">
        <div className="mb-4">
          Open Lobbyで勉強を始めよう！
        </div>
        <div className="flex gap-8 items-center justify-center">
          <Link href="/login">
            <Button variant="outline">ログイン</Button>
          </Link>
          <Link href="/register">
            <Button variant="secondary">新規登録</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
