import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import axios from 'axios';
import Camera from './Capture/Camera';
import Photo from './Capture/Photo';
import CircleButton from './Capture/CircleButton';
import Dashboard from './Capture/Dashboard.jsx';
import { generateHash, methodBinder } from '../utils';
import actions from '../actions';
import '../styles/components/capture';
const { bool, func, object, string } = React.PropTypes;


class Capture extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPhoto: '',
      constraints: { audio: false, video: { width: 400, height: 300 } }
    };

    methodBinder.call(this);
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

    if (!this.props.userHash.length) {
      let userHash = window.localStorage.getItem('com.pt-userHash');
      if (!userHash) {
        userHash = generateHash();
      }
      this.props.setUserHash(userHash);
    }

    this.establishSocket();

    this.clearPhoto();
  }

  componentWillUnmount() {
    this.props.removeAuth();
    this.props.removeGroup();
    this.props.clearPhotos();
  }

  clearPhoto() {
    const canvas = document.querySelector('canvas');
    const photo = document.getElementById('photo');
    const context = canvas.getContext('2d');
    const { width, height } = this.state.constraints.video;
    context.fillStyle = '#2e3d49';
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

  goHome() {
    browserHistory.push('/');
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
    const userHash = this.props.userHash;
    axios.post(`/api/group/postPhoto/${groupName}`, { photo, userHash })
    .catch((err) => {
      console.log(err);
    });
  }

  submitFinal() {
    const display = document.getElementById('display');

    html2canvas(display, {
      onrendered: (canvas) => {
        const result = canvas.toDataURL('image/png');
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
      <div>
        <div id="groupTop">
          <CircleButton
            buttonId={ "homeButton" }
            clickAction={ this.goHome }
            linkIcon={ "fa fa-home fa-2x" }
          />
          <div id="captureColumn">
            <div id="captureRow">
              <Photo handleSaveClick={ this.handleSaveClick } />
              <Camera
                handleStartClick={ this.handleStartClick }
              />
              <canvas id="canvas"
                hidden
              ></canvas>
            </div>
            <Dashboard
              downloadFinal={ this.downloadFinal }
              finalPhoto={ this.props.finalPhoto }
              groupName={ this.props.groupName }
              handleSubmitFinal={ this.handleSubmitFinal }
              isFinal={ this.props.isFinal }
            />
          </div>
          <CircleButton
            buttonId={ "linkButton" }
            getLink={ this.getLink }
            linkIcon={ "fa fa-link fa-2x" }
          >
            <p id="roomLink"
              style={{ position: 'absolute', left: '-999em' }}
            >{ location.href.split('?')[0] }</p>
          </CircleButton>
        </div>
      </div>
    );
  }
}
Capture.propTypes = {
  addPhoto: func,
  clearPhotos: func,
  finalPhoto: string,
  groupName: string,
  history: object,
  isFinal: bool,
  removeAuth: func,
  removeGroup: func,
  submitFinal: func,
  setUserHash: func,
  userHash: string
};


const mapDispatchToProps = (dispatch) => ({
  addPhoto: (photo) => dispatch(actions.addPhoto(photo)),
  clearPhotos: () => dispatch(actions.clearPhotos()),
  submitFinal: (finalPhoto) => dispatch(actions.submitFinal(finalPhoto)),
  removeAuth: () => dispatch(actions.removeAuth()),
  removeGroup: () => dispatch(actions.removeGroup()),
  setUserHash: (userHash) => dispatch(actions.setUserHash(userHash))
});

const mapStateToProps = (state) => ({
  finalPhoto: state.get('finalPhoto'),
  groupName: state.get('groupName'),
  isFinal: state.get('isFinal'),
  userHash: state.get('userHash')
});

export default connect(mapStateToProps, mapDispatchToProps)(Capture);
