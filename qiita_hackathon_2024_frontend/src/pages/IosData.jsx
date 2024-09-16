import { useEffect, useState } from 'react';

const INTERVAL = 100

const IosData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8000/zigsim');
        const result = await res.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>リアルタイムデータ</h1>
      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <p>
          {JSON.stringify(data)}
        </p>
      )}
    </div>
  );
};

export default IosData;