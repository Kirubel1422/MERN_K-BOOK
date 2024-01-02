import {
  differenceInDays,
  differenceInMinutes,
  differenceInHours,
  format,
} from "date-fns";

export const useDate = () => {
  const formatDate = (date) => {
    const minutes = differenceInMinutes(new Date(), date) + " minutes ago";
    const hours = differenceInHours(new Date(), date) + " hours ago";
    const days = differenceInDays(new Date(), date) + " days ago";
    if (Number(differenceInMinutes(new Date(), date)) >= 60) {
      if (Number(differenceInHours(new Date(), date)) > 1) {
        return hours;
      }
      return differenceInHours(new Date(), date) + " hour ago";
    } else if (Number(differenceInMinutes(new Date(), date)) < 1) {
      return "less than a minute ago";
    }
    if (Number(differenceInHours(new Date(), date)) >= 24) {
      return days;
    }
    if (Number(differenceInDays(new Date(), date)) >= 2) {
      return format(date, "DD/MM/YY");
    }
    return minutes;
  };
  return { formatDate };
};
