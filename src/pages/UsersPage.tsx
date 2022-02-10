import { useEffect, useState } from "react";

import { getAllUsers, UserModel } from "../services/api/handlers/users";
import { useAuth } from "../state/state";

import SortableTable from "../components/SortableTable/SortableTable";

import styles from "./UsersPage.module.css";

function UsersPage() {
  const auth = useAuth();

  const [users, setUsers] = useState<[] | UserModel[]>([]);

  useEffect(() => {
    async function getUsers() {
      const response = await getAllUsers(auth.token);
      setUsers(response.data);
    }
    void getUsers();
  }, []);

  if (users.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <SortableTable data={users} />
    </div>
  );
}

export default UsersPage;
