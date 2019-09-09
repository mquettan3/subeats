// PayPalButton.component.js

import React, { Component } from 'react';

// Script Loader
import scriptLoader from 'react-async-script-loader';


class PayPalButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showbutton: false,
      isScriptLoaded: false,
      buttonRendered: false
    }
  }

  componentDidMount() {
      const {
        isScriptLoaded,
        isScriptLoadSucceed
      } = this.props;

      if (isScriptLoaded && isScriptLoadSucceed) {
        this.setState({ showButton: true, componentMounted: true });
      }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      isScriptLoaded,
      isScriptLoadSucceed,
    } = nextProps;

    const isLoadedButWasntLoadedBefore =
          !this.state.showButton &&
          !this.props.isScriptLoaded &&
          isScriptLoaded;

    if (isLoadedButWasntLoadedBefore) {
      if (isScriptLoadSucceed) {
        this.setState({ showButton: true });
      }
    }

    return true;
  }

  componentDidUpdate() {
    if (this.state.showButton && !this.state.buttonRendered) {
      const paypal = window.paypal;

      paypal.Buttons({
        createOrder: this.props.createOrder,
        onApprove: this.props.onApprove,
        onInit: this.props.onInit,
        onClick: this.props.onClick,
        onError: this.props.onError
      }).render("#paypal-button-container" + this.props.id);

      this.setState({buttonRendered: true});
    }
  }

  render() {
    if(!this.state.showButton)
      return(<div></div>)

    return(
      <div id={"paypal-button-container" + this.props.id}></div>
    )
  }
}

export default scriptLoader('https://www.paypal.com/sdk/js?client-id=AczEaQP7d-VqHIIsmMRe2wugcUqJiQrD27NucJNOEy_SDCkUXzRMJHpVqvABtyyYBAgJ_R3zyhj-KCwk')(PayPalButton)
