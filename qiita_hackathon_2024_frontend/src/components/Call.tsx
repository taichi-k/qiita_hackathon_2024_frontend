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

import UserProfile from "./UserProfile";
import getUserProfileFromUID from "@/lib/utils"

function Call(props: { channelName: string; appId: string }) {
  const client = useRTCClient(
    AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
  );

  return (
    <AgoraRTCProvider client={client}>
      <Videos channelName={props.channelName!} AppID={props.appId!} />
      <div className="fixed z-10 bottom-0 left-0 right-0 flex justify-end pb-8 pr-12">
        <a
          className="px-5 py-3 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40"
          href="/lobby"
        >
          ロビーへ戻る
        </a>
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

  // usePublish([localMicrophoneTrack, localCameraTrack]);
  usePublish([localCameraTrack]);
  useJoin({
    appid: AppID,
    channel: channelName,
    token: null,
  });
  
  const currentUID = useCurrentUID()

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
            {/* {currentUID} */}
            <UserProfile user={getUserProfileFromUID(currentUID)}></UserProfile>
          </div>
        </div>
        {remoteUsers.map((user) => (
          <div className="relative">
            <RemoteUser user={user} playAudio={false} className="absolute top-0 left-0" />
            <div className="absolute top-4 left-4">
              <UserProfile user={getUserProfileFromUID(user.uid)}></UserProfile>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Call;