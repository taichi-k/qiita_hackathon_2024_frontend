import Items from "@/component/items.jsx"

export async function getServerSideProps() {
  // APIからデータを取得
  const res = await fetch('http://localhost:8000/get_json');
  const data = await res.json();

  // ページにpropsとしてデータを渡す
  return {
    props: {
      data, // コンポーネントで使用するデータ
    },
  };
}
  
export default function FetchJson( props ) {
  return (
    <div>
      <h1>APIから取得したデータ</h1>
      <Items data={props.data}></Items>
    </div>
  );
}