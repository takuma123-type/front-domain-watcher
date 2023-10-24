import React, { useState, useEffect } from "react";
import { UserItem } from "../models/presentation/UserItem";
import { Storage } from "../infrastructure/Storage";
import UsersRepository from "../infrastructure/repositories/UsersRepository";
import {
  NotFoundError,
  UnauthorizedError,
  UnknownError,
  InvlalidSessionTokenError,
  InvalidParameterError,
} from "../infrastructure/repositories/errors";

const FetchUserComponent = ({ userCode }: { userCode: string }) => {
  const [user, setUser] = useState<UserItem | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const sessionToken = Storage.restoreSessionToken();
    if (!sessionToken) {
      setError(new InvlalidSessionTokenError());
      return;
    }
    const usersRepository = UsersRepository(sessionToken);

    usersRepository
      .getUser(userCode)
      .then((data: any) => {
        if (!data) {
          setError(new NotFoundError());
          return;
        }
        const fetchedUser = new UserItem({
          firstName: data.first_name,
          lastName: data.last_name,
          code: data.code,
          authenticationId: data.authentication_id,
          finalEducation: data.final_education,
          selfIntroduction: data.self_introduction,
        });

        setUser(fetchedUser);
      })
      .catch((e: Error) => {
        if (e instanceof UnauthorizedError) {
          Storage.clear();
        }
        setError(e);
      });
  }, [userCode]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.fullname}</h1>
      <p>{user.code}</p>
      <p>{user.authenticationId}</p>
      <p>{user.finalEducation}</p>
      <p>{user.selfIntroduction}</p>
    </div>
  );
};

export default FetchUserComponent;
