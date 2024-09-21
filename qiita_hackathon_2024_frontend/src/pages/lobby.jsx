/* eslint-disable */

"use client"

import Header from "@/components/tailblocks/Header";
import UserContext from '../../context/user_context'; // ユーザーコンテキストのインポート
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import axios from "axios"

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
    <>
      <Header></Header>
      <div className="px-auto w-full py-auto h-full pt-8 pb-32">
        <div className="mx-auto w-fit">
          <div className="font-bold mb-8">ロビー</div>
          <div className="tables grid grid-cols-2 gap-24">
            {spaces.map((space) => {
              return (
                <div className={"oneTable grid grid-cols-2 w-72"} key={space.room_id}>
                  {[...Array(space.maximum).keys()].map((index) => {

                    let targetUser = checkUserExists(space.users, index);
                    return targetUser ? (
                      <div
                        key={index}
                        className={`w-36 h-44 border-2 rounded border-yellow-900 bg-red-200`}
                      >
                        {targetUser.icon && (
                          <img 
                            src={targetUser.icon} 
                            alt={`${targetUser.nickname}'s icon`} 
                            className="w-full h-24 object-cover"
                          />
                        )}
                        <p>{targetUser.nickname}</p>
                        <br/>
                        <p>{targetUser.interested_in}</p>
                      </div>
                    ) : (
                      <div
                        key={index}
                        onClick={() => handleLinkClick(space.id, space.room_id, index)}
                        className={`w-36 h-44 border-2 rounded border-yellow-900 bg-yellow-700 shadow-lg cursor-pointer`}
                      >
                        <p className="text-white">空席</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
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
