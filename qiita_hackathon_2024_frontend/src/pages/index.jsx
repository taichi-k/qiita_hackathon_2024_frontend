import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Index() {
  return (
    <div>
      Open Lobby
      <Link href="/login">
        <Button variant="outline">ログイン</Button>
      </Link>
      <Link href="/register">
        <Button variant="secondary">新規登録</Button>
      </Link>
    </div>
  );
}
