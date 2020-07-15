const toEvents = holidays =>
  holidays.map(({ from, holidayRequests, until, user: { username } }) => ({
    holidayRequests,
    title: username,
    start: new Date(from),
    end: new Date(until),
    style: { backgroundColor: 'orange' },
  }));

export { toEvents };
