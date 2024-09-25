import React, { useState, useEffect } from "react";

import "./util/style.css";
import "./global.css";
import InputForm from "./InputForm/InputForm";
import List from "./LIst/List";
import styles from "./App.module.css";
import { LOCAL_KEY } from "./contants";

function App() {
  // states
  const [data, setData] = useState([]);
  const [modifyState, setModifyState] = useState(false);
  const [inputFormData, setInputFormData] = useState({
    id: -1,
    title: "",
    note: "",
    col: 3,
  });

  // handles
  const deleteHandle = (val) => {
    setData((predata) => {
      const storeData = [...predata.filter((item) => item.id !== val)];
      localStorage.setItem(LOCAL_KEY, JSON.stringify(storeData));
      return storeData;
    });
  };

  const modifyHandle = (val) => {
    if (val.state) {
      setInputFormData(data.filter((item) => item.id === val.id)[0]);
    } else {
      setInputFormData({ id: -1, title: "", note: "", col: 4 });
    }
    setModifyState(val.state);
  };

  const addData = (item) => {
    if (item.id === -1) {
      console.log("new note adding start");
      item.id = item.title + Math.random().toString(16);
      console.log("data ", item);
      setData((preData) => {
        localStorage.setItem(LOCAL_KEY, JSON.stringify([item, ...preData]));
        return [item, ...preData];
      });
      // console.log("new note adding end");
      // localStorage.setItem(LOCAL_KEY, JSON.stringify(storeData));
    } else {
      setData((preData) => {
        const storeData = preData.map((currItem) => {
          if (currItem.id === item.id) {
            return item;
          } else {
            return currItem;
          }
        });
        localStorage.setItem(LOCAL_KEY, JSON.stringify(storeData));
        return storeData;
      });
    }
  };
  // use effect
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(LOCAL_KEY));
    // console.log("🚀 ~ file: App.jsx:67 ~ useEffect ~ storedData:", storedData);
    if (storedData) {
      setData(storedData);
    }
  }, []);

  // UI
  return (
    <React.Fragment>
      <div className={styles.app_shell}>
        <header className={styles.head}>
          <h1>React Notes</h1>
          <p className={styles.sub_head}>
            Capture quick ideas and keep them organized.
          </p>
          <span className={styles.note_count}>{data.length} notes</span>
        </header>
        <section className={styles.form_and_data}>
          <aside className={styles.form_col}>
            <InputForm
              dataHandler={addData}
              modifyHandle={modifyHandle}
              modifyState={modifyState}
              inputFormData={inputFormData}
              setInputFormData={setInputFormData}
            ></InputForm>
          </aside>
          <main className={styles.list_col}>
            <List
              data={data}
              deleteHandle={deleteHandle}
              modifyHandle={modifyHandle}
            ></List>
          </main>
        </section>
      </div>
    </React.Fragment>
  );
}

export default App;
