"use client"
 
import spaces from "../sample_data/spaces.json"
import Link from "next/link";

export default function Lobby() {

  function checkUserExists(users, position) {
    for (const user of users) {
      if (user.position == position) return true;
    }
    return false;
  }
 
  return (
    <div className="px-auto w-full py-auto h-full">
      <span className="font-bold">ロビー</span>
      {spaces.map((space) => {
        return (
          <div className={"grid grid-cols-2 w-72 mb-10"}>
            {[...Array(space.maximum).keys()].map((index) => {
              return (
                checkUserExists(space.users, index) ?
                <div className={`w-36 h-36 border bg-white`}>
                  <p className="text-black">{space.users[0].nickname}</p>
                  <p className="text-black">{space.users[0].interested_in}</p>
                </div>
                :
                <Link href={`/channel/${space.channel_id}`}>
                  <div className={`w-36 h-36 border`}>
                    空席
                  </div>
                </Link>
              )}
            )}
          </div>
        )
      })}
    </div>
  )
}