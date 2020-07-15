const requestHandler = holReqs =>
  holReqs.map(({ type, from, until, resolved }) => ({
    title: `${type}, Resolved: ${resolved}`,
    start: from && new Date(from),
    end: until && new Date(until),
    resolved,
  }));

const holidayEvents = holidays =>
  holidays.map(
    ({ confirmed, from, holidayRequests, until, user: { username } }) => ({
      confirmed,
      holidayRequests,
      title: username,
      start: new Date(from),
      end: new Date(until),
      style: { backgroundColor: 'orange' },
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

export { holidayEvents, requestEvents };
