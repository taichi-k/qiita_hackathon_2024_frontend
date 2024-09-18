'use client'
import dynamic from 'next/dynamic'
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

const ThreeGraph = () => {

  // データの型指定でPartial<PlotData>をつけておくと型サポート使えて便利です
  // データ群1
  const data1 = {
    type: 'scatter3d',
    x: [1,5,9,7],
    y: [-9,4,3,0],
    z: [2,2,2,2],
    marker:{symbol:'circle', opacity:1, size:3},
    mode: 'markers',
    text: ['A', 'B', 'C', 'D'],
    name: 'Group_1',
  }
  
  // データ群2 ちなみに群1と群2は自動で色分けしてくれる。便利！
  // 手動で設定したいなら marker:{color:***}
  const data2 = {
    type: 'scatter3d',
    x: [-6,5,3,-2],
    y: [-4,9,4,6],
    z: [-2,-2,-2,-2],
    marker:{symbol:'circle', opacity:1, size:3},
    mode: 'markers',
    text: ['E', 'F', 'G', 'H'],
    name: 'Group_2',
  }
  
  // 以下はXYZの軸が欲しかったので無理矢理作った
  const lineX = {
    type: 'scatter3d',
    x:[-10,10],
    y:[0,0],
    z:[0,0],
    mode: 'lines',
    line:{color:'black'}
  };
  
  const lineY = {
    type: 'scatter3d',
    x:[0,0],
    y:[-10,10],
    z:[0,0],
    mode: 'lines',
    line:{color:'black'}
  };
  
  const lineZ = {
    type: 'scatter3d',
    x:[0,0],
    y:[0,0],
    z:[-10,10],
    mode: 'lines',
    line:{color:'black'}
  };
  
  const layout1 = { title: '３次元グラフ'};
  
  // 下にある<Plot data = {}> のdataの型は Partial<PlotData>[]
  // サンプルとしてわかりやすいように型を書いています
  const allData = [data1, data2, lineX, lineY, lineZ]
  
  return (
    <Plot data={allData} layout={layout1} />
  );
};

export default ThreeGraph;

