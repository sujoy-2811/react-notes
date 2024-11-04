import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import "./util/style.css";
import "./global.css";
import InputForm from "./InputForm/InputForm";
import List from "./LIst/List";
import styles from "./App.module.css";
import { LOCAL_KEY, noteList } from "./contants";
import { MdSearch } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdAdd } from "react-icons/md";

const VIEW = {
  ACTIVE: "active",
  ARCHIVE: "archive",
  TRASH: "trash",
};

const THEME = {
  LIGHT: "light",
  DARK: "dark",
};

const TRASH_RETENTION_DAYS = 30;
const TRASH_RETENTION_MS = TRASH_RETENTION_DAYS * 24 * 60 * 60 * 1000;
const THEME_KEY = "my-note-theme";
const MOBILE_MEDIA_QUERY = "(max-width: 980px)";
const SCROLL_TOP_THRESHOLD = 180;

const INITIAL_FORM_DATA = {
  id: -1,
  title: "",
  note: "",
  col: 3,
};

const normalizeNote = (item) => ({
  ...item,
  status: item.status || VIEW.ACTIVE,
  archivedAt: item.archivedAt || null,
  trashedAt: item.trashedAt || null,
});

const removeExpiredTrash = (items) =>
  items.filter((item) => {
    if (item.status !== VIEW.TRASH || !item.trashedAt) {
      return true;
    }

    const trashedTime = new Date(item.trashedAt).getTime();
    if (Number.isNaN(trashedTime)) {
      return true;
    }

    return Date.now() - trashedTime <= TRASH_RETENTION_MS;
  });

const normalizeAndCleanData = (items = []) =>
  removeExpiredTrash(items.map(normalizeNote));

function App() {
  // states
  const [data, setData] = useState([]);
  const [modifyState, setModifyState] = useState(false);
  const [currentView, setCurrentView] = useState(VIEW.ACTIVE);
  const [searchText, setSearchText] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [themePreference, setThemePreference] = useState(THEME.LIGHT);
  const [inputFormData, setInputFormData] = useState(INITIAL_FORM_DATA);
  const workspaceRef = useRef(null);

  const switchView = (view) => {
    setCurrentView(view);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // handles
  const moveToTrashHandle = (id) => {
    setModifyState(false);
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          status: VIEW.TRASH,
          trashedAt: new Date().toISOString(),
          archivedAt: null,
        };
      })
    );
  };

  const archiveHandle = (id) => {
    setModifyState(false);
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          status: VIEW.ARCHIVE,
          archivedAt: new Date().toISOString(),
          trashedAt: null,
        };
      })
    );
  };

  const restoreHandle = (id) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          status: VIEW.ACTIVE,
          archivedAt: null,
          trashedAt: null,
        };
      })
    );
  };

  const modifyHandle = (val) => {
    if (val.state) {
      setInputFormData(data.filter((item) => item.id === val.id)[0]);
      if (isMobile) {
        setIsFormModalOpen(true);
      }
    } else {
      setInputFormData(INITIAL_FORM_DATA);
      if (isMobile) {
        setIsFormModalOpen(false);
      }
    }
    setModifyState(val.state);
  };

  const openNewNoteModal = () => {
    setModifyState(false);
    setInputFormData(INITIAL_FORM_DATA);
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    modifyHandle({ state: false });
  };

  const addDemoData = () => {
    const seededNotes = noteList.map((item) => ({
      ...item,
      id: `${item.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      status: VIEW.ACTIVE,
      archivedAt: null,
      trashedAt: null,
      createdAt: new Date().toISOString(),
    }));

    setCurrentView(VIEW.ACTIVE);
    setData((prevData) => [...seededNotes, ...prevData]);

    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const updateScrollTopVisibility = () => {
    const workspaceScroll = workspaceRef.current?.scrollTop || 0;
    const pageScroll = window.scrollY || 0;
    setShowScrollTop(
      workspaceScroll > SCROLL_TOP_THRESHOLD ||
        pageScroll > SCROLL_TOP_THRESHOLD
    );
  };

  const scrollToTopHandle = () => {
    if (workspaceRef.current && !isMobile) {
      workspaceRef.current.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addData = (item) => {
    if (item.id === -1) {
      setCurrentView(VIEW.ACTIVE);
      item.id = item.title + Math.random().toString(16);
      setData((prevData) => [
        {
          ...item,
          status: VIEW.ACTIVE,
          archivedAt: null,
          trashedAt: null,
          createdAt: new Date().toISOString(),
        },
        ...prevData,
      ]);
    } else {
      setData((prevData) => {
        return prevData.map((currItem) => {
          if (currItem.id === item.id) {
            return {
              ...currItem,
              ...item,
              status: currItem.status || VIEW.ACTIVE,
              archivedAt: currItem.archivedAt || null,
              trashedAt: currItem.trashedAt || null,
            };
          } else {
            return currItem;
          }
        });
      });
    }
  };

  const filteredData = data
    .filter((item) => item.status === currentView)
    .filter((item) => {
      if (!searchText.trim()) {
        return true;
      }

      const query = searchText.toLowerCase();
      return (
        (item.title || "").toLowerCase().includes(query) ||
        (item.note || "").toLowerCase().includes(query)
      );
    });

  const getViewTitle = () => {
    switch (currentView) {
      case VIEW.ARCHIVE:
        return "Archive";
      case VIEW.TRASH:
        return "Trash";
      default:
        return "My Notes";
    }
  };

  const getViewMetaText = () => {
    if (currentView === VIEW.TRASH) {
      return `Auto-delete after ${TRASH_RETENTION_DAYS} days`;
    }

    if (currentView === VIEW.ARCHIVE) {
      return "Restore anytime";
    }

    return "Today";
  };

  // use effect
  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const handleMobileState = () => {
      setIsMobile(mediaQuery.matches);
      if (!mediaQuery.matches) {
        setIsFormModalOpen(false);
        setIsSidebarOpen(false);
      }
    };

    handleMobileState();
    mediaQuery.addEventListener("change", handleMobileState);
    return () => mediaQuery.removeEventListener("change", handleMobileState);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === THEME.LIGHT || savedTheme === THEME.DARK) {
      setThemePreference(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themePreference);
    localStorage.setItem(THEME_KEY, themePreference);
  }, [themePreference]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
    const cleanedData = normalizeAndCleanData(storedData);
    if (cleanedData.length !== storedData.length) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(cleanedData));
    }
    setData(cleanedData);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    const cleanedData = removeExpiredTrash(data);
    if (cleanedData.length !== data.length) {
      setData(cleanedData);
      return;
    }

    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  }, [data, isInitialized]);

  useEffect(() => {
    updateScrollTopVisibility();
    window.addEventListener("scroll", updateScrollTopVisibility, {
      passive: true,
    });
    return () =>
      window.removeEventListener("scroll", updateScrollTopVisibility);
  }, [isMobile]);

  // UI
  const modalRoot =
    typeof document !== "undefined"
      ? document.getElementById("modal-root")
      : null;

  const mobileFormModal =
    isMobile &&
    isFormModalOpen &&
    modalRoot &&
    createPortal(
      <div className={styles.mobile_modal_backdrop}>
        <div className={styles.mobile_modal}>
          <div className={styles.mobile_modal_header}>
            <h3>{modifyState ? "Edit Note" : "New Note"}</h3>
          </div>
          <InputForm
            dataHandler={addData}
            modifyHandle={modifyHandle}
            modifyState={modifyState}
            inputFormData={inputFormData}
            setInputFormData={setInputFormData}
            showCancel
            cancelHandler={closeFormModal}
          ></InputForm>
        </div>
      </div>,
      modalRoot
    );

  return (
    <React.Fragment>
      <div className={styles.app_shell}>
        <div className={styles.dashboard}>
          <aside
            className={`${styles.sidebar} ${
              isMobile && isSidebarOpen ? styles.sidebar_open : ""
            }`}
          >
            <div className={styles.brand}>React Notes</div>
            <nav className={styles.menu}>
              <button
                className={`${styles.menu_item} ${
                  currentView === VIEW.ACTIVE ? styles.menu_active : ""
                }`}
                onClick={() => switchView(VIEW.ACTIVE)}
              >
                Notes
              </button>
              <button
                className={`${styles.menu_item} ${
                  currentView === VIEW.ARCHIVE ? styles.menu_active : ""
                }`}
                onClick={() => switchView(VIEW.ARCHIVE)}
              >
                Archive
              </button>
              <button
                className={`${styles.menu_item} ${
                  currentView === VIEW.TRASH ? styles.menu_active : ""
                }`}
                onClick={() => switchView(VIEW.TRASH)}
              >
                Trash
              </button>
            </nav>
            <div className={styles.theme_section}>
              <p className={styles.theme_title}>Theme</p>
              <div className={styles.theme_options}>
                <button
                  className={`${styles.theme_button} ${
                    themePreference === THEME.LIGHT ? styles.theme_active : ""
                  }`}
                  onClick={() => setThemePreference(THEME.LIGHT)}
                >
                  Light
                </button>
                <button
                  className={`${styles.theme_button} ${
                    themePreference === THEME.DARK ? styles.theme_active : ""
                  }`}
                  onClick={() => setThemePreference(THEME.DARK)}
                >
                  Dark
                </button>
              </div>
            </div>
            <button
              type="button"
              className={styles.demo_seed_button}
              onClick={addDemoData}
            >
              Add Demo Notes
            </button>
            <div className={styles.form_col}>
              {!isMobile && (
                <InputForm
                  dataHandler={addData}
                  modifyHandle={modifyHandle}
                  modifyState={modifyState}
                  inputFormData={inputFormData}
                  setInputFormData={setInputFormData}
                ></InputForm>
              )}
            </div>
          </aside>

          <section
            className={styles.workspace}
            ref={workspaceRef}
            onScroll={updateScrollTopVisibility}
          >
            <header className={styles.head}>
              {isMobile && (
                <button
                  type="button"
                  className={styles.mobile_menu_button}
                  aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                  onClick={() => setIsSidebarOpen((prevState) => !prevState)}
                >
                  {isSidebarOpen ? <MdClose /> : <MdMenu />}
                </button>
              )}
              <h1>NOTES WORKSPACE</h1>
              <div className={styles.search_wrap}>
                <MdSearch />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                />
              </div>
              <span className={styles.note_count}>
                {filteredData.length} shown
              </span>
            </header>
            <div className={styles.list_col}>
              <div className={styles.section_head}>
                <h2>{getViewTitle()}</h2>
                <p>{getViewMetaText()}</p>
              </div>
              <List
                data={filteredData}
                isMobile={isMobile}
                currentView={currentView}
                moveToTrashHandle={moveToTrashHandle}
                archiveHandle={archiveHandle}
                restoreHandle={restoreHandle}
                modifyHandle={modifyHandle}
                trashRetentionDays={TRASH_RETENTION_DAYS}
              ></List>
            </div>
          </section>
        </div>
      </div>

      {isMobile && isSidebarOpen && (
        <button
          type="button"
          className={styles.mobile_sidebar_overlay}
          aria-label="Close sidebar"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {showScrollTop && (
        <button
          type="button"
          aria-label="Scroll to top"
          className={styles.scroll_top_button}
          onClick={scrollToTopHandle}
        >
          <MdKeyboardArrowUp />
        </button>
      )}

      {isMobile && (
        <button
          type="button"
          aria-label="Create new note"
          className={styles.mobile_new_note_fab}
          onClick={openNewNoteModal}
        >
          <MdAdd />
        </button>
      )}

      {mobileFormModal}
    </React.Fragment>
  );
}

export default App;
