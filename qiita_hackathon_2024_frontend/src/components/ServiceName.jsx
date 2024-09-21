import { Zen_Kaku_Gothic_New, Rampart_One, Zen_Maru_Gothic, Shippori_Mincho } from 'next/font/google'

const myfont = Zen_Maru_Gothic({
  weight: ["400"],
  subsets: ["latin"]
});

export default function ServiceName() {
    return (
        <span className={`ml-3 text-xl font-bold ${myfont.className}`}>
            気まぐれ自習室
        </span>
    )
}