// PaymentConfirmation.component.js

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BasicLicense from "../../assets/license_agreements/Basic Lease.pdf"
import PremiumLicense from "../../assets/license_agreements/Premium Lease.pdf"
import ExclusiveLicense from "../../assets/license_agreements/Exclusive Lease.pdf"

// Custom Styles
import '../../assets/css/checkout-page.css';

export default class PaymentConfirmation extends Component {
    constructor(props) {
      super(props);

      this.createDate = this.createDate.bind(this);
    }

    componentDidMount() {
      window.scrollTo(0,0);
    }

    createDate() {
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let separator = "/"

        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }

    render() {
        var purchaseItems = [];
        var licenseItems = [];
        var totalCost = 0;
        var subTotal = 0;
        var taxPercentage = this.props.location.state.taxPercentage;
        var numItems = 0;
        let basicFound = false;
        let premiumFound = false;
        let exclusiveFound = false;

        for(var item in this.props.location.state.shoppingCart) {
            purchaseItems.push(
            <tr key={this.props.location.state.shoppingCart[item].sku}>
              <td className="product">{this.props.location.state.shoppingCart[item].name}<small>{this.props.location.state.shoppingCart[item].description}</small></td>
              <td className="price">{"$" + this.props.location.state.shoppingCart[item].unit_amount.value}</td>
              <td className="quantity">
                <div className="form-group">
                  <input type="text" className="form-control" value={this.props.location.state.shoppingCart[item].quantity} disabled />
                </div>                      
              </td>
              <td className="amount">{"$" + this.props.location.state.shoppingCart[item].unit_amount.value * this.props.location.state.shoppingCart[item].quantity} </td>
            </tr>
            );

            if((this.props.location.state.shoppingCart[item].description.search("License Tier: Basic") > 0) && !basicFound) {
                basicFound = true;
                licenseItems.push(<a key="Basic License" href={BasicLicense}><b>Off Ki Productions Basic License Agreement</b><br /></a>);
            }
      
            if((this.props.location.state.shoppingCart[item].description.search("License Tier: Premium") > 0)  && !premiumFound) {
                premiumFound = true;
                licenseItems.push(<a key="Premium License" href={PremiumLicense}><b>Off Ki Productions Premium License Agreement</b><br /></a>);
            }
      
            if((this.props.location.state.shoppingCart[item].description.search("License Tier: Exclusive") > 0) && !exclusiveFound) {
                exclusiveFound = true;
                licenseItems.push(<a key="Exclusive License" href={ExclusiveLicense}><b>Off Ki Productions Exclusive License Agreement</b><br /></a>);
            }
      
            subTotal += parseInt(this.props.location.state.shoppingCart[item].unit_amount.value, 10) * parseInt(this.props.location.state.shoppingCart[item].quantity, 10);
          
            numItems += 1;
        }

        totalCost = subTotal + (subTotal * (taxPercentage / 100));
        totalCost = totalCost.toFixed(2);
        subTotal = subTotal.toFixed(2);

        return (
            <div className="payment-confirmation-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Link to="/"><h2><span className="fa fa-angle-double-left"></span> RETURN HOME</h2></Link>
                            <div className="space-bottom"></div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="page-title">Success!</h1>
                            <div className="separator-2"></div>
                        </div>
                        <div className="col-12">
                            <p>{this.props.location.state.firstName.value}, thank you for your purchase!<br /><br />Please see below for a confirmation of each item you have now succesfully purchased.  Also below is your unique order information which we advise that you keep for your records.  You should receive an email shortly at {this.props.location.state.email.value} with a Google Drive link to download your purchased items.  If you experience any issues, or have any questions whatsover, please feel free to contact us at <a href="mailto:offki@offkiproductions.com">offki@offkiproductions.com</a></p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="page-title">Order Confirmation</h1>
                            <div className="separator-2"></div>
                        </div>
                        <div className="col-12">
                            <p>Order ID: {this.props.location.state.orderID}<br />Order Date: {this.createDate()}<br />{licenseItems}</p>
                        </div>
                        <table className="table cart">
                            <thead>
                            <tr>
                                <th>Product </th>
                                <th>Price </th>
                                <th>Quantity</th>
                                <th className="amount">Total </th>
                            </tr>
                            </thead>
                            <tbody>
                            {purchaseItems}
                            <tr>
                                <td className="total-quantity" colSpan="3">Subtotal</td>
                                <td className="amount">{"$" + totalCost}</td>
                            </tr>
                            <tr>                    
                                <td className="total-quantity" colSpan="2">Taxes</td>
                                <td className="price">{taxPercentage + "%"}</td>
                                <td className="amount">{"$" + (totalCost * (taxPercentage / 100)).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td className="total-quantity" colSpan="3">Total {numItems} Item(s)</td>
                                <td className="total-amount">{"$" + totalCost}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
