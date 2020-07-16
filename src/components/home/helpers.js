import { colors } from '../../constants';

const eventStyleGetter = (
  { confirmed, holidayRequests },
  start,
  end,
  isSelected,
) => {
  const filterRequests = (reqs, type) =>
    reqs.filter(hol => hol.type === type).length;

  const hasPendingDelete =
    holidayRequests && filterRequests(holidayRequests, 'delete');

  const hasPendingUpdate =
    holidayRequests && filterRequests(holidayRequests, 'update');

  let style = {
    backgroundColor: hasPendingDelete
      ? colors.hasDelete
      : hasPendingUpdate
      ? colors.hasUpdate
      : confirmed
      ? colors.confirmed
      : colors.notConfirmed,
    borderRadius: '5px',
    opacity: 0.8,
    color: 'black',
    border: '0px',
    display: 'block',
  };
  return {
    style,
  };
};
const requestHandler = holReqs =>
  holReqs.map(
    ({ type, from, resolved, until }) =>
      type === 'update' && {
        title: `${type}, Resolved: ${resolved}`,
        start: from && new Date(from),
        end: until && new Date(until),
        resolved,
      },
  );

const holidayEvents = holidays =>
  holidays.map(
    ({ confirmed, from, holidayRequests, id, until, user: { username } }) => ({
      confirmed,
      holidayRequests,
      id,
      title: username,
      start: new Date(from),
      end: new Date(until),
      // style: { backgroundColor: 'orange' },
    }),
  );

const requestEvents = holidays => {
  let array = [];

  holidays.forEach(
    ({ holidayRequests }) =>
      (array = [...array, ...requestHandler(holidayRequests)]),
  );
  return array;
};

export { eventStyleGetter, holidayEvents, requestEvents };
