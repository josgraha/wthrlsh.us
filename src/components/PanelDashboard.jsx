import React from 'react';
import CurrentPanel from './Current/CurrentPanel.jsx';

class PanelDashboard extends React.Component {
    constructor(props) {
        super();
        this.state = {
            city: props.city || 'sanfrancisco'
        }
    }

    render() {
        return (
            <div style={{
              display: 'flex',
              flexFlow: 'row wrap',
              maxWidth: 1200,
              width: '100%'
            }}>
                <CurrentPanel city={this.state.city} />
            </div>
        );
    }
}

export default PanelDashboard;
