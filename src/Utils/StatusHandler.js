const StatusHandler = err => {
  let msg = '';

  switch (err) {
    case 400:
      msg = "Please try again later. Can't proceed task.";
      break;
    case 401:
      break;
    case 404:
      msg = 'No record found.';
      break;
    case 409:
      msg = 'Account already exist.';
      break;
    case 500:
      msg = "Please try again later. Can't complete task.";
      break;
  }

  return msg;
};
