# React + TypeScript + Vite + TailwindCSS

Customize freely and complete the table regardless of the data format.

- Npm : https://www.npmjs.com/package/gridsify
- Docs : https://gridsify.vercel.app/

## Install

```
npm i gridsify
yarn add gridsify
pnpm add gridsify
```

## Basic Usage

```js
import { useEffect, useState } from "react";
import { Gridsify } from "gridsify";

function index() {
  const addedMap = [
    ["id", "id"],
    ["userId", "유저 ID"],
    ["title", "제목"],
    ["body", "내용"],
  ];

  // see data structure
  // [
  //   {
  //     "userId": 1,
  //     "id": 1,
  //     "title": "sunt aut facere repellat...",
  //     "body": "quia et suscipit\nsuscipit...",
  //   }, ...
  // ]

  const [data, setData] = useState([]);

  const [perPage, setPerPage] = useState({
    page: 1,
    perPage: 20,
    pageLength: 1,
  });

  const getData = async () => {
    await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${perPage.page}&_limit=${perPage.perPage}`
    ).then(async (res) => {
      const result = await res.json();
      setData(result);
      setPerPage((prev) => {
        return { ...prev, pageLength: 100 / perPage.perPage };
      });
    });
  };

  useEffect(() => {
    getData();
  }, [perPage.page, perPage.perPage]);

  return (
    <Gridsify
      data={data || []}
      addedMap={addedMap}
      perPageOptions={{
        page: perPage.page,
        perPage: perPage.perPage,
        pageLength: perPage.pageLength,
        setPerPage: setPerPage,
      }}
    />
  );
}

export default index;
```

## Contact

dev.yihr@gmail.com
