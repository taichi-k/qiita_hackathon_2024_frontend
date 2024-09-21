/* eslint-disable */

"use client";

import AgoraRTC, {
  AgoraRTCProvider,
  LocalVideoTrack,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useCurrentUID,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";
import Link from 'next/link'
import UserContext from '../../context/user_context';
import { useContext, useEffect, useState } from 'react';
import axios from "axios"
import UserProfile from "./UserProfile";
import { getUserProfileFromUID } from "@/lib/utils"

function Call(props: { channelName: string; appId: string }) {
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  return (
    <AgoraRTCProvider client={client}>
      <Videos channelName={props.channelName!} AppID={props.appId!} />
      <div className="fixed z-10 bottom-0 left-0 right-0 flex justify-end pb-8 pr-12">
        <Link href="/lobby" className="px-5 py-3 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40">
          ロビーへ戻る
        </Link>
      </div>
    </AgoraRTCProvider>
  );
}

function Videos(props: { channelName: string; AppID: string }) {
  const { AppID, channelName } = props;
  // const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const remoteUsers = useRemoteUsers();
  // const { audioTracks } = useRemoteAudioTracks(remoteUsers);
  const { userId } = useContext(UserContext);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [remoteUserProfiles, setRemoteUserProfiles] = useState<Record<string, any>>({});

  // usePublish([localMicrophoneTrack, localCameraTrack]);
  usePublish([localCameraTrack]);
  useJoin({
    appid: AppID,
    channel: channelName,
    token: null,
  });
  
  const currentUID = useCurrentUID()

  // currentUID を使って API を呼び出す
  useEffect(() => {
    if (currentUID) {
      console.log("currentUIDを使ってAPIを呼び出します:", currentUID);
      setUidToUserSpace(userId, currentUID).then((profile) => {
        console.log("============ setCurrentUserProfile ============");
        setCurrentUserProfile(profile);
      }); // uidで更新し、返り値のプロフィールを取得
    }
  }, [currentUID]); // currentUID が変更されたときに再度呼び出される

  // remoteUsers に対するプロフィールデータを取得
  useEffect(() => {
    if (remoteUsers.length > 0) {
      const fetchProfiles = async () => {
        const profiles = {} as any;
        for (const user of remoteUsers) {
          const profile = await getUserProfileFromUID(user.uid);
          profiles[user.uid] = profile;
        }
        setRemoteUserProfiles(profiles);
      };
      fetchProfiles();
    }
  }, [remoteUsers]);

  // APIリクエストを送信する関数
  const setUidToUserSpace = async (userId: any, uid: any) => {
    console.log("============ setUidToUserSpace ============", userId, uid);
    if (!userId) {
      console.error("User ID not found");
      return;
    }
    const formData = {
      uid: uid,
      room_id: props.channelName
    };
  
    try {
      const response = await axios.patch(`https://miyablo.sakura.ne.jp/kosugiiz/space_users/${userId}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
        
      console.log(response);
        
      if (response.data.status !== '200') {
        throw new Error(`Failed to update uid: ${response.data.message}`);
      }

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  

  // audioTracks.map((track) => track.play());

  // const deviceLoading = isLoadingMic || isLoadingCam;
  const deviceLoading = isLoadingCam;
  if (deviceLoading)
    return (
      <div className="flex flex-col items-center pt-40">Loading devices...</div>
    );
  const unit = "minmax(0, 1fr) ";

  return (
    <div className="flex flex-col justify-between w-full h-screen p-1">
      <div
        className={`grid  gap-1 flex-1`}
        style={{
          gridTemplateColumns:
            remoteUsers.length > 9
              ? unit.repeat(4)
              : remoteUsers.length > 4
              ? unit.repeat(3)
              : remoteUsers.length > 1
              ? unit.repeat(2)
              : unit,
        }}
      >
        <div className="relative">
          <LocalVideoTrack
                track={localCameraTrack}
                play={true}
                className="w-full h-full absolute top-0 left-0"
              />
          <div className="absolute top-4 left-4">
            {currentUserProfile ? (
              <UserProfile user={currentUserProfile}></UserProfile>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
        {remoteUsers.map((user) => (
          <div className="relative">
            <RemoteUser user={user} playAudio={false} className="absolute top-0 left-0" />
            <div className="absolute top-4 left-4">
              { remoteUserProfiles[user.uid] ? (
                <UserProfile user={remoteUserProfiles[user.uid]}></UserProfile>
              ) : (
                <div>Loading profile...</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Call;