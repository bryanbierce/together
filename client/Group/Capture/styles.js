const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    border: '10px solid #ddd',
    backgroundColor: '#ccc'
  },
  button: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'cornflowerblue',
    color: '#fff',
    textAlign: 'center',
    textDecoration: 'none',
    margin: '5 0 0 0',
    height: '25px',
    boxShadow: '0px 0px 3px 1px rgba(0,0,0,0.5)',
    cursor: 'pointer'
  },
  buttonText: {
    alignSelf: 'center'
  },
  captureRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%'
  },
  capturePic: {
    alignSelf: 'center',
    width: 400,
    height: 300,
    boxShadow: '0px 0px 3px 1px rgba(0,0,0,0.5)'
  },
  dashboardBox: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    border: '5px solid #ddd',
    backgroundColor: '#ccc',
    height: 50
  },
  linkButton: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: 'cornflowerblue',
    margin: '15px',
    height: '50px',
    width: '50px',
    boxShadow: '0px 0px 3px 1px rgba(0,0,0,0.5)',
    cursor: 'pointer'
  },
  linkIcon: {
    alignSelf: 'center',
    color: '#fff'
  },
  linkButtonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: 1
  },
  simpleBoxRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  simpleBoxColumn: {
    display: 'flex',
    flexDirection: 'column',
    margin: 15
  }
};

export default styles;
