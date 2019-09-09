// CustomMusic.component.js

import React, { Component } from 'react';

export default class CustomMusic extends Component {
  render() {
    return (
      <section id="custommusic" className="custommusic-section section text-center">
        <div className="container">
          <h2 className="section-title">You Type Beats!</h2>
          <div className="section-intro ml-auto mr-auto">
            <p>
              <span className='custommusicsubtitle'><b>Craft</b> Your Sound!</span><br /><br />We specialize in making <b>YOU</b> Type Beats that are designed with <b>YOU</b> in mind!  Just fill out the questionnaire below with the direction for the track and we will create a custom beat based on your specifications.
            </p>
          </div>
          <br/>
          <div className="row justify-content-center">
            <div className="col-md-4 col-sm-12 mb-4 mb-sm-0">
              <table className="table table-vertical-align table-striped">
                <thead className="thead-light">
                  <tr>
                    <th colSpan="2">
                      <h4>Basic</h4>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Cost</th>
                    <td className="text-center noWordWrap">
                      $75
                    </td>
                  </tr>
                  <tr>
                    <th># Of Revisions</th>
                    <td className="text-center noWordWrap">
                      2
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="2"><i>**All Other licence terms are identical to those listed below.</i></th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-4 col-sm-12 mb-4 mb-sm-0">
              <table className="table table-vertical-align table-striped">
                <thead className="thead-light">
                  <tr>
                    <th colSpan="2">
                      <h4>Premium</h4>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Cost</th>
                    <td className="text-center noWordWrap">
                      $100
                    </td>
                  </tr>
                  <tr>
                    <th># Of Revisions</th>
                    <td className="text-center noWordWrap">
                      2
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="2"><i>**All Other licence terms are identical to those listed below.</i></th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-4 col-sm-12">
              <table className="table table-vertical-align table-striped">
                <thead className="thead-light">
                  <tr>
                    <th colSpan="2">
                      <h4>Exclusive</h4>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Cost</th>
                    <td className="text-center noWordWrap">
                      Make an Offer!
                    </td>
                  </tr>
                  <tr>
                    <th># Of Revisions</th>
                    <td className="text-center noWordWrap">
                      5
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="2"><i>**All Other licence terms are identical to those listed below.</i></th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <div className="music-action">
            <a className="btn btn-ghost-primary" href="https://docs.google.com/forms/d/e/1FAIpQLSeFgjfPJxc0U---jvlEybGNE_1Q4MmDbcj5-YDXnCkiEYBurg/viewform?vc=0&c=0&w=1" target="_blank">Buy Custom Music</a>
          </div>
        </div>
      </section>
    )
  }
}
