import PropTypes from 'prop-types';
import { differenceInCalendarDays } from 'date-fns';
import toCurrencyAmount from 'Helpers/toCurrencyAmount';
import userDateTime, { getFilterDatesInUTC } from 'Helpers/userDateTime';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Area,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import styles from './areaChart.module.scss';
// import { Checkbox } from 'Components/Atoms';

export default function AreaChart({
  areaChartData,
  tokenBusinessAccountActivityFilter
}) {
  const [tickCheckBox, setTickCheckBox] = useState(true);
  const isReserveEnabled = useSelector(
    (store) => store.userDetails.data?.isReserveEnabled
  );
  const { timeZone } = useSelector((store) => store.userPreferences);
  const option = tokenBusinessAccountActivityFilter.option;
  const customDate = tokenBusinessAccountActivityFilter.customDate;
  const { fromDate, toDate } = getFilterDatesInUTC(
    option.value,
    timeZone,
    customDate
  );
  const getTicks = (startDate, endDate, num) => {
    const diffDays = differenceInCalendarDays(endDate, startDate);

    let current = startDate,
      velocity = Math.round(diffDays / (num - 1));

    const ticks = [moment(startDate).format('M/D/YY')];

    for (let i = 1; i < num - 1; i++) {
      // ticks.push(add(current, { days: i * velocity }));
      ticks.push(
        moment(current)
          .add(i * velocity, 'day')
          .format('M D, YY')
      );
    }

    const lastDate =
      option.label == 'Month to Date (MTD)'
        ? moment(endDate).format('M/D/YY')
        : moment(endDate).subtract(1, 'day').format('M/D/YY');
    ticks.push(lastDate);
    return ticks;
  };

  const ticks = getTicks(
    moment(fromDate).toDate(),
    moment(toDate).toDate(),
    option.label == 'Custom Date Range' ? 11 : 9
  );
  const formatteTicks = (value) => `$${toCurrencyAmount(value)}`;
  const formatterTicksXAxiz = (value) => {
    return `${userDateTime(timeZone, value, false, 'MMM DD')}`;
  };
  useEffect(() => {}, [tokenBusinessAccountActivityFilter]);
  return (
    <div className={` ${styles.areaChart_container}`}>
      {(areaChartData?.length < 1 || areaChartData === null) && (
        <span className="absolute w-full h-[274px] flex justify-center items-center text-base  font-medium text-ibgy1">
          Transactions Not Available
        </span>
      )}
      <ResponsiveContainer width="100%" height={275}>
        <ComposedChart
          width="100%"
          data={areaChartData}
          margin={{
            left: areaChartData?.length > 0 ? 10 : 0,
            right: areaChartData?.length > 0 ? 0 : 0
          }}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="20%" stopColor="#0F8CBBB3" stopOpacity={0.8} />
              <stop offset="80%" stopColor="#74BDD9B3" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <XAxis
            // Below commented can be usefull in future condition
            ticks={
              areaChartData?.map((item) => {
                return `${item.date}`;
              })
            }
            dataKey={
              option.label === 'Today' ||
              option.label === 'Yesterday' ||
              moment(toDate).diff(moment(fromDate), 'hours') <= 24
                ? 'key'
                : 'date'
            }
            tick={{ fill: '#000000' }}
            tickLine={{ stroke: '#000000' }}
            axisLine={{ stroke: '#000000' }}
            tickFormatter={
              areaChartData?.length > 0 &&
              areaChartData?.length <= 15 &&
              formatterTicksXAxiz
            }
          />
          <YAxis
            tickFormatter={formatteTicks}
            tick={{ fill: '#000000' }}
            tickLine={{ stroke: '#000000' }}
            axisLine={{ stroke: '#000000' }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            fill="url(#color)"
            stroke="#74BDD9B3"
          />
          {areaChartData?.length > 0 && (
            <Tooltip
              cursor={false}
              content={
                <CustomTooltip
                  option={option}
                  timeZone={timeZone}
                  isReserveEnabled={isReserveEnabled}
                  sameDay={moment(toDate).diff(moment(fromDate), 'hours') <= 24}
                />
              }
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

AreaChart.propTypes = {
  areaChartData: PropTypes.shape({
    length: PropTypes.number
  }),
  tokenBusinessAccountActivityFilter: PropTypes.shape({
    customDate: PropTypes.any,
    option: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any
    })
  })
};

const CustomTooltip = ({ timeZone, active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customtip}>
        <p className={styles.label}>
          {`${userDateTime(timeZone, label, false, 'll')} : $${toCurrencyAmount(
            payload[0].value
          )}`}
        </p>
      </div>
    );
  }
  return null;
};

function getDatesInRange(startDate, endDate, option) {
  const date = new Date(startDate.getTime());

  //caputuring current time
  const currentDateTime = new Date();

  // converting current time to pst time for getting the current for today
  const hour = currentDateTime.toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles'
  });

  //if today converting the pst time to hour format for today because while selecting today we give enddate as current hour else yesterday we are giving end of the day/hour
  const maxHour = option.label === 'Today' ? moment(hour).format('HH') : 23;

  const hours = []; //for storing  hours
  const dates = []; //for storing dates

  // loop for returning a list of dates in the given range
  while (date <= endDate) {
    const newDateValue = moment(date).format('M/D/YY');
    dates.push({ date: newDateValue, key: newDateValue, amount: 0, count: 0 });
    date.setDate(date.getDate() + 1);
  }

  //loop for returning a list of hours in the selected range
  for (var input = 0; input <= maxHour; input++) {
    const date = moment(startDate).format('M/D/YY');
    hours.push({ date: date, key: input, amount: 0, count: 0 });
  }

  //checking if today/yesterday returning hours list or else dates list
  return option.label === 'Today' ||
    option.label === 'Yesterday' ||
    moment(endDate).diff(moment(startDate), 'hours') <= 24
    ? hours
    : dates;
}

CustomTooltip.propTypes = {
  active: PropTypes.any,
  label: PropTypes.any,
  payload: PropTypes.shape({
    length: PropTypes.any
  }),
  timeZone: PropTypes.any
};
