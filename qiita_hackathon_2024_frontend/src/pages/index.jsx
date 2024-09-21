import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Link from 'next/link'

export default function Index() {
  return (
    <div>
      Open Lobby
      <Link href="/login">
        <Button variant="outline">ログイン</Button>
      </Link>
      <Link href="/login">
        <Button variant="secondary">新規登録</Button>
      </Link>
    </div>
  );
}
