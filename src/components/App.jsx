import React from 'react';
import mui from 'material-ui';
import MapsEditLocationIcon from 'material-ui/lib/svg-icons/maps/edit-location';
import AppConstants from '../utils/appconstants';
import PanelDashboard from './PanelDashboard.jsx';
import Actions from '../actions';
import connectToStores from 'alt/utils/connectToStores';
import CurrentStore from '../stores/CurrentStore';

let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const {
  AppBar,
  ToolbarTitle,
  IconMenu,
  IconButton,
  MenuItem,
  Mixins,
  Styles
  } = mui;

const {Cities} = AppConstants;
const {StylePropable, StyleResizable} = Mixins;
let {ThemeManager, lightBaseTheme} = Styles;
let DefaultTheme = lightBaseTheme;


@connectToStores
class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : ThemeManager.getMuiTheme(DefaultTheme),
      isThemeDark: false,
      dialogOpen: false,
      leftNavOpen: false
    };

  }

  onChange(evt, selected) {
    if (!selected || selected == CurrentStore.getState()['city']) {
      return;
    }
    let state = {city: selected};
    this.setState(state);
    CurrentStore.state = state;
    CurrentStore.getCurrent();
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  }

  componentDidMount(){
    this.state.city = this.props.city || 'newyork';
  }

  componentWillReceiveProps(nextProps, nextContext){
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});

    if(this.state.city != nextProps.city){
      this.state.city = nextProps.city;
      CurrentStore.getCurrent(this.state.city);
    }
  }

  static getStores() {
    return [CurrentStore];
  }

  static getPropsFromStores() {
    return CurrentStore.getState();
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  static mixins = [StylePropable, StyleResizable];

  render() {
    let cityKey = this.state.city;
    let cityName = Cities[cityKey];
    var cityNodes = _(Cities).keys()
          .map((k) => {
            let cityName = Cities[k];
            return (
            <MenuItem
              value={k}
              primaryText={cityName} />
            );
          })
          .value();
    return (
      <div>
        <AppBar
          title={cityName}
          iconElementLeft={
                        <IconMenu
                            onChange={this.onChange.bind(this)}
                            iconButtonElement={
                                <IconButton><MapsEditLocationIcon /></IconButton>
                            }
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                            >
                            {cityNodes}
                        </IconMenu>
                    }
          iconElementRight={<ToolbarTitle className="wx-app-title" text="Wthrlsh.us" style={{ fontSize: '2.5em' }} />}
        />
        <PanelDashboard city="newyork"/>
      </div>
    );
  }
}

export default App;
