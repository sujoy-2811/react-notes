import styles from "./ListItem.module.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdArchive } from "react-icons/md";
import { MdRestore } from "react-icons/md";

const ListItem = (props) => {
  let color = styles.orange;

  switch (props.val.col) {
    case 1:
      color = styles.red;
      break;
    case 2:
      color = styles.green;
      break;
    case 3:
      color = styles.blue;
      break;
    default:
      color = styles.orange;
  }

  let title = props.val.title;
  let note = props.val.note;

  const actionButtons = [];

  if (props.currentView === "active") {
    actionButtons.push(
      <button
        key="edit"
        className={styles.action_button}
        aria-label="Edit note"
        onClick={() => {
          props.modifyHandle({ state: true, id: props.val.id });
        }}
      >
        <MdEdit />
      </button>
    );

    actionButtons.push(
      <button
        key="archive"
        className={styles.action_button}
        aria-label="Archive note"
        onClick={() => {
          props.archiveHandle(props.val.id);
        }}
      >
        <MdArchive />
      </button>
    );

    actionButtons.push(
      <button
        key="trash"
        className={`${styles.action_button} ${styles.danger_button}`}
        aria-label="Move note to trash"
        onClick={() => {
          props.moveToTrashHandle(props.val.id);
        }}
      >
        <MdDelete />
      </button>
    );
  }

  if (props.currentView === "archive") {
    actionButtons.push(
      <button
        key="restore-archive"
        className={styles.action_button}
        aria-label="Restore note"
        onClick={() => {
          props.restoreHandle(props.val.id);
        }}
      >
        <MdRestore />
      </button>
    );

    actionButtons.push(
      <button
        key="archive-trash"
        className={`${styles.action_button} ${styles.danger_button}`}
        aria-label="Move archived note to trash"
        onClick={() => {
          props.moveToTrashHandle(props.val.id);
        }}
      >
        <MdDelete />
      </button>
    );
  }

  if (props.currentView === "trash") {
    actionButtons.push(
      <button
        key="restore-trash"
        className={styles.action_button}
        aria-label="Restore note"
        onClick={() => {
          props.restoreHandle(props.val.id);
        }}
      >
        <MdRestore />
      </button>
    );
  }

  return (
    <div className={`${styles.card}  ${color}`}>
      <div className={styles.title_row}>
        <h2 className={styles.title_heading}>{title}</h2>
        <div className={styles.actions}>{actionButtons}</div>
      </div>
      <hr />
      <p className={styles.note_body}>{note}</p>
      <span className={styles.time_style}>{props.time}</span>
    </div>
  );
};

export default ListItem;
