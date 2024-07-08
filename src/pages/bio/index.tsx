import { useState } from "react";

import Toast from "../../components/Toast";
import { useToast } from "../../utils/useToast";
import Table from "#/components/Table";

function index() {
  const [toastList, setToastList] = useState([{}]);

  // function test() {

  //   });
  // }
  const buttons = [
    {
      style: "",
      text: "추가버튼",
      func: () => {
        useToast({
          list: toastList,
          setter: setToastList,
          info: {
            message: "당신은 추가버튼을 클릭했습니다.",
            type: "alert-success",
            life: true,
          },
        });
      },
      disabled: false,
    },
    {
      style: "",
      text: "다른버튼",
      func: () => {
        useToast({
          list: toastList,
          setter: setToastList,
          info: {
            message: "당신은 다른버튼을 클릭했습니다.",
            type: "alert-warning",
            life: true,
          },
        });
      },
      disabled: false,
    },
    {
      style: "",
      text: "또다른버튼",
      func: () => {
        alert("또다른버튼 액션");
      },
      disabled: true,
    },
  ];
  const dummyData = [
    {
      userName: "가",
      job: "직업",
      company: "컴패니",
      location: "집",
      lastLogin: "2024-05-01 00:23:11",
    },
    {
      userName: "나",
      job: "커피알바생",
      company: "메가커피",
      location: "서울",
      lastLogin: "2024-05-07 19:42:23",
    },
    {
      userName: "다",
      job: "KRI",
      company: "KRI",
      location: "부산",
      lastLogin: "2024-05-14 05:15:45",
    },

    {
      userName: "사",
      job: "KRI",
      company: "KRI",
      location: "부산",
      lastLogin: "2024-05-14 05:15:45",
    },
    {
      userName: "아",
      job: "연구원",
      company: "안드레이아",
      location: "강릉",
      lastLogin: "2024-05-21 11:50:01",
    },
    {
      userName: "자",
      job: "직업",
      company: "컴패니",
      location: "집",
      lastLogin: "2024-05-01 00:23:11",
    },
    {
      userName: "차",
      job: "커피알바생",
      company: "메가커피",
      location: "서울",
      lastLogin: "2024-05-07 19:42:23",
    },
    {
      userName: "카",
      job: "KRI",
      company: "KRI",
      location: "부산",
      lastLogin: "2024-05-14 05:15:45",
    },
    {
      userName: "라",
      job: "연구원",
      company: "안드레이아",
      location: "강릉",
      lastLogin: "2024-05-21 11:50:01",
    },
    {
      userName: "마",
      job: "직업",
      company: "컴패니",
      location: "집",
      lastLogin: "2024-05-01 00:23:11",
    },
    {
      userName: "바",
      job: "커피알바생",
      company: "메가커피",
      location: "서울",
      lastLogin: "2024-05-07 19:42:23",
    },
    {
      userName: "타",
      job: "직업",
      company: "컴패니",
      location: "집",
      lastLogin: "2024-05-01 00:23:11",
    },
    {
      userName: "파",
      job: "커피알바생",
      company: "메가커피",
      location: "서울",
      lastLogin: "2024-05-07 19:42:23",
    },
    {
      userName: "하",
      job: "KRI",
      company: "KRI",
      location: "부산",
      lastLogin: "2024-05-14 05:15:45",
    },
    {
      userName: "천우희",
      job: "연구원",
      company: "안드레이아",
      location: "강릉",
      lastLogin: "2024-05-21 11:50:01",
    },
    {
      userName: "김딱쏙",
      job: "직업",
      company: "컴패니",
      location: "집",
      lastLogin: "2024-05-01 00:23:11",
    },
    {
      userName: "딱쏙이",
      job: "커피알바생",
      company: "메가커피",
      location: "서울",
      lastLogin: "2024-05-07 19:42:23",
    },
    {
      userName: "변우석",
      job: "KRI",
      company: "KRI",
      location: "부산",
      lastLogin: "2024-05-14 05:15:45",
    },
    {
      userName: "천우희",
      job: "연구원",
      company: "안드레이아",
      location: "강릉",
      lastLogin: "2024-05-21 11:50:01",
    },
    {
      userName: "김딱쏙",
      job: "직업",
      company: "컴패니",
      location: "집",
      lastLogin: "2024-05-01 00:23:11",
    },
    {
      userName: "딱쏙이",
      job: "커피알바생",
      company: "메가커피",
      location: "서울",
      lastLogin: "2024-05-07 19:42:23",
    },
    {
      userName: "변우석",
      job: "KRI",
      company: "KRI",
      location: "부산",
      lastLogin: "2024-05-14 05:15:45",
    },
  ];
  const addedMap = [
    ["userName", "이름"],
    ["job", "직업"],
    ["company", "회사"],
    ["location", "지역"],
    ["lastLogin", "마지막 로그인"],
  ];
  return (
    <>
      <Toast list={toastList} setter={setToastList} />
      <Table buttons={buttons} data={dummyData} addedMap={addedMap} />
    </>
  );
}

export default index;
