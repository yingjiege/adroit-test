import React, { Fragment, useState, useEffect } from "react";
import CreateDoor from "./door/CreateDoor";
import CreateCabinet from "./cabinet/CreateCabinet";
import CreateAccessory from "./accessory/CreateAccssory";
import { useNavigate  } from "react-router-dom";
import Axios from "axios";

function Toggle() {
  const [PO, setPO] = useState("");
  const [insertedId, setInsertedId] = useState('');

  const [cabinet, setCabinet] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("cabinetData"));
    return storedData || [
      {
        id: 0,
        cabinetSize: "",
        doorType: "",
        doorColor: "",
        qty: 1,
        width: 0,
        height: 0,
        depth: 0,
        hinge: "",
        finLOrR: "",
        doorH: "",
        pcTopDoor: "",
        pcDoor: "",
        botDF: "",
        notchOut: "",
        customizeAddOn: "",
        memo: "",
        price: 0,
        BO: 0,
        DO: 0
      }
    ];
  });
  
  useEffect(() => {
    localStorage.setItem("cabinetData", JSON.stringify(cabinet));
    const handleBeforeUnload = () => {
      localStorage.removeItem("cabinetData");
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [cabinet]);
  
  const [cabinetDoor, setCabinetDoor] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("cabinetDoorData"));
    return storedData || [];
  });
  
  useEffect(() => {
    localStorage.setItem("cabinetDoorData", JSON.stringify(cabinetDoor));
    const handleBeforeUnload = () => {
      localStorage.removeItem("cabinetDoorData");
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [cabinetDoor]);
  
  const [accessories, setAccessories] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("accessoriesData"));
    return storedData || [
      {
        id: 1,
        acc: "",
        accColor: "",
        accCategory: "",
        accWidth: 0,
        accHeight: 0,
        accDepth: 0,
        accType: "",
        accQty: 0,
        accPrice: 0
      }
    ];
  });
  
  useEffect(() => {
    localStorage.setItem("accessoriesData", JSON.stringify(accessories));
  
    const handleBeforeUnload = () => {
      localStorage.removeItem("accessoriesData");
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [accessories]);

  const [isCabinetClicked, setCabinetClicked] = useState(false);
  const [isDoorClicked, setDoorClicked] = useState(false);
  const [isAccessoryClicked, setAccessoryClicked] = useState(false);
  const user_id = "aaaaaaa";
  const order_id = "123123123123";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();

    Axios.post('https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/post_test', {
      user_id: user_id,
      order_id: order_id,
      cabinet: cabinet,
      cabinetDoor: cabinetDoor,
      accessory: accessories,
      PO: PO, 
      date: currentDate // Add the current date to the data being posted
    })
      .then((response) => {
        setInsertedId(response.data);
        localStorage.setItem('insertedId', response.data.insertedId);
        navigate("/cart");
      })
      .catch((error) => {
        console.error('Error uploading data:', error);
        // Handle the error (e.g., display an error message)
      });
  };

  function cabinetClicked() {
    setCabinetClicked(!isCabinetClicked);
  }

  function doorClicked() {
    setDoorClicked(!isDoorClicked);
  }

  function accessoryClicked(){
    setAccessoryClicked(!isAccessoryClicked);
  }
  return (
    <Fragment>
      {/* Toggle buttons */}
      <div className="input-group d-flex justify-content-center">
        {/* Cabinet toggle */}
        <i
          onClick={cabinetClicked}
          className={
            isCabinetClicked
              ? "bi bi-archive-fill btn btn-warning"
              : "bi bi-archive-fill btn btn-outline-warning"
          }
          style={{ width: "auto", maxWidth: "150px" }}
        >
          Cabinet
        </i>

        {/* Door toggle */}
        <i
          onClick={doorClicked}
          className={
            isDoorClicked
              ? "bi bi-door-open-fill btn btn-success"
              : "bi bi-door-open-fill btn btn-outline-success"
          }
          style={{ width: "auto", maxWidth: "150px" }}
        >
          Door
        </i>

        {/* Accessory toggle */}
        <i
          onClick={accessoryClicked}
          className={
            isAccessoryClicked
              ? "bi bi-tools btn btn-primary"
              : "bi bi-tools btn btn-outline-primary"
          }
          style={{ width: "auto", maxWidth: "150px" }}
        >
          Accessory
        </i>
      </div>

      {/* Form */}
      <div className="d-flex justify-content-center " >
        <input
          className="form-control"
          value={PO}
          style={{ width: "auto", maxWidth: "150px" }}
          placeholder="PO#"
          onChange={(e) => setPO(e.target.value)}
        />
      </div>

      {/* Conditional rendering based on toggle state */}
      <div id="main">
        {isCabinetClicked ? (
          <div className="text-center">
            <CreateCabinet info={PO} items={cabinet} setItems={setCabinet} />
          </div>
        ) : (
          <div style={{ display: "none" }}>
            <CreateCabinet info={PO} items={cabinet} setItems={setCabinet} />
          </div>
        )}

        {isDoorClicked ? (
          <div>
            <CreateDoor info={PO} items={cabinetDoor} setItems={setCabinetDoor} />
          </div>
        ) : (
          <div style={{ display: "none" }}>
            <CreateDoor info={PO} items={cabinetDoor} setItems={setCabinetDoor} />
          </div>
        )}

        {isAccessoryClicked ? (
          <div className="text-center">
            <CreateAccessory infor={PO} accessories={accessories} setAccessories={setAccessories} />
          </div>
        ) : (
          <div style={{ display: "none" }}>
            <CreateAccessory infor={PO} accessories={accessories} setAccessories={setAccessories} />
          </div>
        )}
      </div>

      {/* Submit button */}
      <div>
        {isAccessoryClicked || isCabinetClicked || isDoorClicked ? (
          <div className="text-center">
            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                className="bi bi-cart btn btn btn-outline-primary"
                style={{ width: "auto", maxWidth: "150px" }}
              >
                Place Order
              </button>
            </form>
          </div>
        ) : (
          <div style={{ display: "none" }}>
            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                className="bi bi-cart btn btn btn-outline-primary"
                style={{ width: "auto", maxWidth: "150px" }}
              >
                Place Order
              </button>
            </form>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default Toggle;