import moment, { months } from "moment";

export const getPostDayAndTime = (scheduled_at, format = "YYYY-MM-DD HH:mm:ss") => {
    const date = moment(scheduled_at, format);
    return {
        day: date.format('ddd'),
        hour: date.hour(),
        minutes: date.minutes(),
        formattedTime: date.format('hh:mm A'),
        meridian: date.format('A'),
        month: date.month() + 1,
        year: date.year()
    };
};