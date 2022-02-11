import { useEffect, useState } from "react";
import axios from "axios";

import { getAllUsers, UserModelResponse } from "../services/api/handlers/users";
import { useAuth } from "../state/state";

import SortableTable from "../components/SortableTable/SortableTable";

import styles from "./UsersPage.module.css";

function UsersPage() {
  const { token, logOutUser, error, setError } = useAuth();

  const [users, setUsers] = useState<[] | UserModelResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // On mount fetch all users
  useEffect(() => {
    async function getUsers() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getAllUsers(token);

        setUsers(response.data);
      } catch (error) {
        let errorMessage = "Error: ";

        if (axios.isAxiosError(error) && error.response) {
          errorMessage += error.response.data.non_field_errors[0];
        }
        setError(errorMessage);

        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }

    void getUsers();
  }, []);

  if (isLoading) {
    return <div style={{ fontSize: "4rem" }}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoutContainer}>
        <button className={styles.logoutButton} onClick={logOutUser}>
          Logout
        </button>
      </div>
      <p style={{ color: "red" }}>{error}</p>
      <SortableTable data={users} />
    </div>
  );
}

export default UsersPage;
