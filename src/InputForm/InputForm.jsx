import { useRef, useEffect } from "react";

import styles from "./InputForm.module.css";
import InputColor from "./InputColor";
import InputSpecial from "./Components/InputSpecial";
import Buttons from "./Buttons";

const InputForm = ({
  inputFormData: { id, title, note, col: color },
  setInputFormData,
  dataHandler,
  modifyState,
  modifyHandle,
  showCancel = false,
  cancelHandler,
  ...props
}) => {
  // hook
  const titleRef = useRef();
  const noteRef = useRef();

  const colorChanger = (colorNumber) => {
    setInputFormData((prev) => {
      return { ...prev, col: colorNumber, note, title };
    });
  };

  useEffect(() => {
    titleRef.current.value = title;
    noteRef.current.value = note;
  }, [title, note]);

  const submitHandler = (event) => {
    event.preventDefault();
    const dateOptions = {
      weekday: "short",
      year: "2-digit",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    // console.log("submit fun");

    if (title.length > 0 && note.length > 0) {
      // console.log("submit in");
      // console.log(title, note, id, color);
      const additionDateAndTime = new Date().toLocaleDateString(
        "en-GB",
        dateOptions
      );
      dataHandler({
        id: id,
        title: title,
        note: note,
        col: color,
        time: additionDateAndTime.toString(),
      });
      titleRef.current.value = "";
      noteRef.current.value = "";
      modifyHandle({ state: false });
    } else if (title === "") {
      setInputFormData((prev) => {
        return { ...prev, col: color, note: note };
      });

      titleRef.current.focus();
    } else if (title !== "" && note === "") {
      noteRef.current.focus();
    }
  };

  const colorHandler = (val) => {
    if (val < 5 && val > 0) {
      colorChanger(val);
    } else {
      colorChanger(1);
    }
  };
  const titleHandler = (event) => {
    title = titleRef.current.value;
  };
  const noteHandler = (event) => {
    note = noteRef.current.value;
  };
  // if (props.inputFormData.id !== -1) {
  //   titleRef.current.value = props.inputFormData.title;
  //   noteRef.current.value = props.inputFormData.note;
  // }
  return (
    <form
      className={`${styles.form} ${modifyState ? styles.form_active : ""}`}
      onSubmit={submitHandler}
    >
      <label>Title</label>
      <br className={styles.unselectable} />
      <InputSpecial
        inputType="INPUT"
        className={styles.inputs}
        type="text"
        ref={titleRef}
        onChanged123={titleHandler}
      />
      <br className={styles.unselectable} />
      <br className={styles.unselectable} />
      <label>Note</label>
      <br className={styles.unselectable} />
      <InputSpecial
        inputType="TEXTAREA"
        className={`${styles.inputs} ${styles.input_larger}`}
        type="text"
        ref={noteRef}
        onChanged123={noteHandler}
      />
      <br className={styles.unselectable} />
      <br className={styles.unselectable} />
      <label>Select Color</label>
      <br className={styles.unselectable} />
      <InputColor colHandler={colorHandler} color={color} />
      <br className={styles.unselectable} />
      <br className={styles.unselectable} />
      <Buttons
        formState={modifyState}
        modifyHandle={modifyHandle}
        showCancel={showCancel}
        cancelHandler={cancelHandler}
      ></Buttons>
    </form>
  );
};

export default InputForm;
