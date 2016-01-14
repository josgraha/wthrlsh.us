import React from 'react';
import Card from 'material-ui/lib/card/card';
import ActionRoom from 'material-ui/lib/svg-icons/action/room';
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
        console.log('iconSuffix: ' +  iconSuffix);
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
        let wxCurrIconClass = 'wx-gauge-icon-med ' + this.weatherIcon(this.state.currently);
        return (
        <Card>
            <div style={{
                display: 'flex',
                flexFlow: 'row wrap',
                maxWidth: 1200,
                width: '100%'
            }}>
                <Card className={"wx-gauge"} style={{
                        flexGrow: 1
                      }}>
                    <div className={"wx-curr-condition"}>
                        <i className={wxCurrIconClass}></i>
                    </div>
                </Card>
                <Card className={"wx-gauge"} style={{
                        flexGrow: 1
                      }}>
                    <div className={"wx-curr-temp"}>
                        <span className="wx-gauge-large">{this.state.currently.temperature} <sup>°F</sup></span>
                    </div>
                </Card>
                <Card className={"wx-gauge"} style={{
                        flexGrow: 1
                      }}>
                    <div className={"wx-curr-wind-dir"}>
                        <span><ActionRoom className={this.state.rotateClass} /></span>
                    </div>
                </Card>
            </div>
        </Card>
        );
    }
}
export default CurrentPanel;