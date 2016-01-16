import alt from '../alt';
import Firebase from 'firebase';

class Actions {
  constructor() {
    this.generateActions(
      'citySelected',
      'currentReceived',
      'currentFailed'
    );
  }

  current(args) {
    return (dispatch) => {
      var firebaseRef = new Firebase(`https://publicdata-weather.firebaseio.com/${args.city}/currently`);
      firebaseRef.on("value", (dataSnapshot)=> {
        if (!dataSnapshot || !dataSnapshot.val()) {
          return;
        }
        dispatch(dataSnapshot);
      });
    }
  }
}

export default alt.createActions(Actions);
