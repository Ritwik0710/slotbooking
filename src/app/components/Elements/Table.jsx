
import Checkbox from "./Checkbox";
let rowarr;
const changehandler = (rowIndex)=>{
rowarr.push()
}
function Table(arrRow, arrCol ) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>{<Checkbox/>}</th>
          {arrCol?.map((i) => (
            <th key={i} scope="col">
              {i}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {arrRow?.map((i, rowIndex) => (
          <tr key={rowIndex}>
            <td>{Checkbox(changehandler())}</td>
            {i?.map((j, colIndex) => (
              <td key={colIndex}>{j}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
