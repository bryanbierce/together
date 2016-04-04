import React from 'react';
import Camera from './Capture/Camera';
import Photo from './Capture/Photo';

const styles = {
  capture: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
};

class Capture extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      constraints: { audio: false, video: { width: 400, height: 300 } }
    };
    this.handleStartClick = this.handleStartClick.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.clearPhoto = this.clearPhoto.bind(this);
  }

  componentDidMount() {
    const constraints = this.state.constraints;
    const getUserMedia = (params) => (
      new Promise((successCallback, errorCallback) => {
        navigator.webkitGetUserMedia.call(navigator, params, successCallback, errorCallback);
      })
    );

    getUserMedia(constraints)
    .then((stream) => {
      const video = document.querySelector('video');
      const vendorURL = window.URL || window.webkitURL;

      video.src = vendorURL.createObjectURL(stream);
      video.play();
    })
    .catch((err) => {
      console.log(err);
    });

    this.clearPhoto();
  }

  handleStartClick(event) {
    event.preventDefault();
    this.takePicture();
  }

  takePicture() {
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');
    const video = document.querySelector('video');
    const photo = document.getElementById('photo');
    const { width, height } = this.state.constraints.video;

    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      const data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    } else {
      this.clearPhoto();
    }
  }

  clearPhoto() {
    const canvas = document.querySelector('canvas');
    const photo = document.getElementById('photo');
    const context = canvas.getContext('2d');
    const { width, height } = this.state.constraints.video;
    context.fillStyle = '#FFF';
    context.fillRect(0, 0, width, height);

    const data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  render() {
    return (
      <div className="capture"
        style={ styles.capture }
      >
        <Camera
          handleStartClick={ this.handleStartClick }
        />
        <canvas id="canvas"
          style={{ width: 400, height: 300 }}
          hidden
        ></canvas>
        <Photo />
      </div>
    );
  }
}


export default Capture;
