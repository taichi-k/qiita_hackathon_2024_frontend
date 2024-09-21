/* eslint-disable */

"use client"

import Header from "@/components/tailblocks/Header";
import UserContext from '../../context/user_context'; // ユーザーコンテキストのインポート
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import axios from "axios"
import { Zen_Kaku_Gothic_New, Rampart_One, Zen_Maru_Gothic, Shippori_Mincho } from 'next/font/google'

const myfont = Zen_Maru_Gothic({
  weight: ["400"],
  subsets: ["latin"]
});

const Lobby = ({ spaces }) => {
  const { userId } = useContext(UserContext); // コンテキストからユーザーIDを取得
  const router = useRouter();

  function checkUserExists(users, position) {
    for (const user of users) {
      if (user.position == position) return user;
    }
    return undefined;
  }

  // APIリクエストを送信する関数
  const handleLinkClick = async (spaceId, roomId, position) => {
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    try {
      const formData = {
        position: position
      }
      const response = await axios.post(`https://miyablo.sakura.ne.jp/kosugiiz/space/${spaceId}/user/${userId}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data.status !== '200') {
        throw new Error(`Failed to join space: ${response.data.message}`);
      }

      // ページ遷移
      router.push(`/channel/${roomId}`);
    } catch (error) {
      console.error("Error joining space:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-neutral-50 to-amber-50">
      <Header></Header>
      <div className="px-auto w-full py-auto h-full pt-8 pb-32">
        <div className="mx-auto w-fit">
          <div className={`mb-8 japanese ${myfont.className}`}>
            空いている席に座って、作業を始めましょう。
          </div>
          <div className="tables grid grid-cols-2 gap-24">
            {spaces.map((space) => {
              return (
                <div className={"oneTable grid grid-cols-2 w-72"} key={space.room_id}>
                  {[...Array(space.maximum).keys()].map((index) => {
                    let targetUser = checkUserExists(space.users, index);
                    return targetUser ? (
                      <div className={`w-36 h-44 border-2 rounded border-yellow-800 bg-red-200 px-2 py-3`}>
                        {targetUser.icon && (
                          <img 
                            src={targetUser.icon} 
                            alt={`${targetUser.nickname}'s icon`} 
                            className="w-full h-24 object-cover"
                          />
                        )}
                        <p className={`font-bold mb-4 ${myfont.className}`}>{targetUser.nickname}</p>
                        <p className={`font-light text-sm ${myfont.className}`}>{targetUser.interested_in.replaceAll(",", "、")}</p>
                      </div>
                    ) : (
                      <div
                        key={index}
                        onClick={() => handleLinkClick(space.id, space.room_id, index)}
                        className={`w-36 h-44 border-2 border-gray-200 rounded shadow-lg flex justify-center items-center woodBackground`}
                      >
                        <p className={`text-white font-bold text-md ${myfont.className}`}>空席</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

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
