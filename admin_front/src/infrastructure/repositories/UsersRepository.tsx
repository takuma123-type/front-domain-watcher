import React, { useState, useEffect } from "react";
import { API } from "../API";
import { UnauthorizedError, UnknownError } from "./errors";

interface User {
  id: string;
  name: string;
  email: string;
}

function useUserRepository(sessionToken: string | undefined) {
  const [users, setUsers] = useState<User[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API.createURL(API.URL.users()), {
        method: "GET",
        headers: generateHeaders(sessionToken),
      });
      const data = await handleResponse(response);
      setUsers(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new UnknownError());
      }
    }
  };

  const getUser = async (userId: string) => {
    try {
      const response = await fetch(API.createURL(API.URL.user({ userId })), {
        method: "GET",
        headers: generateHeaders(sessionToken),
      });
      const data = await handleResponse(response);
      setUser(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new UnknownError());
      }
    }
  };

  const generateHeaders = (sessionToken: string | undefined) => {
    return {
      "Content-Type": "application/json",
      "X-SOEUR-ADMIN-API-Key": "hogehoge",
      Authorization: `Bearer ${sessionToken}`,
    };
  };

  const handleResponse = async (response: Response) => {
    if (response.ok) {
      return await response.json();
    } else if (response.status === 401) {
      throw new UnauthorizedError();
    } else {
      throw new UnknownError();
    }
  };

  return { users, error, fetchUsers, getUser };
}

export default useUserRepository;
