import React from 'react';
import mui from 'material-ui';
import PanelList from './PanelList.jsx';

let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const {
    AppBar,
    Mixins,
    Styles,
    } = mui;

const {StylePropable, StyleResizable} = Mixins;
let ThemeManager = Styles.ThemeManager;
//let DefaultRawTheme = Styles.lightBaseTheme;
let DarkRawTheme = Styles.darkBaseTheme;

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            muiTheme: context.muiTheme ? context.muiTheme : ThemeManager.getMuiTheme(DarkRawTheme),
            isThemeDark: true,
            dialogOpen: false,
            leftNavOpen: false
        };

    }

    static childContextTypes = {
        muiTheme: React.PropTypes.object
    };

    static mixins = [StylePropable, StyleResizable];

    getChildContext() {
        return {
            muiTheme: this.state.muiTheme
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
        this.setState({muiTheme: newMuiTheme});
    }

    render() {
        return (
            <section>
                <AppBar title="Weatherlicious"
                />
                <PanelList />
            </section>
        );
    }
}

export default App;
