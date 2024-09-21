/* eslint-disable */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function getUserProfileFromUID(uid: any) {
  const userProfile = {
    nickname: `俺は ${uid} だぜ！`,
    interested_in: "将棋,バレー",
    twitter_id: "twitter_id"
  }

  // TODO: ここでuserProfileをfetchする

  return userProfile;
}