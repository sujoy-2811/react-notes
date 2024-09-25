import ListItem from "./ListItem";
import styles from "./List.module.css";
const List = ({ data, deleteHandle, modifyHandle, modifyState, ...props }) => {
  if (data.length === 0) {
    return (
      <div className={styles.empty}>
        <h3>No notes yet</h3>
        <p>Add your first note or use Demo Notes to get started quickly.</p>
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
            deleteHandle={deleteHandle}
            modifyHandle={modifyHandle}
            modifyState={modifyState}
            time={item.time}
          />
        );
      })}
    </div>
  );
};

export default List;
