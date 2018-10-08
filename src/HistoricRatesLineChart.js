import Moment from 'moment';
import React, { Fragment } from 'react';
import Types from 'prop-types';
import { defaults, Line } from 'react-chartjs-2';

defaults.global.defaultFontColor = '#fff';
defaults.global.defaultFontFamily =
  "'Averta', 'Avenir W02', 'Avenir', Helvetica, Arial, sans-serif";
defaults.global.defaultFontSize = 14;

const HistoricRatesLineChart = ({ format, rates, source, target }) => {
  const options = {
    animation: false,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      backgroundColor: '#fff',
      titleFontColor: '#37517e',
      bodyFontColor: '#37517e',
      xPadding: 16,
      yPadding: 8,
      cornerRadius: 3,
      displayColors: false,
      callbacks: {
        label: tooltipItem => {
          return `1 ${source} → ${tooltipItem.yLabel} ${target}`;
        },
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            display: false,
          },
          ticks: {
            maxRotation: 0,
            maxTicksLimit: 4,
          },
        },
      ],
      yAxes: [
        {
          position: 'right',
          gridLines: {
            color: '#4b628b',
            drawBorder: false,
          },
        },
      ],
    },
  };

  const data = () => {
    return {
      labels: rates.map(rate => Moment(rate.time).format(format)),
      datasets: [
        {
          borderColor: '#2ed06e',
          borderWidth: 3,
          fill: false,
          lineTension: 0.3,
          pointRadius: rates.map((_val, x) => (x === rates.length - 1 ? 5 : 0)),
          pointBorderWidth: 2,
          pointBorderColor: '#fff',
          pointBackgroundColor: '#00b9ff',
          pointHoverRadius: 5,
          data: rates.map(rate => rate.rate),
        },
      ],
    };
  };

  return (
    <Fragment>
      <Line data={data} options={options} />
    </Fragment>
  );
};

HistoricRatesLineChart.propTypes = {
  rates: Types.arrayOf(
    Types.shape({
      rate: Types.number.isRequired,
      source: Types.string.isRequired,
      target: Types.string.isRequired,
      time: Types.string.isRequired,
    }),
  ).isRequired,
  format: Types.string.isRequired,
  source: Types.string.isRequired,
  target: Types.string.isRequired,
  options: Types.object,
};

export default HistoricRatesLineChart;
