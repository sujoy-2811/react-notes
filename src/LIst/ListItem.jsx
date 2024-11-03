import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ListItem.module.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdArchive } from "react-icons/md";
import { MdRestore } from "react-icons/md";
import { MdClose } from "react-icons/md";

const MOBILE_NOTE_WORD_LIMIT = 22;
const DESKTOP_NOTE_WORD_LIMIT = 42;
const MOBILE_TITLE_CHAR_LIMIT = 22;
const DESKTOP_TITLE_CHAR_LIMIT = 30;

const truncateNoteByWords = (
  text = "",
  wordLimit = DESKTOP_NOTE_WORD_LIMIT
) => {
  const cleanedText = text.trim();
  if (!cleanedText) {
    return cleanedText;
  }

  const words = cleanedText.split(/\s+/);
  if (words.length <= wordLimit) {
    return cleanedText;
  }

  return `${words.slice(0, wordLimit).join(" ")}...`;
};

const ListItem = (props) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
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
  const titleCharLimit = props.isMobile
    ? MOBILE_TITLE_CHAR_LIMIT
    : DESKTOP_TITLE_CHAR_LIMIT;
  const noteWordLimit = props.isMobile
    ? MOBILE_NOTE_WORD_LIMIT
    : DESKTOP_NOTE_WORD_LIMIT;
  const displayNote = truncateNoteByWords(note, noteWordLimit);
  const isTitleOverLimit = (title || "").trim().length > titleCharLimit;
  const isNoteOverLimit =
    (note || "").trim().split(/\s+/).filter(Boolean).length > noteWordLimit;
  const showDetailsButton = isTitleOverLimit || isNoteOverLimit;

  const modalRoot =
    typeof document !== "undefined"
      ? document.getElementById("modal-root")
      : null;

  const detailsModal =
    isDetailsOpen &&
    modalRoot &&
    createPortal(
      <div
        className={styles.details_backdrop}
        onClick={() => setIsDetailsOpen(false)}
      >
        <div
          className={styles.details_modal}
          onClick={(event) => event.stopPropagation()}
        >
          <div className={styles.details_header}>
            <div className={styles.details_heading_block}>
              <p className={styles.details_label}>Full Note</p>
              <h3>{title}</h3>
            </div>
            <button
              type="button"
              className={styles.details_close}
              aria-label="Close note details"
              onClick={() => setIsDetailsOpen(false)}
            >
              <MdClose />
            </button>
          </div>
          <p className={styles.details_note}>{note}</p>
          <div className={styles.details_footer}>
            <span className={styles.details_time}>{props.time}</span>
            <button
              type="button"
              className={styles.details_done}
              onClick={() => setIsDetailsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>,
      modalRoot
    );

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
      <p className={styles.note_body}>{displayNote}</p>
      {showDetailsButton && (
        <button
          type="button"
          className={styles.details_button}
          onClick={() => setIsDetailsOpen(true)}
        >
          View
        </button>
      )}
      <span className={styles.time_style}>{props.time}</span>
      {detailsModal}
    </div>
  );
};

export default ListItem;
