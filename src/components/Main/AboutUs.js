// AboutUs.component.js
import React, { Component } from 'react';

import JoshPortrait from '../../assets/images/JoshPortraitCircle.png';
import DeshonPortrait from '../../assets/images/DeshonPortraitCircle.png';

export default class AboutUs extends Component {
  render() {
    return (
      <section id="about" className="about-section section text-center">
        <div className="container">
          <h2 className="section-title">Vision</h2>
          <div className="section-intro ml-auto mr-auto">We have always loved music! From playing live, producing for a podcast, and producing for an artist, we have stayed true to being dedicated to enhancing all mediums through music! Whether our clients need music for their podcast, song, movie, elevator, photo slideshow, etc. we bring positive and professional energy to the project and always provide a unique Off Ki Original track to fit our client's vision. In that spirit Off Ki Productions is dedicated to enhancing your craft!</div>
          <div className="members-block">
            <div className="row">
              <div className="item col-md-6 col-sm-12">
                <div className="item-inner">
                  <div className="member-profile">
                    <img className="img-fluid" src={JoshPortrait} alt="" />
                  </div>
                  <div className="member-label">Producer</div>
                  <h3 className="member-name">
                    Josh Stevenson
                  </h3>
                </div>
              </div>
              <div className="item col-md-6 col-sm-12">
                <div className="item-inner">
                  <div className="member-profile">
                    <img className="img-fluid" src={DeshonPortrait} alt="" />
                  </div>
                  <div className="member-label">Producer</div>
                  <h3 className="member-name">
                    Deshon Battle
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
