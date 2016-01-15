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
    console.log('windBearing: ' + windBearing);
    return 'tx-rotate-lrg-' + windBearing;
  }

  //componentWillReceiveProps(nextProps, nextContext) {
  //  console.log('componentWllReceiveProps: nextProps: ', nextProps);
  //  if (this.state.windBearing != nextProps.windBearing) {
  //    this.state.windBearing = nextProps.windBearing;
  //    this.state.windSpeed = nextProps.windSpeed;
  //  }
  //}

  render() {
    let propsVal = this.props.val;
    let rotateClass = this.rotateClassFor(propsVal.windBearing);
    return (
      <Card className="wx-gauge" style={{
                    flexGrow: 1
                  }}>
        <CardMedia
          overlay={<CardTitle title="Wind" />}>
          <img src="http://lorempixel.com/144/84/nature/"/>
        </CardMedia>
        <CardText>{propsVal.windBearing}° / {propsVal.windSpeed} mph</CardText>
        <div className="wx-gauge-icon-lrg wx-curr-wind-dir">
          <ActionRoom className={rotateClass}/>
        </div>
      </Card>
    );
  }
}
export default CurrentWindDirection;
