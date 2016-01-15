import React from 'react';
import mui from 'material-ui';
import MapsEditLocationIcon from 'material-ui/lib/svg-icons/maps/edit-location';
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

const {StylePropable, StyleResizable} = Mixins;
let ThemeManager = Styles.ThemeManager;
let DarkRawTheme = Styles.lightBaseTheme;

let cityMap = {
  'austin': 'Austin',
  'baltimore': 'Baltimore',
  'boston': 'Boston',
  'charlotte': 'Charlotte',
  'chicago': 'Chicago',
  'columbus': 'Columbus',
  'dallas': 'Dallas',
  'denver': 'Denver',
  'elpaso': 'El Paso',
  'houston': 'Houston',
  'indianapolis': 'Indianapolis',
  'jacksonville': 'Jacksonville',
  'lasvegas': 'Las Vegas',
  'losangeles': 'Los Angeles',
  'memphis': 'Memphis',
  'milwaukee': 'Milwaukee',
  'newyork': 'New York',
  'oklahomacity': 'Oklahoma City',
  'philadelphia': 'Philadelphia',
  'phoenix': 'Phoenix',
  'portland': 'Portland',
  'sanantonio': 'San Antonio',
  'sandiego': 'San Diego',
  'sanfrancisco': 'San Francisco',
  'sanjose': 'San Jose',
  'seattle': 'Seattle',
  'tucson': 'Tucson',
  'washington': 'Washington'
};

@connectToStores
class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.state = {
      muiTheme: context.muiTheme ? context.muiTheme : ThemeManager.getMuiTheme(DarkRawTheme),
      isThemeDark: false,
      dialogOpen: false,
      leftNavOpen: false
    };

  }

  onChange(evt, selected) {
    console.log('onChange: selected: ' + selected);
    if (!selected || selected == CurrentStore.getState()['city']) {
      return;
    }
    console.log('CurrentStore: city: ' + CurrentStore.getState()['city']);
    let state = {city: selected};
    this.setState(state);
    CurrentStore.state = state;
    CurrentStore.getCurrent();
  }

  onItemTouchTap(item) {
    console.log('onItemTouchTap: item: ', item);
  }

  cityName(key) {
    return cityMap[key];
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
    console.log('componentWllReceiveProps: nextProps: ', nextProps);
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
    let cityName = this.cityName(cityKey);
    let onItemTouchTap = this.onItemTouchTap;
    var cityNodes = _(cityMap).keys()
          .map((k) => {
            let cityName = cityMap[k];
            return (
            <MenuItem
              onItemTouchTap={onItemTouchTap}
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
          iconElementRight={<ToolbarTitle text="Wthrlsh.us" />}
        />
        <PanelDashboard city="newyork"/>
      </div>
    );
  }
}

export default App;
