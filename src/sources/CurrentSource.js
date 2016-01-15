import Actions from '../actions';
import Firebase from 'firebase';


let firebaseRef = null;

let ChannelSource = {
  getCurrent: {
    remote(state) {
      console.log('ChannelSource: remote: state: ', state);
      return new Promise((resolve, reject) => {
        if (firebaseRef) {
          firebaseRef.off();
        }
        firebaseRef = new Firebase(`https://publicdata-weather.firebaseio.com/${state.city}/currently`);
        firebaseRef.on("value", (dataSnapshot)=> {
          if (!dataSnapshot || !dataSnapshot.val()) {
            reject({error: 'no data'});
          }
          var currently = dataSnapshot.val();
          resolve(currently);
        });
      });
    },
    success: Actions.currentReceived,
    error: Actions.channelsFailed
  }
}

export default ChannelSource;
