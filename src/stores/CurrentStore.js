import alt from '../alt';
import Actions from '../actions';
import CurrentSource from '../sources/CurrentSource';
import {decorate, bind, datasource} from 'alt/utils/decorators';
import _ from 'lodash';

@datasource(CurrentSource)
@decorate(alt)
class CurrentStore {
  constructor() {
    this.state = {city: 'newyork', current: null};
  }

  @bind(Actions.citySelected)
  citySelected(city) {
    this.setState({
      city
    });
  }

  @bind(Actions.currentReceived)
  receivedCurrent(current) {
      this.setState({
        current
      })
  }

  @bind(Actions.current)
  current(city) {
    this.setState({city});
  }
}

export default alt.createStore(CurrentStore);
