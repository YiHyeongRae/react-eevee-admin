import Table from "../../components/Table";

function index() {
  const dummyData = [
    {
      userName: "김혜원",
      email: "day@dev.kr",
      authority: "관리자",
      duty: "개발팀",
      lastLogin: "2024-03-14 05:15:45",
      status: false,
    },
    {
      userName: "쏙닥",
      email: "dev@dev.kr",
      authority: "슈퍼관리자",
      duty: "개발팀",
      lastLogin: "2024-06-14 05:15:45",
      status: true,
    },
    {
      userName: "변우석",
      email: "eclipse@dev.kr",
      authority: "관리자",
      duty: "기획팀",
      lastLogin: "2024-09-14 05:15:45",
      status: false,
    },
  ];
  const addedMap = [
    ["userName", "이름"],
    ["email", "이메일"],
    ["authority", "권한"],
    ["duty", "직책"],
    ["lastLogin", "마지막 로그인"],
    ["status", "상태"],
  ];

  return (
    <Table
      data={dummyData}
      addedMap={addedMap}
      checakble={{ active: false, multi: false, setter: () => {} }}
      tdOptions={{
        status: {
          el: (item: boolean) => {
            return (
              <select
                className="w-full max-w-xs select select-xs select-bordered"
                value={item ? "활성" : "비활성"}
                onChange={() => {}}
              >
                <option>활성</option>
                <option>비활성</option>
              </select>
            );
          },
          func: () => {},
        },
      }}
    />
  );
}

export default index;
