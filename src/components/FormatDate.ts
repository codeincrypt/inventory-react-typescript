import moment from 'moment-timezone';
moment().tz("America/Los_Angeles").format();

const FormatDate = (dateString:any) => {
  const parsedDate = moment(dateString, 'YYYY-MM-DD');
  const formattedDate = parsedDate.format('DD MMM YYYY');
  return formattedDate;
};

export default FormatDate