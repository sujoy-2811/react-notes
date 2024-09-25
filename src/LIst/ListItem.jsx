import styles from "./ListItem.module.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

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
  // if (note.length > 108) {
  //   note = note.substring(1, 108) + "...";
  // }
  // if (title.length > 10) {
  //   title = title.substring(1, 11) + "...";
  // }

  return (
    <div className={`${styles.card}  ${color}`}>
      <div className={styles.title_and_del_button}>
        <h2 className={styles.title_heading}>{title}</h2>
        <button
          className={styles.modify_button}
          aria-label="Edit note"
          onClick={() => {
            props.modifyHandle({ state: true, id: props.val.id });
          }}
        >
          <MdEdit />
        </button>
        <button
          className={styles.delete_button}
          aria-label="Delete note"
          onClick={() => {
            props.deleteHandle(props.val.id);
          }}
        >
          <MdDelete />
        </button>
      </div>
      <hr style={{ width: "95%" }} />
      <p className={styles.note_body}>{note}</p>
      <span className={styles.time_style}>{props.time}</span>
    </div>
  );
};

export default ListItem;
