import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
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
            <div className="container">
            <Grid>
                <Row>
                    <Col xs={12}><CurrentPanel city={this.state.city} /></Col>
                </Row>
            </Grid>
            </div>
        );
    }
}

export default PanelDashboard;
