import React from 'react';
import Panel from './Panel.jsx';

class PanelList extends React.Component {
    constructor(props) {
        super();
        this.state = {
            panels: [
                'cool 59 degrees F',
                '59, 33, 39 rain, 40 snow, 40 snow'
            ]
        }
    }

    render() {
        var panelNodes = this.state.panels.map((content) => {
            return (
                <Panel content={content} />
            );
        });
        return (
            <section>{panelNodes}</section>
        );
    }
}

export default PanelList;
