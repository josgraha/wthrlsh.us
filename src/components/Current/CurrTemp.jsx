import React from 'react';
import mui from 'material-ui';
import _ from 'lodash';

const {
  Card,
  CardMedia,
  CardTitle,
  CardText
  } = mui;

class CurrentTemp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: props.val.temperature,
      feelsLikeTemp: props.val.feelsLikeTemp
    };
  }

  render() {
    let propsVal = this.props.val;
    let feelsLikeTemp = Math.round(propsVal.feelsLikeTemp);
    let currentTemp = Math.round(propsVal.temperature);
    return (
      <Card className="wx-gauge" style={{
                        flexGrow: 1
                      }}>
        <CardMedia className="wx-gauge-media-header"
          overlay={<CardTitle title="Temp"/>} style={{textAlign: 'center'}}>
          <img src="http://lorempixel.com/144/80/city/"/>
        </CardMedia>
        <CardText>
          Feels like {feelsLikeTemp}°.
        </CardText>
        <div className={"wx-gauge-large"}>
          <div className="wx-curr-temp">{currentTemp}<sup>°F</sup></div>
        </div>
      </Card>
    );
  }
}
export default CurrentTemp;
