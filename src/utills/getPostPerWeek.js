import moment from 'moment';

const getWeekNumber = (date) => {
   
  const momentDate = moment(date);
  const startOfMonth = momentDate.clone().startOf('month');
  const weekOfMonth = momentDate.diff(startOfMonth, 'weeks') + 1;
  return weekOfMonth;
};

const applyConditions = (date, postData, flag) => {
  const weekNum = getWeekNumber(date);
  if (weekNum === 1) {
    postData[flag][0] = (postData[flag][0] || 0) + 1;
  } else if (weekNum === 2) {
    postData[flag][1] = (postData[flag][1] || 0) + 1;
  } else if (weekNum === 3) {
    postData[flag][2] = (postData[flag][2] || 0) + 1;
  } else if (weekNum === 4 || weekNum === 5) {
    postData[flag][3] = (postData[flag][3] || 0) + 1;
  }
};

export function getPostPerWeek(postData, flag, date) {
  applyConditions(date, postData, flag);
  return postData[flag].slice();
}

export function getScheduledPosts(postData, flag, scheduled_at) {
  if (scheduled_at !== null) {
    applyConditions(scheduled_at, postData, flag);
  }
  return postData[flag].slice();
}

export function getSuccessFullPost(postData, flag, date, post_status) {
  if (post_status === 'active') {
    applyConditions(date, postData, flag);
  }
  return postData[flag].slice();
}

export function getFaildPost(postData, flag, date, post_status) {
  if (post_status === 'failed') {
    applyConditions(date, postData, flag);
  }
  return postData[flag].slice();
}
