const useDateTimes = {
  separteDate: (fullDateStr: string) => {
    const year = new Date(fullDateStr).getFullYear();
    const month = new Date(fullDateStr).getMonth();
    const date = new Date(fullDateStr).getDate();
    const day = new Date(fullDateStr).getDay();
    const dateStr = fullDateStr;

    return { year, month, date, day, dateStr };
  },
  separateTimes: (fullTimeStr: string, isAmpm?: string) => {
    const hour = fullTimeStr.substring(0, 2) || null;
    const minute = fullTimeStr.substring(3, 5) || null;
    const second = fullTimeStr.substring(6, 8) || null;
    const ampm = isAmpm || null;

    return { ampm, hour, minute, second };
  },
};

export default useDateTimes;
