import React from 'react';
import mui from 'material-ui';
import _ from 'lodash';

const {
  Card,
  CardMedia,
  CardTitle,
  CardText
  } = mui;

let conditionsIconMap = {
  'clear-day': 'clear',
  'clear-night': 'clear-night',
  'rain': 'showers',
  'snow': 'snow',
  'sleet': 'showers-scattered',
  'wind': 'severe-alert',
  'fog': 'showers-scattered',
  'cloudy': 'overcast',
  'partly-cloudy-day': 'few-clouds',
  'partly-cloudy-night': 'few-clouds-night',
  'hail': 'storm',
  'thunderstorm': 'storm',
  'tornado': 'severe-alert'
};

class CurrentCondition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: props.val
    };
  }

  weatherIcon(icon) {
    let iconSuffix = this.iconFor(icon);
    return `icon-weather-${iconSuffix}-lrg`;
  }

  iconFor(icon) {
    return conditionsIconMap[icon];
  }

  toDesc(icon) {
    icon = icon || '';
    return icon.split('-').map(_.capitalize).join(' ');
  }

  render() {
    let wxCurrIconClass = 'wx-gauge-icon-lrg ' + this.weatherIcon(this.props.val);
    let description = this.toDesc(this.props.val);
    return (
      <Card className="wx-gauge" style={{
                flexGrow: 1
              }}>
        <CardMedia className="wx-gauge-media-header"
          overlay={<CardTitle title="Conditions" />}>
          <img src="http://lorempixel.com/144/80/abstract/"/>
        </CardMedia>
        <CardText>{description}</CardText>
        <div className="wx-curr-condition">
          <div className={wxCurrIconClass}></div>
        </div>
      </Card>
    );
  }
}
export default CurrentCondition;
