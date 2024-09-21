import { createContext, useState, useEffect } from 'react';

// Contextを作成
const UserContext = createContext();

// Providerを作成
export function UserProvider({ children }) {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // localStorageからユーザーIDを取得して復元
    const savedUserId = localStorage.getItem('userId');
    if (savedUserId) {
      setUserId(savedUserId);
    }
  }, []);

  const login = (id) => {
    setUserId(id);
    localStorage.setItem('userId', id); // ログイン時にlocalStorageに保存
  };

  const logout = () => {
    setUserId(null);
    localStorage.removeItem('userId'); // ログアウト時に削除
  };

  return (
    <UserContext.Provider value={{ userId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
