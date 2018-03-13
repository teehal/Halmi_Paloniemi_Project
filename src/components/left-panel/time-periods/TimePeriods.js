import React, { Component } from "react";
import Checkbox from "../../general/Checkbox";

class TimePeriods extends Component {
  render() {
    let timePeriods = this.props.timePeriods;
    const listItems = timePeriods.map((item, index) => (
      <Checkbox
        key={item.id}
        id={item.id}
        description={item.description}
        name={item.yearStart + " - " + item.yearEnd}
        selectedDataChange={this.props.selectedDataChange}
        dataType="timePeriod"
        checked={index === 0 ? true : false}
        selectedOptions={this.props.selectedOptions}
      />
    ));
    return (
      <div className="time-periods">
        <h4>{this.props.timePeriodsLabel}</h4>
        {listItems}
      </div>
    );
  }
}

export default TimePeriods;
