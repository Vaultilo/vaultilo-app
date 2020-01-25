import moment from 'moment';
import pluralize from 'pluralize';

export const getFormattedTime = (timeStamp) => {
  if (timeStamp) {
    const itemTimeStamp = moment(timeStamp);
    if (itemTimeStamp.isAfter(moment().subtract(60, 'minutes'))) {
      const diff = moment().diff(itemTimeStamp, "minutes");
      return `${diff} ${pluralize('min', diff)} ago`;
    }
    if (itemTimeStamp.isAfter(moment().subtract(1, 'day'))) {
      const diff = moment().diff(itemTimeStamp, "hours");
      return `${diff} ${pluralize('hour', diff)} ago`;
    }
    if (itemTimeStamp.isAfter(moment().subtract(30, 'day'))) {
      const diff = moment().diff(itemTimeStamp, "days")
      return `${diff} days ago`;
    }
    if (itemTimeStamp.years() === moment().years()) {
      return `${itemTimeStamp.date()} ${itemTimeStamp.format('MMM')}`;
    }
    return `${itemTimeStamp.date()} ${itemTimeStamp.format('MMM')}, ${itemTimeStamp.format('YYYY')}`;
  }
  return null;
}