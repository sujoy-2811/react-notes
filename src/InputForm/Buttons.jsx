import React from "react";
import styles from "./InputForm.module.css";

function Buttons({
  formState: isEdit,
  modifyHandle,
  showCancel,
  cancelHandler,
}) {
  const cancelHandle = () => {
    if (cancelHandler) {
      cancelHandler();
      return;
    }
    modifyHandle({ state: false });
  };

  return (
    <>
      <button className={styles.add_button} type="submit">
        {isEdit ? "Edit" : showCancel ? "Save" : "Add"}
      </button>
      {(isEdit || showCancel) && (
        <button
          className={styles.cancel_button}
          type="button"
          onClick={cancelHandle}
        >
          Cancel
        </button>
      )}
    </>
  );
}

export default Buttons;
