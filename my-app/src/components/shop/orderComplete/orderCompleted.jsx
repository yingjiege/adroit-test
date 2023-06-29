import React from "react";
import { useNavigate } from 'react-router-dom';

function OrderCompleted() {
  const storedInsertedId = localStorage.getItem('insertedId');

  const navigate = useNavigate();
  const handleGoBack = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div>
      <div className="container mt-2" style={{ width: '1000px' }}>
        <div className="row">
          <div className="col-12">
            <div className="jumbotron">
              <h1 className="text-left"><strong>Thank you so much!</strong>&nbsp;&nbsp;</h1>
              <h3 className="text-left">
                <strong>Your order has been placed</strong>
                &nbsp;&nbsp;</h3>
              <h5 className="text-left">The order number is # {storedInsertedId} </h5>
              <h5 className="text-left">You can contact us to check your order process. Once your order is completed, 
                we will inform you that your order is ready to pick up or ship. If you have any questions, please contact us.</h5>
              <button className="btn btn-primary" onClick={handleGoBack}>Go Back to Main Page</button>
            </div>
          </div>
        </div>        
      </div>
    </div>
  );
}

export default OrderCompleted;
