import { formatDistance } from 'date-fns';

export const formatDateShort = (date) => {
  var mapObj = { minute: 'm', hours:"h", hour:"h", days:"d", about: '', less: '1', than: '', a: '', s: '' };
  return formatDistance(new Date(date).getTime(), new Date())
    .replace(/hours|hour|days|minute|about|less|than|a|s/gi, (matched) => mapObj[matched])
    .replace(/\s/g, "");
}