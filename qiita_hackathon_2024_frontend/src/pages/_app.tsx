import "@/styles/globals.css";
import "@/styles/my.css";
import Footer from "@/components/tailblocks/Footer";
import type { AppProps } from "next/app";
import { UserProvider } from "../../context/user_context";
import UserContext from "../../context/user_context";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios"

export default function App({ Component, pageProps }: AppProps) {

  return (
    <UserProvider>
      <AppWithRouteWatcher Component={Component} pageProps={pageProps} />
      <Footer></Footer>
    </UserProvider>
  );
}

// ルート監視を行うコンポーネント
function AppWithRouteWatcher({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { userId } = useContext(UserContext); // UserProvider から userId を取得

  useEffect(() => {
    // ログインされていない場合かつlogin系ページ以外にアクセスされた場合は、ルートページにリダイレクト
    if (!userId && !['/', '/login', '/register'].includes(router.pathname)) {
      router.replace('/');
      return;
    }

    // ログインしているのに、login系ページにアクセスされた場合は、lobbyページにリダイレクト
    if (userId && ['/', '/login', '/register'].includes(router.pathname)) {
      router.replace('/lobby');
      return;
    }

    // ルート遷移時に実行する処理
    const handleRouteChange = async (url: string) => {
      const currentUrl = router.pathname;

      console.log(`Navigating from ${currentUrl} to ${url}`);

      if (currentUrl.startsWith('/channel/')) {
        console.log('spaceから他のページへ遷移しようとしています。spaceから退出します。');

        try {
          const room_id = router.query.channelName; // ルームIDを取得
          const response = await axios.delete(`https://miyablo.sakura.ne.jp/kosugiiz/space/${room_id}/user/${userId}`, {
            headers: {
              'Content-Type': 'application/json',
            }
          });

          if (response.data.status !== '200') {
            throw new Error(`Failed to update uid: ${response.data.message}`);
          }

          console.log('spaceから退出しました。');
          if (url.includes('lobby')) {
            router.replace(url); // ロビーに遷移した場合は、画面上にユーザが残っているように見えてしまうため、リロードする
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    // ルート遷移時に handleRouteChange を呼び出す
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router, userId]);

  return <Component {...pageProps} />;
}