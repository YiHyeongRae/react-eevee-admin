import _ from "lodash";
import Table from "#/components/Table";
import { useEffect, useState } from "react";
import EditableCell from "#/components/EditableCell";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTranslation } from "react-i18next";

function index() {
  const { t } = useTranslation();
  const [dummyData] = useState([
    {
      userName: "가가가",
      registerNo: "admin-1",
      phone: "010-aaaa-aaaa",
      createdAt: "2024-06-01 12:46:09",
    },
    {
      userName: "나나나",
      registerNo: "admin-2",
      phone: "010-bbbb-bbbb",
      createdAt: "2024-05-02 12:46:09",
    },
    {
      userName: "다다다",
      registerNo: "admin-3",
      phone: "010-cccc-cccc",
      createdAt: "2024-03-06 12:46:09",
    },
    {
      userName: "라라라",
      registerNo: "admin-4",
      phone: "010-dddd-dddd",
      createdAt: "2024-01-04 12:46:09",
    },
  ]);
  const addedMap = [
    ["registerNo", "등록번호"],
    ["userName", "이름"],
    ["phone", "전화번호"],
    ["createdAt", "가입 일시"],
  ];

  const [editItem, setEditItem] = useState("");

  useEffect(() => {
    const input = document.getElementById(editItem);
    if (input) {
      input.focus();
    }
  }, [editItem]);

  const [isExpand, setIsExpand] = useState(true);
  return (
    <>
      <div>
        <div
          className="badge badge-outline max-sm:text-xs"
          onClick={() => setIsExpand((prev) => !prev)}
        >
          {`${t("common.code")} ${
            isExpand ? t("common.collapse") : t("common.expand")
          }`}
        </div>
      </div>
      {isExpand && (
        <div className="grid grid-cols-1 gap-2 h-3/4">
          <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
            {`  import Table from "#/components/Table";
  import { useEffect, useState } from "react";
  import EditableCell from "#/components/EditableCell";

  function index() {
    const [dummyData] = useState([
      {
        userName: "가가가",
        registerNo: "admin-1",
        phone: "010-aaaa-aaaa",
        createdAt: "2024-06-01 12:46:09",
      },
      {
        userName: "나나나",
        registerNo: "admin-2",
        phone: "010-bbbb-bbbb",
        createdAt: "2024-05-02 12:46:09",
      },
      {
        userName: "다다다",
        registerNo: "admin-3",
        phone: "010-cccc-cccc",
        createdAt: "2024-03-06 12:46:09",
      },
      {
        userName: "라라라",
        registerNo: "admin-4",
        phone: "010-dddd-dddd",
        createdAt: "2024-01-04 12:46:09",
      },
    ]);
    const addedMap = [
      ["registerNo", "등록번호"],
      ["userName", "이름"],
      ["phone", "전화번호"],
      ["createdAt", "가입 일시"],
    ];

    const [editItem, setEditItem] = useState("");

    useEffect(() => {
      const input = document.getElementById(editItem);
      if (input) {
        input.focus();
      }
    }, [editItem]);

    return (
          <Table
            checakble={{
              active: false,
              multi: false,
              setter: () => {},
            }}
            data={dummyData}
            addedMap={addedMap}
            trOptions={{
              thead: { className: "", func: () => {} },
              tbody: {
                className: "",
                func: () => {
                  if (editItem !== "") {
                    setEditItem("");
                  }
                },
              },
            }}
            tdOptions={{
              phone: {
                el: (item: string, index: number) => {
                  return (
                    <EditableCell
                      // ${t("guide.tableDocs0")}
                      // ${t("guide.tableDocs1")}
                      item={item}
                      index={index}
                      edit={{
                        editItem: editItem,
                        setEditItem: setEditItem,
                        confirmFunc: () => {
                          // ${t("guide.tableDocs2")}
                          alert("${t("common.confirm")} !");
                        },
                        cancleFunc: () => {
                          // ${t("guide.tableDocs3")}
                          alert("${t("common.cancle")} !");
                        },
                      }}
                    />
                  );
                },
                func: () => {},
              },
            }}
          />
    );
  }

  export default index;
        `}
          </SyntaxHighlighter>
        </div>
      )}

      <Table
        checakble={{
          active: false,
          multi: false,
          setter: () => {},
        }}
        data={dummyData}
        addedMap={addedMap}
        trOptions={{
          thead: { className: "", func: () => {} },
          tbody: {
            className: "",
            func: () => {
              if (editItem !== "") {
                setEditItem("");
              }
            },
          },
        }}
        tdOptions={{
          phone: {
            el: (item: string, index: number) => {
              return (
                <EditableCell
                  item={item}
                  index={index}
                  edit={{
                    editItem: editItem,
                    setEditItem: setEditItem,
                    confirmFunc: () => {
                      // edit confirm func below likes API post
                      alert(`${t("common.confirm")} !`);
                    },
                    cancleFunc: () => {
                      // cancle func below, and contain setEditItem("") is default
                      alert(`${t("common.cancle")} !`);
                    },
                  }}
                />
              );
            },
            func: () => {},
          },
        }}
      />
    </>
  );
}

export default index;
