import React from 'react';
import mui from 'material-ui';
import ScheduleIcon from 'material-ui/lib/svg-icons/action/schedule';
import Firebase from 'firebase';
import _ from 'lodash';
import CurrentCondition from './CurrCondition.jsx';
import CurrentTemp from './CurrTemp.jsx';
import CurrentWindDirection from './CurrWindDirection.jsx';
import CurrDetails from './CurrDetails.jsx';
import Actions from '../../actions';
import connectToStores from 'alt/utils/connectToStores';
import CurrentStore from '../../stores/CurrentStore';

const {
  Card,
  CircularProgress,
  CardHeader,
  Avatar
  } = mui;

const colors = mui.Styles.Colors;

@connectToStores
class CurrentPanel extends React.Component {
  constructor(props) {
    super(props);
    CurrentStore.getCurrent();
    this.state = {
      city: props.city,
      current: props.current
    };
  }

  static getStores() {
    return [CurrentStore];
  }

  static getPropsFromStores() {
    return CurrentStore.getState();
  }

  render() {
    if (!this.props.current) {
      return (
        <Card style={{marginTop: '20px',
                      flexFlow: 'row wrap',
                      maxWidth: 1200,
                      width: '100%'}}>
          <CircularProgress mode="indeterminate"
                            style={{
                            flexGrow: 1,
                            paddingTop: '20px',
                            paddingBottom: '20px',
                            margin: '0 auto',
                            display: 'block',
                            width: '120px'
                            }}
          />

        </Card>
      );
    }
    var current = this.props.current || {};
    let summary = current.summary;
    let feelsLike = Math.round(current.apparentTemperature);
    let windSpeed = current.windSpeed;
    let subtitle = `${summary}, feels like ${feelsLike} °F, wind at ${windSpeed} mph.`;
    return (
      <Card style={{marginTop: '20px'}}>
        <CardHeader
          title="Current Conditions"
          subtitle={subtitle}
          avatar={<Avatar icon={<ScheduleIcon />} />}
          />
        <div style={{
                display: 'flex',
                flexFlow: 'row wrap',
                maxWidth: 1200,
                width: '100%'
            }}>
          <CurrentCondition val={current.icon} />
          <CurrentWindDirection val={{windBearing: current.windBearing,
                                    windSpeed: current.windSpeed}} />
          <CurrentTemp val={{temperature: current.temperature,
                                    feelsLikeTemp: current.apparentTemperature
                                    }} />
          <CurrDetails current={current} />
        </div>
      </Card>
    );
  }
}
export default CurrentPanel;
