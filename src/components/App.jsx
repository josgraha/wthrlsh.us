import React from 'react';
import mui from 'material-ui';
import PanelDashboard from './PanelDashboard.jsx';

let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const {
    Toolbar,
    ToolbarGroup,
    ToolbarTitle,
    FontIcon,
    DropDownMenu,
    MenuItem,
    Mixins,
    Styles,
} = mui;

const {StylePropable, StyleResizable} = Mixins;
let ThemeManager = Styles.ThemeManager;
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
            <div>
                <Toolbar>
                    <ToolbarGroup firstChild={true} float={"left"}>
                        <ToolbarTitle text={"City"} />
                        <FontIcon className="muidocs-icon-edit-location" />
                        <DropDownMenu value={2}>
                            <MenuItem value={1} primaryText="Chicago" />
                            <MenuItem value={2} primaryText="New York" />
                            <MenuItem value={3} primaryText="San Francisco" />
                        </DropDownMenu>
                    </ToolbarGroup>
                </Toolbar>
                <PanelDashboard city="newyork" />
            </div>
        );
    }
}

export default App;
