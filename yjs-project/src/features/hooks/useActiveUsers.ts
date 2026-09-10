import { readUsers } from "../../utils/readUsers.ts";
import { useCollaboration } from "./useCollaboration.ts";
import { useEffect, useState } from "react";

export const useActiveUsers = () => {
  const { awareness } = useCollaboration();

  const [users, setUsers] = useState(() => readUsers(awareness))

  useEffect(() => {
    const handleChange = () => {
      setUsers(readUsers(awareness));
    }

    awareness.on('change', handleChange);

    return () => {
      awareness.off('change', handleChange);
    }
  })

  return users;
}