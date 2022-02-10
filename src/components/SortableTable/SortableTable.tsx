import { MouseEventHandler, useCallback, useState } from "react";

import { UserModel } from "../../services/api/handlers/users";

import styles from "./SortableTable.module.css";

type SortKeys = keyof UserModel[][0];
type SortOrder = "asc" | "desc";

function sortData({
  tableData,
  sortKey,
  reverse,
}: {
  tableData: UserModel[];
  sortKey: SortKeys;
  reverse: boolean;
}) {
  const sortedData = tableData.sort((a, b) => {
    // @ts-ignore
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
}

function SortableTable({ data }: { data: UserModel[] }) {
  const [sortKey, setSortKey] = useState<SortKeys>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [filter, setFilter] = useState<string>("");

  const headers: { key: SortKeys; label: string }[] = [
    { key: "id", label: "ID" },
    { key: "username", label: "Username" },
    { key: "first_name", label: "First Name" },
    { key: "last_name", label: "Last Name" },
    { key: "is_active", label: "Is Active" },
    { key: "last_login", label: "Last Login" },
    { key: "is_superuser", label: "Is Superuser" },
  ];

  const sortedData = useCallback(
    () => sortData({ tableData: data, sortKey, reverse: sortOrder === "desc" }),
    [data, sortKey, sortOrder]
  );

  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");

    setSortKey(key);
  }

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterInputContainer}>
        <label>Filter show with:</label>
        <input
          className={styles.filterInput}
          name="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr className={styles.tableHeader}>
              {headers.map((row) => {
                return (
                  <td key={row.key} className={styles.tableTD}>
                    {row.label}{" "}
                    <SortButton
                      columnKey={row.key}
                      onClick={() => changeSort(row.key)}
                      sortOrder={sortOrder}
                      sortKey={sortKey}
                    />
                  </td>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {sortedData()
              .filter((person) =>
                person.username.toLowerCase().includes(filter.toLowerCase())
              )
              .map((person, idx) => {
                return (
                  <tr
                    key={person.id}
                    className={idx % 2 === 0 ? styles.whiteBg : styles.grayBg}
                  >
                    <td>{person.id}</td>
                    <td>{person.username}</td>
                    <td>{person.first_name}</td>
                    <td>{person.last_name}</td>
                    <td>{person.is_active.toString()}</td>
                    <td>
                      {person.last_login
                        ? person.last_login.toString()
                        : "No data"}
                    </td>
                    <td>{person.is_superuser.toString()}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SortButton({
  sortOrder,
  columnKey,
  sortKey,
  onClick,
}: {
  sortOrder: SortOrder;
  columnKey: SortKeys;
  sortKey: SortKeys;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className={
        sortKey === columnKey && sortOrder === "desc"
          ? styles.sortButtonReverse
          : styles.sortButton
      }
    >
      ▲
    </button>
  );
}

export default SortableTable;
