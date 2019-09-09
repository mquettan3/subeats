// Navbar.component.js

import React, { Component } from 'react';
import $ from 'jquery';
require('jquery.scrollto');

export default class Navbar extends Component {
  componentDidMount(){
    /* ======= Scrollspy ======= */
    $('body').scrollspy({ target: '#header', offset: 51});

    /* ======= ScrollTo ======= */
    $('a.scrollto').on('click', function(e){
      //store hash
      var target = this.hash;

      e.preventDefault();

  		$('body').scrollTo(target, 800, {offset: -50, 'axis':'y'});

      //Collapse mobile menu after clicking
  		if ($('.navbar-collapse').hasClass('show')){
  			$('.navbar-collapse').removeClass('show');
  		}

  	});

    /* ======= Fixed Header animation ======= */

    $(window).on('scroll load', function() {

         if ($(window).scrollTop() > 0 ) {
             $('#header').addClass('header-scrolled');
         }
         else {
             $('#header').removeClass('header-scrolled');
         }
    });
  }

  render() {
    return (
      <header id="header" className="header fixed-top">
        <nav className="main-nav navbar navbar-expand-md" role="navigation">
          <button className="navbar-toggler navbar-dark " type="button" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="toggle-title">Menu</span>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbar-collapse" className="navbar-collapse collapse text-center justify-content-center">
            <ul className="nav navbar-nav">
              <li className="nav-item"><a className="active nav-link scrollto" href="#promo">Home</a></li>
              <li className="nav-item"><a className="nav-link scrollto" href="#rapbeats">Beat Store</a></li>
              <li className="nav-item"><a className="nav-link scrollto" href="#exclusive">Exclusive Rights</a></li>
              <li className="nav-item"><a className="nav-link scrollto" href="#custommusic">You Type Beats!</a></li>
              <li className="nav-item"><a className="nav-link scrollto" href="#license">License Terms</a></li>
              <li className="nav-item"><a className="nav-link scrollto" href="#about">Vision</a></li>
              <li className="nav-item"><a className="nav-link scrollto" href="#contact">Contact</a></li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}
