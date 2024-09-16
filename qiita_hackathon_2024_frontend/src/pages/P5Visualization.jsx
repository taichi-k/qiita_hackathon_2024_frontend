import { useEffect, useState } from 'react';
import SketchComponent from "@/component/sketch0";

const INTERVAL = Math.floor(1000 / 60)

const P5Visualization = () => {
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
      {/* <h1>リアルタイムデータ</h1>
      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <pre>
          {JSON.stringify(data.sensordata)}
        </pre>
      )} */}

      <SketchComponent data={data}></SketchComponent>
    </div>
  );
};

export default P5Visualization;