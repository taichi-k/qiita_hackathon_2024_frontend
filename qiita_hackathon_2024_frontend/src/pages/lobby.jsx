/* eslint-disable */

"use client"

import Header from "@/components/tailblocks/Header";
import UserContext from '../../context/user_context'; // ユーザーコンテキストのインポート
import { useRouter } from 'next/router';
import { useContext, useEffect, useState, useCallback } from 'react';
import axios from "axios"
import { Zen_Kaku_Gothic_New, Rampart_One, Zen_Maru_Gothic, Shippori_Mincho } from 'next/font/google'

const myfont = Zen_Maru_Gothic({
  weight: ["400"],
  subsets: ["latin"]
});

const Lobby = ({ prop_spaces }) => {
  const { userId } = useContext(UserContext);
  const [spaces, setSpaces] = useState(prop_spaces);
  const router = useRouter();

  useEffect(() => {
    const fetchSpaces = async () => {
      const res = await fetch("https://miyablo.sakura.ne.jp/kosugiiz/spaces", {
        cache: "no-store",
      });
      const resJson = await res.json();
      const spaces = resJson.data;
    
      setSpaces(spaces);
    };

    const intervalId = setInterval(fetchSpaces, 5000); // 5000ms(=5s)ごとにデータを取得
    return () => clearInterval(intervalId); // コンポーネントがアンマウントされるときにポーリングを停止
  }, []); 

  function checkUserExists(users, position) {
    for (const user of users) {
      if (user.position == position) return user;
    }
    return undefined;
  }

  // APIリクエストを送信する関数
  const handleLinkClick = useCallback(async (spaceId, roomId, position) => {
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
  });
  
  const truncate = (input) =>
    input.length > 15 ? `${input.substring(0, 15)}...` : input;
 
  return (
    <div className="bg-gradient-to-br from-neutral-50 to-amber-50">
      <Header></Header>
      <div className="px-auto w-full py-auto h-full pt-8 pb-40 md:pb-32">
        <div className="mx-auto w-fit">
          <div className={`mb-8 japanese ${myfont.className}`}>
            空いている席をクリックして、作業を始めましょう。
          </div>
          <div className="tables grid grid-cols-1 md:grid-cols-2 gap-24 place-items-center">
            {spaces.map((space) => {
              return (
                <div className={"oneTable grid grid-cols-2 w-72"} key={space.room_id}>
                  {[...Array(space.maximum).keys()].map((index) => {
                    let targetUser = checkUserExists(space.users, index)
                    return (
                      targetUser ?
                      (
                      <div className={`w-36 h-44 border-2 rounded border-yellow-800 bg-red-200 px-2 py-2`} key={`${space.room_id}-${index}`}>
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
                    ) : (
                      <div
                        key={`${space.room_id}-${index}`}
                        onClick={() => handleLinkClick(space.id, space.room_id, index)}
                        className={`w-36 h-44 border-2 border-gray-200 rounded shadow-lg flex justify-center items-center woodBackground cursor-pointer`}
                      >
                        <p className={`text-white font-bold text-md ${myfont.className}`}>空席</p>
                      </div>
                    ));
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
      prop_spaces: spaces,
    },
  };
};

export default Lobby;
