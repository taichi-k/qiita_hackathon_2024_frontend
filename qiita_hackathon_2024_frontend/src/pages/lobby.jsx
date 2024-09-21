"use client"
 
// import spaces from "../sample_data/spaces.json"
import Link from "next/link";
import Header from "@/components/tailblocks/Header"

const Lobby = ({spaces}) => {

  console.log(spaces)

  function checkUserExists(users, position) {
    for (const user of users) {
      if (user.position == position) return user;
    }
    return undefined;
  }
 
  return (
    <>
      <Header></Header>
      <div className="px-auto w-full py-auto h-full pt-8 pb-32">
        <div className="mx-auto w-fit">
          <div className="font-bold mb-8">
            ロビー
          </div>
          <div className="tables grid grid-cols-2 gap-24">
            {spaces.map((space) => {
              console.log('')
              console.log(space)
              return (
                <div className={"oneTable grid grid-cols-2 w-72"}>
                  {[...Array(space.maximum).keys()].map((index) => {
                    console.log(index, space.users[index])
                    let targetUser = checkUserExists(space.users, index)
                    return (
                      targetUser ?
                      <div className={`w-36 h-44 border-2 rounded border-yellow-900 bg-red-200`}>
                        <p>{targetUser.nickname}</p>
                        <p>{targetUser.interested_in}</p>
                      </div>
                      :
                      <Link href={`/channel/${space.room_id}`}>
                        <div className={`w-36 h-44 border-2 rounded border-yellow-900 bg-yellow-700 shadow-lg`}>
                          <p className="text-white">空席</p>
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
    </>
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