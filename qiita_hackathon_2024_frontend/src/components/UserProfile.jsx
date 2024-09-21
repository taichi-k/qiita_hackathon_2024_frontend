/* eslint-disable */

import Link from "next/link"
import { Zen_Maru_Gothic } from 'next/font/google'

const myfont = Zen_Maru_Gothic({
  weight: ["400"],
  subsets: ["latin"]
});

export default function UserProfile( props ) {
    if (!props.user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`${myfont.className}`}>
            <p className={`mb-2 text-xl`}>{props.user.nickname}</p>
            <div className='mb-2'>
                {props.user?.interested_in?.split(",").map((interest) => {
                    return <span className="mr-1 p-1 rounded">
                        #{interest}
                    </span>
                })}
            </div>
            <p><Link target="_blank" href={`https://x.com/${props.user.twitter_id}`}>X: {props.user.twitter_id}</Link></p>
        </div>
    )
}