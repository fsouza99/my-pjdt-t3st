export default function EmptyTableRow({ columns }) {
  return (
    <tr>
      { Array(columns).fill().map((_, index) => (<td key={index}>-</td>)) }
    </tr>
  );
}

