// AudioFileShop.component.js

import React, { PureComponent } from 'react';
const wavesurfer = require("wavesurfer");
const debounce = require('debounce');

import WaveformBackground from '../../../assets/images/WaveformBackground.png'

// Custom Styles
import '../../../assets/css/audio-file-shop.css';

export default class Waveform extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSeek = this.handleSeek.bind(this);
    this.handleNextSong = this.handleNextSong.bind(this);
    this.handleCurrentTimeChange = this.handleCurrentTimeChange.bind(this);
    this.resizeWaveform = this.resizeWaveform.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.handleLoadingProgress = this.handleLoadingProgress.bind(this);

    this.state = {
      loaded: false,
      waveform: null,
      previousState: "paused",
      previousSongLocation: "",
      previousVolume: 100,
      togglePlayPauseStyle: "",
      preResizeProgress: null,
      totalOffsetLeft: 0,
      waveformOffsetWidth: 0,
      previousWindowWidth: window.innerWidth
    };


    this.debouncedMouseMove = debounce(this.mouseMove, 5);
    this.debouncedResizeWaveform = debounce(this.resizeWaveform, 200);
    this.debouncedHandleCurrentTimeChange = debounce(this.handleCurrentTimeChange, 10);
  }

  componentDidMount() {
    var wavesurf = wavesurfer.create({
      container: '#waveform',
      waveColor: 'rgba(68, 0, 153, 0.6)',
      progressColor: '#ad1aac',
      backend: 'MediaElement',
      barWidth: 0,
      cursorWidth: 0,
      height: 100,
      interact: false,
      isLoaded: false
    });

    this.setState({waveform: wavesurf, loaded: true});

    wavesurfer.on('seek', this.handleSeek);
    wavesurfer.on('audioprocess', this.debouncedHandleCurrentTimeChange);
    wavesurfer.on('finish', this.handleNextSong);
    wavesurfer.on('loading', this.handleLoadingProgress);

    // This adds the responsive nature to the waveform.
    window.addEventListener('resize', this.debouncedResizeWaveform);
  }

  componentWillUnmount() {
    wavesurfer.unAll();
    window.removeEventListener('resize', this.debouncedResizeWaveform);
    this.debouncedMouseMove.clear();
    this.debouncedResizeWaveform.clear();
    this.debouncedHandleCurrentTimeChange.clear();
    document.removeEventListener('mousemove', this.debouncedMouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
  }

  componentDidUpdate() {
    // Each time the song location has updated
    if(this.props.songLocation !== this.state.previousSongLocation) {
      this.debouncedMouseMove.clear();
      this.debouncedResizeWaveform.clear();
      this.debouncedHandleCurrentTimeChange.clear();
      this.state.waveform.pause();
      this.state.waveform.load(this.props.songLocation);
      this.setState({previousSongLocation: this.props.songLocation, previousState: "paused"});
    }

    if((this.state.previousVolume !== this.props.volume) && this.state.isLoaded) {
      this.state.waveform.setVolume(this.props.volume / 100);
      this.setState({previousVolume: this.props.volume});
    }

    this.playPauseStopLogic()
  }

  handleLoadingProgress(progress, e) {
    this.setState({isLoaded: false});
    if (progress === 100) {
      this.setState({isLoaded: true});
    }
  }

  mouseDown(e) {
    let totalOffsetLeft = e.currentTarget.offsetLeft;
    let targetParent = e.currentTarget.offsetParent;
    while (targetParent) {
      totalOffsetLeft += targetParent.offsetLeft;
      targetParent = targetParent.offsetParent;
    }

    // Once the total offset is known.  Take the X position of the click.  Subtract the offset.  Divide the X value within the target by the widgth of the target.
    let percentage = (e.clientX - totalOffsetLeft) / e.currentTarget.offsetWidth;
    
    if (this.state.isLoaded) {
      // Clear any yet-to-execute debounce events.
      this.debouncedMouseMove.clear();
      this.debouncedResizeWaveform.clear();
      this.debouncedHandleCurrentTimeChange.clear();
      
      this.state.waveform.seekTo(percentage);
      this.setState({totalOffsetLeft: totalOffsetLeft, waveformOffsetWidth: e.currentTarget.offsetWidth});
    }

    document.addEventListener('mousemove', this.debouncedMouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  }

  mouseMove(e) {
    // Once the total offset is known.  Take the X position of the click.  Subtract the offset.  Divide the X value within the target by the widgth of the target.
    let percentage = (e.clientX - this.state.totalOffsetLeft) / this.state.waveformOffsetWidth;
    if (percentage > 1)
      percentage = 1;
    else if (percentage < 0)
      percentage = 0;

    if (this.state.isLoaded) {
      // Clear any yet-to-execute debounce events.
      this.debouncedResizeWaveform.clear();
      this.debouncedHandleCurrentTimeChange.clear();

      this.state.waveform.seekTo(percentage);
    }
  }

  mouseUp(e) {
    document.removeEventListener('mousemove', this.debouncedMouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
  }

  resizeWaveform() {
    if (this.state.isLoaded) {
      // Clear any yet-to-execute debounce events.
      this.debouncedMouseMove.clear();
      this.debouncedResizeWaveform.clear();
      this.debouncedHandleCurrentTimeChange.clear();

      // Store previous progress
      this.setState({preResizeProgress: this.state.waveform.getCurrentTime() / this.state.waveform.getDuration()})

      // Each time the windows width resizes, empty the canvas then redraw it.  Only on width changes.
      if (this.state.previousWindowWidth !== window.innerWidth) {
        this.state.waveform.empty();
        this.state.waveform.drawBuffer();
        
        this.setState({previousWindowWidth: window.innerWidth});
      }
    }
  }

  handleSeek(progress) {
    // Clear any yet-to-execute debounce events.
    this.debouncedMouseMove.clear();
    this.debouncedResizeWaveform.clear();
    this.debouncedHandleCurrentTimeChange.clear();

    // On Seek - Pass up progress - Float from 0 to 1
    if (this.state.isLoaded) {
      this.props.handleSeek(progress);
    }
  }

  handleNextSong() {
    // Every time a song finishes, progress to the next song
    this.props.handleNextSong();
  }

  handleCurrentTimeChange() {
    // Clear any yet-to-execute debounce events. - Except for the handleCurrentTimeChange one, because that's already reset by entering this function.
    this.debouncedMouseMove.clear();
    this.debouncedResizeWaveform.clear();

    // If we just got resized:
    if(this.state.preResizeProgress && this.state.isLoaded) {
      this.state.waveform.seekTo(this.state.preResizeProgress);

      if(this.props.playerState === "playing") {
        this.state.waveform.play();
      }
      this.setState({preResizeProgress: null});
    }

    // Every time the current time of the song changes, pass up the value
    if(this.state.isLoaded) {
      var duration = this.state.waveform.getDuration();
      var time = this.state.waveform.getCurrentTime();
      this.props.handleCurrentTimeChange(time);
      this.props.handleDurationChange(duration);
    }
  }

  playPauseStopLogic() {
    if (this.state.previousState !== this.props.playerState) {
      // Clear any yet-to-execute debounce events.
      this.debouncedMouseMove.clear();
      this.debouncedResizeWaveform.clear();
      this.debouncedHandleCurrentTimeChange.clear();

      switch(this.props.playerState) {
        case "playing":
          if(this.state.isLoaded) {
            this.state.waveform.play();
            this.setState({previousState: "playing", togglePlayPauseStyle: "waveform-playing"});
          }
          break;
        case "paused":
          if(this.state.isLoaded) {
            this.state.waveform.pause();
            this.setState({previousState: "paused", togglePlayPauseStyle: ""});
          }
          break;
        default:
          // do nothing
          break;
      }
    }
  }

  render() {
    var waveformBackgroundStyle = {
      backgroundImage: 'url(' + WaveformBackground + ')',
      backgroundSize: '100% 100%',
      backgroundPosition: "left center",
      backgroundRepeat: 'no-repeat'
    }

    return (
      <div className={"waveform-wrapper " + this.state.togglePlayPauseStyle} style={waveformBackgroundStyle}>
        <div id="waveform" onMouseDown={this.mouseDown}></div>
      </div>
    )
  }
}
