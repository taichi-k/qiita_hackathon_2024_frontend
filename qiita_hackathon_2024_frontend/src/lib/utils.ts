/* eslint-disable */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function getUserProfileFromUID(uid: any) {
  const userProfile = {
    nickname: `ニックネーム`,
    interested_in: "将棋,バレー,らーめん,料理,音楽",
    twitter_id: "taichi_kosgiii"
  }

  // TODO: ここでuserProfileをfetchする

  return userProfile;
}