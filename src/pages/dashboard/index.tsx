function index() {
  // const excelsData = {
  //   hrv: {
  //     headCell: ["registerNo", "hrv"],
  //     data: [
  //       { registerNo: "00001-00001", hrv: "1203912380" },
  //       { registerNo: "00001-00001", hrv: "12030" },
  //       { registerNo: "00001-00001", hrv: "123" },
  //       { registerNo: "00001-00001", hrv: "1203915465723412380" },
  //     ],
  //   },
  //   heartRate: {
  //     headCell: ["registerNo", "heartRate", "createdAt"],
  //     data: [
  //       {
  //         registerNo: "00001-00001",
  //         heartRate: "11",
  //         createdAt: "2024-07-01 09:00",
  //       },
  //       {
  //         registerNo: "00001-00001",
  //         heartRate: "123",
  //         createdAt: "2024-07-01 11:11",
  //       },
  //       {
  //         registerNo: "00001-00001",
  //         heartRate: "25",
  //         createdAt: "2024-07-01 13:33",
  //       },
  //       {
  //         registerNo: "00001-00001",
  //         heartRate: "77",
  //         createdAt: "2024-07-01 15:55",
  //       },
  //     ],
  //   },
  //   workout: {
  //     headCell: ["registerNo", "workType"],
  //     data: [
  //       { registerNo: "00001-00001", workType: "running" },
  //       { registerNo: "00001-00001", workType: "walking" },
  //       { registerNo: "00001-00001", workType: "health" },
  //     ],
  //   },
  // };

  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   let testData = {
  //     hrv: {
  //       headCell: ["registerNo", "hrv"],
  //       data: [{ registerNo: "00001-00001", hrv: "0" }],
  //     },
  //     heartRate: {
  //       headCell: ["registerNo", "heartRate", "createdAt"],
  //       data: [
  //         {
  //           registerNo: "00001-00001",
  //           heartRate: "11",
  //           createdAt: "2024-07-01 09:00",
  //         },
  //         {
  //           registerNo: "00001-00001",
  //           heartRate: "123",
  //           createdAt: "2024-07-01 11:11",
  //         },
  //         {
  //           registerNo: "00001-00001",
  //           heartRate: "25",
  //           createdAt: "2024-07-01 13:33",
  //         },
  //         {
  //           registerNo: "00001-00001",
  //           heartRate: "77",
  //           createdAt: "2024-07-01 15:55",
  //         },
  //       ],
  //     },
  //   };

  //   const testLength = 120000;

  //   for (let i = 0; i < testLength; i++) {
  //     testData.hrv.data.push({ registerNo: "00001-00001", hrv: `${i}` });
  //     testData.heartRate.data.push({
  //       registerNo: "00001-00001",
  //       heartRate: `${i}`,
  //       createdAt: `2024-07-01 ${i}`,
  //     });
  //   }

  //   makeExcel(testData);
  // }, []);

  // makeExcel(excelsData);
  // const [selected, setSelected] = useState<number[]>([]);

  // const [isDowned, setIsDowned] = useState(false);

  // const [deleted, setDeleted] = useState(false);
  // console.log(selected);
  // console.log("loading", loading);

  return <div>dashboard</div>;
}

export default index;
