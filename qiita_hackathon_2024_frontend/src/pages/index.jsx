import { Button } from "@/components/ui/button"
import Link from 'next/link'
import ServiceName from "@/components/ServiceName"

export default function Index() {
  return (
    <div className="w-full h-screen welcomeBox bg-gradient-to-br from-neutral-50 to-amber-50 libraryBackground">
      <div className="mx-auto w-fit">
        <div className="mb-4" style={{color:'white'}}>
          <ServiceName></ServiceName> で勉強を始めよう！
        </div>
        <div className="flex gap-8 items-center justify-center">
          <Link href="/login">
            <Button className="border border-white-900" variant="outline" style={{color:'white'}}>ログイン</Button>
          </Link>
          <Link href="/register">
            <Button variant="secondary">新規登録</Button>
          </Link>
        </div>
      </div>
      <div className='top-footer'></div>
    </div>
  );
}
