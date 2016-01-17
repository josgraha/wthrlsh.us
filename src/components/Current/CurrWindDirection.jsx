import React from 'react';
import mui from 'material-ui';
import ActionRoom from 'material-ui/lib/svg-icons/action/room';
import _ from 'lodash';

const {
  Card,
  CardMedia,
  CardTitle,
  CardText
  } = mui;

class CurrentWindDirection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windBearing: props.val.windBearing,
      windSpeed: props.val.windSpeed
    };
  }

  rotateClassFor(windBearing) {
    return 'tx-rotate-lrg-' + windBearing;
  }

  render() {
    let propsVal = this.props.val;
    let wxCurrIconClass = 'wx-gauge-icon-lrg ' +
        'wx-gauge-icon-wind-dir ' +
        'icon-weather-compass-north ' +
        this.rotateClassFor(propsVal.windBearing);
    return (
      <Card className="wx-gauge" style={{
                    flexGrow: 1
                  }}>
        <CardMedia className="wx-gauge-media-header"
          overlay={<CardTitle title="Wind" />}>
          <img src="http://lorempixel.com/144/80/nature/"/>
        </CardMedia>
        <CardText className="wx-gauge-label" style={{padding: '8px 16px 8px 16px'}}>{propsVal.windBearing}° / {propsVal.windSpeed} mph</CardText>
        <div className="wx-gauge-lrg">
          <div className={wxCurrIconClass}></div>
        </div>
      </Card>
    );
  }
}
export default CurrentWindDirection;
