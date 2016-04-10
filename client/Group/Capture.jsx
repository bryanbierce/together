import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Camera from './Capture/Camera';
import Photo from './Capture/Photo';
import LinkButton from './Capture/LinkButton';
import Dashboard from './Capture/Dashboard.jsx';
import actions from '../actions';
import styles from './Capture/styles';
const { string, func, bool } = React.PropTypes;


class Capture extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPhoto: '',
      constraints: { audio: false, video: { width: 400, height: 300 } }
    };

    this.clearPhoto = this.clearPhoto.bind(this);
    this.downloadFinal = this.downloadFinal.bind(this);
    this.establishSocket = this.establishSocket.bind(this);
    this.getLink = this.getLink.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleSubmitFinal = this.handleSubmitFinal.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.savePhoto = this.savePhoto.bind(this);
    this.submitFinal = this.submitFinal.bind(this);
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

  downloadFinal() {
    window.open(this.props.finalPhoto, '_blank');
  }

  establishSocket() {
    const wsuri = 'wss://photo-together.herokuapp.com/sockets/groupConnect';

    const sock = new WebSocket(wsuri);
    sock.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      const photo = data.new_val !== undefined ? data.new_val : data;
      this.props.addPhoto(photo);
    };
    sock.onopen = () => {
      this.state.sock = sock;
      sock.send(this.props.groupName);
    };
  }

  getLink() {
    const link = document.getElementById('roomLink');
    const range = document.createRange();
    range.selectNodeContents(link);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
  }

  handleSaveClick(event) {
    event.preventDefault();
    this.savePhoto();
  }

  handleSubmitFinal(event) {
    event.preventDefault();
    this.submitFinal();
  }

  handleStartClick(event) {
    event.preventDefault();
    this.takePicture();
  }

  savePhoto() {
    const photo = document.getElementById('photo').src;
    const groupName = this.props.groupName;
    const hashID = location.hash.split('?')[1];
    axios.post(`/api/group/postPhoto/${groupName}`, { photo, hashID })
    .catch((err) => {
      console.log(err);
    });
  }

  submitFinal() {
    const display = document.getElementById('display');

    html2canvas(display, {
      onrendered: (canvas) => {
        const result = canvas.toDataURL('image/png')
        // console.log(result.slice(0, 40));
        // const trimResult = result.replace(/^data:image\/png;base64,/, '');
        // const buffer = new Buffer(trimResult, 'base64');
        // const blob = new Blob([result]);
        // const blobURL = window.URL.createObjectURL(blob);
        // const png = PNG.sync.read(buffer);
        this.props.submitFinal(result);
      }
    }, { allowTaint: true });
  }

  takePicture() {
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');
    const photo = document.getElementById('photo');
    const video = document.querySelector('video');
    const { width, height } = this.state.constraints.video;

    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

    const data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  render() {
    return (
      <div id="captureColumn"
        style={ styles.simpleBoxColumn }
      >
        <div id="captureRow"
          style={ styles.captureRow }
        >
          <Photo handleSaveClick={ this.handleSaveClick } />
          <Camera
            handleStartClick={ this.handleStartClick }
          />
          <canvas id="canvas"
            style={ styles.picSize }
            hidden
          ></canvas>
          <LinkButton getLink={ this.getLink } />
        </div>
        <Dashboard
          downloadFinal={ this.downloadFinal }
          finalPhoto={ this.props.finalPhoto }
          groupName={ this.props.groupName }
          handleSubmitFinal={ this.handleSubmitFinal }
          isFinal={ this.props.isFinal }
        />
      </div>
    );
  }
}
Capture.propTypes = {
  addPhoto: func,
  finalPhoto: string,
  groupName: string,
  isFinal: bool,
  submitFinal: func
};


const mapDispatchToProps = (dispatch) => ({
  addPhoto: (photo) => dispatch(actions.addPhoto(photo)),
  submitFinal: (finalPhoto) => dispatch(actions.submitFinal(finalPhoto))
});

const mapStateToProps = (state) => ({
  finalPhoto: state.get('finalPhoto'),
  groupName: state.get('groupName'),
  isFinal: state.get('isFinal')
});

export default connect(mapStateToProps, mapDispatchToProps)(Capture);
