import React, { Component } from 'react';
import Navbar from './Navbar.js';
import Promo from './Promo.js';
import BeatStore from './BeatStore.js';
import Exclusive from './Exclusive.js';
import CustomMusic from './CustomMusic.js';
import LicenseTerms from './LicenseTerms.js';
import AboutUs from './AboutUs.js';
import Contact from './Contact.js';
import Footer from './Footer.js';

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <Navbar />
        <Promo />
        <BeatStore />
        <Exclusive />
        <CustomMusic />
        <LicenseTerms />
        <AboutUs />
        <Contact />
        <Footer />
      </div>
    );
  }
}

export default Main;
