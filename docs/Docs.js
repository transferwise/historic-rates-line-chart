import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import HistoricRatesLineChart from '../src';
import rates from './rates.json';

class Docs extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  createStateLink(name) {
    return value => this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <HistoricRatesLineChart
          rates={rates || []}
          format="MMM D"
        />
      </div>
    );
  }
}

export default hot(module)(Docs);
