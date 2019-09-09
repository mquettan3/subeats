// Exclusive.component.js
import React, { Component } from 'react';

export default class Exclusive extends Component {
  render() {
    return (
      <section id="exclusive" className="exclusive-section section text-center">
        <div className="container">
          <h2 className="section-title">Exclusive Rights</h2>
          {/* <div className="section-intro ml-auto mr-auto">If you would like to purchase exclusive rights to any of the above songs.  Please click the link below to fill out a form describing your offer.</div>
           */}
          <div className="music-action">
            <a className="btn btn-ghost-primary" href="https://docs.google.com/forms/d/e/1FAIpQLSfK2M1bQxHPFzkcp7of3kOay675brHmSvrzTYGyzxyhW584FA/viewform?usp=pp_url" target="_blank">Click Here to Make an Offer for Exclusive Rights to a Song!</a>
          </div>
        </div>
      </section>
    )
  }
}
