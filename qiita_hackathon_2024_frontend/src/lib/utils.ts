/* eslint-disable */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUserProfileFromUID = async (uid: any) => {
  try {
    const response = await axios.get(`https://miyablo.sakura.ne.jp/kosugiiz/space_users/${uid}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
      
    console.log(response);
      
    if (response.data.status !== '200') {
      throw new Error(`Failed to update uid: ${response.data.message}`);
    }

    const userProfile = {
      nickname: response.data.nickname,
      interested_in: response.data.interested_in,
      twitter_id: response.data.twitter_screenname,
    }

    return userProfile;
  } catch (error) {
    console.error(error);
    return {
      nickname: uid,
      interested_in: '',
      twitter_id: '',
    };
  }
}