/* eslint-disable */

import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const Call = dynamic(() => import("@/components/Call"), { ssr: false });

export default function Page( params ) {
    const router = useRouter()
    
    return (
        <main className="flex w-full flex-col">
            <p className="absolute z-10 mt-2 ml-12 text-2xl font-bold text-gray-900">
                {router.query.channelName}
            </p>
            <Call appId={process.env.NEXT_PUBLIC_AGORA_APP_ID} channelName={router.query.channelName}></Call>
        </main>
    )
}