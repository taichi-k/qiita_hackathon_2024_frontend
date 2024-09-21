import { Zen_Maru_Gothic } from 'next/font/google'

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