import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";


import "../../App.css";

export default function AccountSetting() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({})
  useEffect(() => {
      Axios.get(`https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/get_customer_information`)
      .then((res) => {
        const searchedCabinet = res.data[0];
        setInfo(searchedCabinet)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return(<Fragment>
    <div class="container">

    <main>
    <div class="py-5 text-center">
      <h2>Checkout form</h2>
      <p class="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
    </div>

    <div class="row g-5">
      <div class="col-md-5 col-lg-4 order-md-last">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-primary">Your cart</span>
          <span class="badge bg-primary rounded-pill">3</span>
        </h4>
        <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Product name</h6>
              <small class="text-body-secondary">Brief description</small>
            </div>
            <span class="text-body-secondary">$12</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Second product</h6>
              <small class="text-body-secondary">Brief description</small>
            </div>
            <span class="text-body-secondary">$8</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Third item</h6>
              <small class="text-body-secondary">Brief description</small>
            </div>
            <span class="text-body-secondary">$5</span>
          </li>
          <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
            <div class="text-success">
              <h6 class="my-0">Promo code</h6>
              <small>EXAMPLECODE</small>
            </div>
            <span class="text-success">−$5</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Total (USD)</span>
            <strong>$20</strong>
          </li>
        </ul>

        <form class="card p-2">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Promo code"/>
            <button type="submit" class="btn btn-secondary">Redeem</button>
          </div>
        </form>
      </div>
      <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">Billing address</h4>
        <form class="needs-validation" novalidate>
        <div class="row g-3">
    <div class="col-sm-6">
      <label for="firstName" class="form-label">First name</label>
      <input 
        type="text" 
        class="form-control" 
        id="firstName" 
        placeholder="" 
        value={info.first_name} 
        onChange={(e) => setInfo({ ...info, first_name: e.target.value })}
        required
      />
      <div class="invalid-feedback">
        Valid first name is required.
      </div>
    </div>

    <div class="col-sm-6">
      <label for="lastName" class="form-label">Last name</label>
      <input 
        type="text" 
        class="form-control" 
        id="lastName" 
        placeholder=""
        value={info.last_name}
        onChange={(e) => setInfo({ ...info, last_name: e.target.value })}
        required
      />
      <div class="invalid-feedback">
        Valid last name is required.
      </div>
    </div>

    <div class="col-12">
      <label for="company" class="form-label">Company</label>
      <div class="input-group has-validation">
        <input 
          type="text" 
          class="form-control" 
          id="company" 
          placeholder="Company" 
          required
          value={info.company}
          onChange={(e) => setInfo({ ...info, company: e.target.value })}
        />
        <div class="invalid-feedback">
          Your company is required.
        </div>
      </div>
    </div>

    <div class="col-12">
      <label for="username" class="form-label">Username</label>
      <div class="input-group has-validation">
        <span class="input-group-text">@</span>
        <input
          type="text"
          class="form-control"
          id="username"
          placeholder="Username"
          value={info.username}
          onChange={(e) => setInfo({ ...info, username: e.target.value })}
          required
        />              
        <div class="invalid-feedback">
          Your username is required.
        </div>
      </div>
    </div>

    <div class="col-12">
      <label for="email" class="form-label">Email <span class="text-body-secondary">(Optional)</span></label>
      <input 
        type="email" 
        class="form-control" 
        id="email" 
        placeholder="you@example.com"
        value={info.email}
        onChange={(e) => setInfo({ ...info, email: e.target.value })}
      />
      <div class="invalid-feedback">
        Please enter a valid email address for shipping updates.
      </div>
    </div>

    <div class="col-12">
      <label for="address" class="form-label">Address</label>
      <input 
        type="text" 
        class="form-control" 
        id="address" 
        placeholder="1234 Main St" 
        required
        value={info.address}
        onChange={(e) => setInfo({ ...info, address: e.target.value })}
      />
      <div class="invalid-feedback">
        Please enter your shipping address.
      </div>
    </div>

    <div class="col-12">
      <label for="address2" class="form-label">Address 2 <span class="text-body-secondary">(Optional)</span></label>
      <input 
        type="text" 
        class="form-control" 
        id="address2" 
        placeholder="Apartment or suite"
        value={info.address2}
        onChange={(e) => setInfo({ ...info, address2: e.target.value })}
      />
    </div>

    <div class="col-md-5">
      <label for="country" class="form-label">Country</label>
      <select class="form-select" id="country" required>
        <option value="">Choose...</option>
        <option value="United States" selected>United States</option>
      </select>
      <div class="invalid-feedback">
        Please select a valid country.
      </div>
    </div>

    <div class="col-md-4">
      <label for="state" class="form-label">State</label>
      <input 
        type="text" 
        class="form-control" 
        id="state" 
        placeholder=""
        value={info.state}
        onChange={(e) => setInfo({ ...info, state: e.target.value })}
      />

      <div class="invalid-feedback">
        Please provide a valid state.
      </div>
    </div>

    <div class="col-md-3">
      <label for="zip" class="form-label">Zip</label>
      <input 
        type="text" 
        class="form-control" 
        id="zip" 
        placeholder="" 
        required
        value={info.zip}
        onChange={(e) => setInfo({ ...info, zip: e.target.value })}
      />
      <div class="invalid-feedback">
        Zip code required.
      </div>
    </div>
  </div>

          <hr class="my-4"/>

          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="same-address"/>
            <label class="form-check-label" for="same-address">Shipping address is the same as my billing address</label>
          </div>

          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="save-info"/>
            <label class="form-check-label" for="save-info">Save this information for next time</label>
          </div>

          <hr class="my-4"/>

          <h4 class="mb-3">Payment</h4>

          <div class="my-3">
            <div class="form-check">
              <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked required/>
              <label class="form-check-label" for="credit">Credit card</label>
            </div>
            <div class="form-check">
              <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required/>
              <label class="form-check-label" for="debit">Debit card</label>
            </div>
            <div class="form-check">
              <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" required/>
              <label class="form-check-label" for="paypal">PayPal</label>
            </div>
          </div>

          <div class="row gy-3">
            <div class="col-md-6">
              <label for="cc-name" class="form-label">Name on card</label>
              <input type="text" class="form-control" id="cc-name" placeholder="" required/>
              <small class="text-body-secondary">Full name as displayed on card</small>
              <div class="invalid-feedback">
                Name on card is required
              </div>
            </div>

            <div class="col-md-6">
              <label for="cc-number" class="form-label">Credit card number</label>
              <input type="text" class="form-control" id="cc-number" placeholder="" required/>
              <div class="invalid-feedback">
                Credit card number is required
              </div>
            </div>

            <div class="col-md-3">
              <label for="cc-expiration" class="form-label">Expiration</label>
              <input type="text" class="form-control" id="cc-expiration" placeholder="" required/>
              <div class="invalid-feedback">
                Expiration date required
              </div>
            </div>

            <div class="col-md-3">
              <label for="cc-cvv" class="form-label">CVV</label>
              <input type="text" class="form-control" id="cc-cvv" placeholder="" required/>
              <div class="invalid-feedback">
                Security code required
              </div>
            </div>
          </div>

          <hr class="my-4"/>

          <button
            className="w-100 btn btn-primary btn-lg"
            type="submit"
            onClick={() => {
              // Navigate to '/ordercompleted'
              navigate('/ordercompleted');
            }}
          >
            Complete Order
          </button>
        </form>
      </div>
    </div>
  </main>
  </div>
  </Fragment>);
}