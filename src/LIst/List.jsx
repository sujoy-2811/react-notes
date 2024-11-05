import ListItem from "./ListItem";
import styles from "./List.module.css";
const List = ({
  data,
  isMobile,
  currentView,
  moveToTrashHandle,
  archiveHandle,
  restoreHandle,
  permanentDeleteHandle,
  modifyHandle,
  trashRetentionDays,
}) => {
  const getEmptyStateMessage = () => {
    if (currentView === "archive") {
      return "No archived notes yet.";
    }

    if (currentView === "trash") {
      return `Trash is empty. Trashed notes are removed automatically after ${trashRetentionDays} days.`;
    }

    return "Create your first note from the left panel.";
  };

  if (data.length === 0) {
    return (
      <div className={styles.empty}>
        <h3>No notes yet</h3>
        <p>{getEmptyStateMessage()}</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {data.map((item) => {
        return (
          <ListItem
            key={item.id}
            val={item}
            isMobile={isMobile}
            currentView={currentView}
            moveToTrashHandle={moveToTrashHandle}
            archiveHandle={archiveHandle}
            restoreHandle={restoreHandle}
            permanentDeleteHandle={permanentDeleteHandle}
            modifyHandle={modifyHandle}
            time={item.time}
          />
        );
      })}
    </div>
  );
};

export default List;
