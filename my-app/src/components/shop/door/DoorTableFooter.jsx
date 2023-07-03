import React,  {useState} from "react";
import { CSVLink } from "react-csv";

function TableFooter(props) {
  const items = props.items;
  const [addNumberOfRow, setAddNumberOfRow] = useState(1);

  let testTotal = 0;
  let totalQty = 0;
  let packagingFee = 0;
  const [IsFreight, setIsFreight] = useState(false);
  for (let row in items) {
    testTotal += Number(items[row].subtotal);
    totalQty += Number(items[row].qty);
    packagingFee += Number(items[row].width * items[row].height* items[row].qty);
  }
  packagingFee =  +(Math.round((packagingFee / 144) + "e+2") + "e-2")
  
  testTotal = +(Math.round(testTotal + "e+2") + "e-2");
  if (IsFreight ===true){
    testTotal = +(Math.round((testTotal + packagingFee) + "e+2") + "e-2");
  }
  
  function handleClick(n) {
    props.onAdd(n);
  }
  
  function handleAddRowNumber(event) {
    const needRow = event.target.value;
    setAddNumberOfRow(needRow);
  }

  function handleFreight(event){
    props.setIsFreight(event.target.checked);
    setIsFreight(event.target.checked);
  }


  return (
    <tfoot>
      <tr>
        <td colSpan="5" align="right">
          total items
        </td>
        <td  colSpan="2">{totalQty}</td>
        <input
          colSpan=""
          type="checkbox"
          className="form-check-input"
          id="defaultCheck2"
          name="freight"
          checked={IsFreight}
          onChange={handleFreight}
        />
        Packaging
        {IsFreight && (
          <td>{packagingFee}</td>
        )}        
        <td colSpan="6" align="right">
        {testTotal}
        </td>
      </tr>

      <tr>
        <td colSpan="3">
          <div className="input-group">
            <i
              className="bi bi-plus-circle-fill btn btn-secondary"
              onClick={() => handleClick(addNumberOfRow)}
              style={{ width: "auto", maxWidth: "200px" }}

            >
              Add Cabinet Door
            </i>
            <input
              type="number"
              name="NumOfRow"
              className="form-control"
              value={addNumberOfRow}
              onChange={(event) => handleAddRowNumber(event)}
              style={{ width: "auto", maxWidth: "150px" }}
              />
          </div>
        </td>
        <td colSpan="4">
          <i
            className="bi bi-file-earmark-pdf-fill btn btn-primary"
            onClick={props.printPDF}
            style={{ color: "white", borderStyle: "solid" ,width: "auto", maxWidth: "150px" }}
          >
            PDF
          </i>
          <CSVLink data={props.items} filename={"my-file.csv"} target="_blank">
            <i
              className="bi bi-filetype-csv btn btn-primary"
              style={{ color: "white", borderStyle: "solid",width: "auto", maxWidth: "150px" }}
            >
              CSV
            </i>
          </CSVLink>
        </td>
      </tr>
    </tfoot>
  );
}

export default TableFooter;
