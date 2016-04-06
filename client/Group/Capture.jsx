import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Camera from './Capture/Camera';
import Photo from './Capture/Photo';
import styles from './Capture/styles';
const { string } = React.PropTypes;


class Capture extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPhoto: '',
      constraints: { audio: false, video: { width: 400, height: 300 } }
    };

    this.clearPhoto = this.clearPhoto.bind(this);
    this.establishSocket = this.establishSocket.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.savePhoto = this.savePhoto.bind(this);
    this.takePicture = this.takePicture.bind(this);
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

    this.establishSocket();

    this.clearPhoto();
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

  establishSocket() {
    const wsuri = 'ws://localhost:4028/sockets/groupConnect';

    const sock = new WebSocket(wsuri);
    sock.onmessage = (msg) => {
      if (msg.data === 'start') {
        this.state.newPhoto = '';
      } else if (msg.data) {
        this.state.newPhoto += msg.data;
      } else if (msg.data === 'end') {
        const photo = document.getElementById('photo');
        photo.setAttribute('src', this.state.newPhoto);
      }
    };
    sock.onopen = () => {
      this.state.sock = sock;
    };
  }

  handleSaveClick(event) {
    event.preventDefault();
    this.savePhoto();
  }

  handleStartClick(event) {
    event.preventDefault();
    this.takePicture();
  }

  savePhoto() {
    const photo = document.getElementById('photo').src;
    const groupName = this.props.groupName;
    console.log(groupName);
    axios.post(`/api/group/postPhoto/${groupName}`, { photo })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  takePicture() {
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');
    const video = document.querySelector('video');
    const photo = document.getElementById('photo');
    const { width, height } = this.state.constraints.video;

    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

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
          style={ styles.picSize }
          hidden
        ></canvas>
        <Photo handleSaveClick={ this.handleSaveClick } />
      </div>
    );
  }
}
Capture.propTypes = {
  groupName: string
};


const mapStateToProps = (state) => ({ groupName: state.get('groupName') });

export default connect(mapStateToProps)(Capture);
