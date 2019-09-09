// BeatStore.component.js

import React, { Component } from 'react';
import AudioShop from './Audio Shop/AudioFileShop.js'

export default class BeatStore extends Component {
  render() {
    return (
      <section id="rapbeats" className="rap-trap-section section text-center">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="section-title">Beat Store</h2>
          	  <AudioShop />
            </div>
          </div>
        </div>
      </section>
    )
  }
}
