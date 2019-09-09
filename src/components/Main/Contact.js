// Contact.component.js
import React, { Component } from 'react';

export default class Contact extends Component {
  render() {
    return (
      <div id="contact" className="contact-section section text-center">
        <div className="container">
          <h2 className="section-title">Contact</h2>
          <div className="section-intro center-block">We are dedicated to Enhancing YOUR Craft! If you have any questions feel free to shoot us an email or message us on YouTube or Instagram.</div>
          <div className="contact-block mr-auto ml-auto">
            <div className="row">
              <div className="item col-12 col-lg-12">
                <div className="item-inner">
                  <div className="icon-holder">
                    <i className="fas fa-info-circle"></i>
                  </div>
                  <h4 className="title">General</h4>
                  <div className="email"><a href="mailto:offki@offkiproductions.com">offki@offkiproductions.com</a></div>
                </div>
              </div>
            </div>
          </div>
          <div className="social-media-block">
            <ul className="list-inline social-media-list">
              <li className="list-inline-item mr-3"><a href="https://www.youtube.com/channel/UCTpG4-OqB0WIYcHOp7N8IsA/videos"><i className="fab fa-youtube"></i></a></li>
              <li className="d-block d-sm-none"></li>
              <li className="list-inline-item mr-3"><a href="https://www.instagram.com/offkiprod/"><i className="fab fa-instagram"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
