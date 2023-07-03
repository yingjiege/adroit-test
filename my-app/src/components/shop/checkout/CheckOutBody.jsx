import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";

function CheckOutBody() {
  const [searchedCabinet, setSearchedCabinet] = useState(null);
  const user_id = "aaaaaaa";
  const storedInsertedId = localStorage.getItem('insertedId');

  useEffect(() => {
    Axios.get("https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/get_order_list")
      .then((res) => {
        setSearchedCabinet(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/account-setting');
  };

  const filteredData = searchedCabinet && searchedCabinet.find(item => item._id === storedInsertedId);
  const cabinet = filteredData && filteredData.cabinet;
  const cabinetDoor = filteredData && filteredData.cabinetDoor;
  const accessory = filteredData && filteredData.accessory;
  const PO = filteredData && filteredData.PO;
  let totalQty = 0;
  let totalPrice = 0;

  for (let i in cabinet) {
    totalQty += parseInt(cabinet[i].qty)
    const qty = cabinet[i].qty
    totalPrice += parseFloat(cabinet[i].price) * qty;
  }
  for (let i in cabinetDoor) {
    const qty = cabinetDoor[i].qty
    totalQty += parseInt(cabinetDoor[i].qty)
    totalPrice += parseFloat(cabinetDoor[i].price) * qty;
  }
  for (let i in accessory) {
    const qty = accessory[i].accQty
    totalQty += parseInt(accessory[i].accQty)
    totalPrice += parseFloat(accessory[i].accPrice) * qty;
  }
  totalPrice = +(Math.round(totalPrice + "e+2") + "e-2");

  return (
    <div>
      <div className="container mt-2" style={{ width: '1500px' }}>
        <div className="row">
          <div className="col-12">
            <div className="jumbotron">
              <h1 className="text-left"><strong>Place Order</strong>&nbsp;&nbsp;</h1>
              <h3 className="text-left">
                <strong>Shopping Cart -- Placing Order</strong>
                &nbsp;&nbsp; PO#:{PO}</h3>

              <form className="order-form"
                style={{ border: '1px solid black', padding: '20px' }}>
                <h5 className="text-left"
                  style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <table>
                    <thead>
                      <tr>
                        <th scope="col" colSpan="5" style={{ width: '1700px' }}>Item</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                        <table>
                        <tbody>
                          {cabinet && cabinet.map((item, index) => (
                            <tr key={index}>
                              <td colspan="1" style={{ width: '430px' }}>
                                Cabinet: {item.cabinetSize}
                              </td>
                              <td colspan="1" style={{ width: '250px' }}>
                                Color: {item.doorColor}
                              </td>
                              <td style={{ width: '100px' }}>
                                W: {item.width} 
                              </td>
                              <td style={{ width: '90px' }}>
                                H: {item.height}
                              </td>
                              <td style={{ width: '80px' }}>
                                D: {item.depth}
                              </td>
                              <td style={{ width: '60px' }} >
                                Qty: <span className="quantity" style={{ fontSize: "18px" }}>{item.qty}</span>
                              </td>
                              <td>
                                Subtotal: <span className="subtotal" style={{ fontSize: "18px" }}>${(item.qty * item.price).toFixed(2)}</span>
                              </td>
                            </tr>
                          ))}

                          {cabinetDoor && cabinetDoor.map((item, index) => (
                            <tr key={index}>
                              <td colspan="1">
                                Cabinet Door : {item.panelFinish}
                              </td>
                              <td colspan="1">
                                Color: {item.panelId}
                              </td>
                              <td style={{ width: '100px' }}>
                                W: {item.width} 
                              </td>
                              <td style={{ width: '90px' }}>
                                H: {item.height}
                              </td>
                              <td style={{ width: '80px' }}>
                                D: {item.depth}
                              </td>
                              <td style={{ width: '60px' }} >
                                Qty: <span className="quantity" style={{ fontSize: "18px" }}>{item.qty}</span>
                              </td>
                              <td>
                                Subtotal: <span className="subtotal" style={{ fontSize: "18px" }}>${item.subtotal}</span>
                              </td>
                              <td colspan=""></td> {/* Empty cells to align with the previous row */}
                            </tr>
                          ))}

                          {accessory && accessory.map((item, index) => (
                            <tr key={index}>
                              <td colspan="1">
                                Accessory: {item.acc}
                              </td>
                              <td colspan="1">
                                Color: {item.accColor}
                              </td>
                              <td style={{ width: '100px' }}>
                                W: {item.accWidth} 
                              </td>
                              <td style={{ width: '90px' }}>
                                H: {item.accHeight}
                              </td>
                              <td style={{ width: '80px' }}>
                                D: {item.accDepth}
                              </td>
                              <td style={{ width: '60px' }} >
                                Qty: <span className="quantity" style={{ fontSize: "18px" }}>{item.accQty}</span>
                              </td>
                              <td>
                                Subtotal: <span className="subtotal" style={{ fontSize: "18px" }}>${item.accPrice}</span>
                              </td>
                              <td colspan="1"></td> {/* Empty cells to align with the previous row */}
                            </tr>
                          ))}
                          <tr>
                            <td colSpan="6">Total qty: {totalQty}</td>
                            <td colSpan="1">Total: {totalPrice}</td>
                          </tr>
                        </tbody>
                      </table>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      
                    </tfoot>
                  </table>
                </h5>
              </form>
            </div>
          </div>
        </div>
        <button onClick={handleClick} 
        className="form-control"
        style={{ width: "auto", maxWidth: "150px" }}
        >CHECK OUT</button>
      </div>
    </div>
  );
}

export default CheckOutBody;
