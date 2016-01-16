import React from 'react';
import mui from 'material-ui';
import moment from 'moment';
import _ from 'lodash';


const {
  Card,
  CardText,
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn
  } = mui;

class CurrentDetails extends React.Component {
  constructor(props) {
    super(props);
    // State
    this.state = {
      fixedHeader: false,
      fixedFooter: false,
      stripedRows: true,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true
    };
  }

  render() {
    let curr = this.props.current || {};
    let format = (val) => {
      let formatted = val || '';
      return formatted + '';
    };
    let cloudCoverVal = parseFloat(curr.cloudCover) * 100;
    let detailList = [
      {key: 'Cloud Cover', val: '' + cloudCoverVal + '%'},
      {key: 'Dew Point', val: format(curr.dewPoint)},
      {key: 'Humidity', val: format(curr.humidity)},
      {key: 'Nearest Storm Distance', val: format(curr.nearestStormDistance)},
      {key: 'Ozone', val: format(curr.ozone)},
      {key: 'Precip Intensity', val: format(curr.precipIntensity)},
      {key: 'Intensity Error', val: format(curr.precipIntensityError)},
      {key: 'Precip Probability', val: format(curr.precipProbability)},
      {key: 'Precip Type', val: format(curr.precipType)},
      {key: 'Pressure', val: format(curr.pressure)},
      {key: 'Visibility', val: format(curr.visibility)},
      {key: 'Time', val: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}
    ];
    let detailRows = detailList.map((detailVal, index)=> {
      return (
        <TableRow style={{ flexGrow: 1}}>
          <TableRowColumn>{detailVal.key}</TableRowColumn>
          <TableRowColumn>{detailVal.val}</TableRowColumn>
        </TableRow>
      );
    });
    return (
      <Card className="wx-gauge" style={{
                flexGrow: 1
              }}>
        <CardText>
          <Table className="wx-detail-table"
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}>
            <TableHeader enableSelectAll={this.state.enableSelectAll}>
              <TableRow>
                <TableHeaderColumn tooltip='Condition'>Condition</TableHeaderColumn>
                <TableHeaderColumn tooltip='Value'>Value</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody deselectOnClickaway={this.state.deselectOnClickaway}
                       showRowHover={this.state.showRowHover}
                       stripedRows={this.state.stripedRows}>
              {detailRows}
            </TableBody>
          </Table>
        </CardText>
      </Card>
    );
  }
}

export default CurrentDetails;
