import Moment from 'moment';
import React, { Fragment } from 'react';
import Types from 'prop-types';
import { defaults, Line } from 'react-chartjs-2';

defaults.global.defaultFontColor = '#fff';
defaults.global.defaultFontFamily =
  "'Averta', 'Avenir W02', 'Avenir', Helvetica, Arial, sans-serif";
defaults.global.defaultFontSize = 14;

const HistoricRatesLineChart = ({ format, datasets, source, target, options }) => {
  const defaultOptions = {
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
        label: tooltipItem => `1 ${source} → ${tooltipItem.yLabel} ${target}`,
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
  const mergedOptions = { ...defaultOptions, ...options };

  const data = () => {
    const defaultDatasetOptions = {
      borderColor: '#2ed06e',
      borderWidth: 3,
      fill: false,
      lineTension: 0.3,
      pointBorderWidth: 2,
      pointBorderColor: '#fff',
      pointBackgroundColor: '#00b9ff',
      pointHoverRadius: 5,
    };

    const configuredDatasets = datasets.map((dataset, index) => {
      const ratesData = dataset.rates.map(x => x.rate);
      const pointRadius = dataset.rates.map((_val, x) => (x === dataset.rates.length - 1 ? 5 : 0));
      const label =
        dataset.options && dataset.options.label ? dataset.options.label : `series-${index}`;

      return {
        ...defaultDatasetOptions,
        ...dataset.options,
        label,
        data: ratesData,
        pointRadius,
      };
    });

    return {
      labels: datasets[0].rates.map(rate => Moment(rate.time).format(format)),
      datasets: configuredDatasets,
    };
  };

  return (
    <Fragment>
      <Line data={data} options={mergedOptions} />
    </Fragment>
  );
};

HistoricRatesLineChart.propTypes = {
  datasets: Types.arrayOf(
    Types.shape({
      rates: Types.arrayOf(
        Types.shape({
          rate: Types.number.isRequired,
          source: Types.string.isRequired,
          target: Types.string.isRequired,
          time: Types.string.isRequired,
        }),
      ).isRequired,
      options: Types.object,
    }),
  ).isRequired,

  format: Types.string.isRequired,
  source: Types.string.isRequired,
  target: Types.string.isRequired,
  options: Types.object,
};

export default HistoricRatesLineChart;
