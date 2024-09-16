export default function Items({data}) {
  return (
    <ul>
        {data.map((value, index) => {
            return (
                <li key={index}>{value.name}, {value.id}, {value.age} </li>
            )
        })}
    </ul>
  );
}
