const useCalendar = {
  separteDate: (fullDateStr: string) => {
    const year = new Date(fullDateStr).getFullYear();
    const month = new Date(fullDateStr).getMonth();
    const date = new Date(fullDateStr).getDate();
    const day = new Date(fullDateStr).getDay();
    const dateStr = fullDateStr;

    return { year, month, date, day, dateStr };
  },
};

export default useCalendar;
