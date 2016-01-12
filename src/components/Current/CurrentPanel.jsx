import React from 'react';
import ActionRoom from 'material-ui/lib/svg-icons/action/room';
import {Grid, Row, Col} from 'react-bootstrap';
import Firebase from 'firebase';
import _ from 'lodash';

class CurrentPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currently: {
                apparentTemperature: 25.71,
                cloudCover: 0.01,
                dewPoint: 12.54,
                humidity: 0.4,
                icon: "clear-day",
                nearestStormBearing: 290,
                nearestStormDistance: 15,
                ozone: 336.13,
                precipIntensity: 0,
                precipProbability: 0,
                pressure: 1013.26,
                summary: "Clear",
                temperature: 34.49,
                time: 1452540354,
                visibility: 10,
                windBearing: 253,
                windSpeed: 12.51
            }
        };
        this.state.weatherIcon = this.weatherIcon(this.state.currently);
        this.state.rotateClass = this.rotateClassFor(this.state.currently);
        this.firebaseRef = new Firebase(`https://publicdata-weather.firebaseio.com/${this.props.city}/currently`);
        this.firebaseRef.on("value", (dataSnapshot)=> {
          this.setState({
              currently: dataSnapshot.val(),
              weatherIcon: this.weatherIcon(dataSnapshot.val()),
              rotateClass: this.rotateClassFor(dataSnapshot.val())
          });
        });
    }

    weatherIcon(currentlyObj) {
        let iconSuffix = this.iconFor(currentlyObj);
        return `icon-weather-${iconSuffix}-dims`;
    }

    iconFor(currentlyObj) {
        if (_.endsWith(currentlyObj.icon, '-day')) {
            let maxLen = currentlyObj.icon.length - currentlyObj.icon.indexOf('-day');
            return _.trunc(currentlyObj.icon, maxLen);
        }
        return currentlyObj.icon;
    }

    rotateClassFor(currentlyObj) {
        console.log('currentlyObj: ', currentlyObj);
        return 'tx-rotate-' + currentlyObj.windBearing;
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={6} sm={3}>
                        <i className={['weather-icon-med', this.weatherIcon(this.state.currently)]} />
                    </Col>
                    <Col xs={6} sm={3}>
                        <span>{this.state.currently.temperature}</span>
                    </Col>
                    <Col xs={6} sm={3}>
                        <i className={['weather-icon-med', 'icon-well-med', 'icon-weather-degree-f-dim']} />
                    </Col>
                    <Col xs={6} sm={3}><ActionRoom className={this.state.rotateClass} /></Col>
                </Row>
            </Grid>
        );
    }
}
export default CurrentPanel;