/* eslint-disable */

"use client"
 
// import spaces from "../sample_data/spaces.json"
import Link from "next/link";
import Header from "@/components/tailblocks/Header"

import { Zen_Kaku_Gothic_New, Rampart_One, Zen_Maru_Gothic, Shippori_Mincho } from 'next/font/google'

const myfont = Zen_Maru_Gothic({
  weight: ["400"],
  subsets: ["latin"]
});

const Lobby = ({spaces}) => {
  function checkUserExists(users, position) {
    for (const user of users) {
      if (user.position == position) return user;
    }
    return undefined;
  }
  
  const truncate = (input) =>
    input.length > 15 ? `${input.substring(0, 15)}...` : input;
 
  return (
    <div className="bg-gradient-to-br from-neutral-50 to-amber-50">
      <Header></Header>
      <div className="px-auto w-full py-auto h-full pt-8 pb-32">
        <div className="mx-auto w-fit">
          <div className={`mb-8 japanese ${myfont.className}`}>
            空いている席をクリックして、作業を始めましょう。
          </div>
          <div className="tables grid grid-cols-2 gap-24">
            {spaces.map((space) => {
              // console.log('')
              // console.log(space)
              return (
                <div className={"oneTable grid grid-cols-2 w-72"}>
                  {[...Array(space.maximum).keys()].map((index) => {
                    // console.log(index, space.users[index])
                    let targetUser = checkUserExists(space.users, index)
                    return (
                      targetUser ?
                      // <div className={`w-36 h-44 border-2 rounded border-yellow-900 bg-red-200`}>
                      <div className={`w-36 h-44 border-2 rounded border-yellow-800 bg-red-200 px-2 py-2`}>
                        <p className={`font-bold mb-2 ${myfont.className}`}>
                          {targetUser.nickname}
                        </p>
                        <p className={`font-light text-sm mb-4 ${myfont.className}`}>
                          {truncate(targetUser.interested_in.replaceAll(",", "、"))}
                        </p>
                        <div className="text-right w-full pr-1">
                          <img className={`w-16 h-16 rounded inline`} src={`${targetUser.icon}`} />
                        </div>
                      </div>
                      :
                      <Link href={`/channel/${space.room_id}`}>
                        {/*<div className={`w-36 h-44 border-2 rounded border-yellow-900 bg-yellow-700 shadow-lg bg-gradient-to-tr`}>*/}
                        <div className={`w-36 h-44 border-2 border-gray-200 rounded shadow-lg flex justify-center items-center woodBackground`}>
                          <p className={`text-white font-bold text-md ${myfont.className}`}>空席</p>
                        </div>
                      </Link>
                    )}
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// This function runs on the server and fetches data before rendering
export const getServerSideProps = async () => {
  const res = await fetch("https://miyablo.sakura.ne.jp/kosugiiz/spaces", {
    cache: "no-store",
  });
  const resJson = await res.json();
  const spaces = resJson.data;

  return {
    props: {
      spaces,
    },
  };
};

export default Lobby;