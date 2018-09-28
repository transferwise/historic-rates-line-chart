import Moment from 'moment';
import React, { Fragment } from 'react';
import Types from 'prop-types';
import { Line } from 'react-chartjs-2';

const HistoricRatesLineChart = ({ rates, format }) => {
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
            fontColor: '#fff',
          },
        },
      ],
      yAxes: [
        {
          position: 'right',
          gridLines: {
            color: '#37517e',
            drawBorder: false,
          },
          ticks: {
            fontColor: '#fff',
          },
        },
      ],
    },
  };

  const data = canvas => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0.0, 150.0, 300.0, 150.0);
    gradient.addColorStop(0.002, 'rgba(0, 185, 255, 1.000)');
    gradient.addColorStop(0.204, 'rgba(13, 189, 226, 1.000)');
    gradient.addColorStop(0.492, 'rgba(30, 195, 191, 1.000)');
    gradient.addColorStop(0.695, 'rgba(30, 195, 191, 1.000)');
    gradient.addColorStop(0.897, 'rgba(69, 210, 108, 1.000)');
    gradient.addColorStop(1.0, 'rgba(88, 217, 67, 1.000)');

    return {
      labels: rates.map(rate => Moment(rate.time).format(format)),
      datasets: [
        {
          borderColor: gradient,
          borderWidth: 3,
          fill: false,
          lineTension: 0.3,
          pointRadius: rates.map((_val, x) => (x === rates.length - 1 ? 5 : 0)),
          pointBorderWidth: 2,
          pointBorderColor: '#fff',
          pointBackgroundColor: '#00b9ff',
          pointHoverRadius: 0,
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
  options: Types.object,
};

export default HistoricRatesLineChart;
