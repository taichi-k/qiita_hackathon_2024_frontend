/* eslint-disable */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUserProfileFromUID = async (uid: any, count = 0): Promise<object> => {
  try {
    const response = await axios.get(`https://miyablo.sakura.ne.jp/kosugiiz/space_users/${uid}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
      
    if (response.data.status !== '200') {
      throw new Error(`Failed to update uid: ${response.data.message}`);
    }

    const userProfile = {
      nickname: response.data.data.nickname,
      interested_in: response.data.data.interested_in,
      twitter_id: response.data.data.twitter_screenname,
    }

    return userProfile;
  } catch (error) {
    console.error(error);

    // 5回取得できない場合は諦める
    if (count >= 5) {
      return {
        nickname: uid,
        interested_in: null,
        twitter_id: null,
      };
    }

    // 取得できない場合は再度取得を試みる
    return getUserProfileFromUID(uid, count+1);
  }
}