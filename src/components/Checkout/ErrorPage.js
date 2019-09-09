// PaymentConfirmation.component.js

import React, { Component } from 'react';
import { Link } from "react-router-dom";

// Custom Styles
import '../../assets/css/checkout-page.css';

export default class ErrorPage extends Component {
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

        let errorMessage = "";

        if (this.props.location.state) {
            if (this.props.location.state.isPayPal) {
                errorMessage = <p>{this.props.location.state.firstName.value}, unfortunately, something went WRONG during your purchase!<br /><br />If you are seeing this error it's because PayPal did not properly process your payment.  You should NOT have been charged.  Please try your purchase again later.  If your issue persists, (or if you just want some peace of mind) please contact us at <a href="mailto:offki@offkiproductions.com">offki@offkiproductions.com</a><br /><br />Below is the error message that we received from PayPal.  Please include this in your email to us so that we can help resolve this issue quickly:<br />{this.props.location.errorMessage}</p>;
            } else {
                errorMessage = <p>An error occured on the Off Ki Productions web server while processing your order.  The following error message should describe the issue:<br /><br /><div className="error-message">{this.props.location.state.errorMessage}</div><br />Please contact us at <a href="mailto:offki@offkiproductions.com">offki@offkiproductions.com</a> if you were charged by PayPal in order to assure you receive your purchase.</p>;
            }
        } else {
            errorMessage = <p>404 Page Not Found</p>;
        }
        
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
                            <h1 className="page-title">ERROR!</h1>
                            <div className="separator-2"></div>
                        </div>
                        <div className="col-12">
                            {errorMessage}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
