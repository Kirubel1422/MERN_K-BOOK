import {
  differenceInDays,
  differenceInMinutes,
  differenceInHours,
  format,
  differenceInWeeks,
  differenceInMonths,
} from "date-fns";

export const useDate = () => {
  const formatDate = (date) => {
    const minutes = differenceInMinutes(new Date(), date) + " minutes ago";
    const hours = differenceInHours(new Date(), date) + " hours ago";
    const days = differenceInDays(new Date(), date) + " days ago";
    if (
      Number(differenceInMinutes(new Date(), date)) >= 60 &&
      Number(differenceInHours(new Date(), date)) <= 24
    ) {
      if (Number(differenceInHours(new Date(), date)) > 1) {
        return hours;
      }
      return differenceInHours(new Date(), date) + " hour ago";
    } else if (Number(differenceInMinutes(new Date(), date)) < 1) {
      return "less than a minute ago";
    }
    if (Number(differenceInHours(new Date(), date)) >= 24) {
      if (Number(differenceInDays(new Date(), date)) < 2) {
        return differenceInDays(new Date(), date) + " day ago";
      } else if (Number(differenceInDays(new Date(), date)) > 7) {
        return Number(differenceInWeeks(new Date(), date)) > 4
          ? differenceInMonths(new Date(), date) + " month ago"
          : differenceInWeeks(new Date(), date) + " week ago";
      }
      return days;
    }
    if (Number(differenceInDays(new Date(), date)) >= 2) {
      return format(date, "DD/MM/YY");
    }
    return minutes;
  };
  return { formatDate };
};
