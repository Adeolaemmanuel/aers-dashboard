import { atom, useAtom } from "jotai";
import React from "react";
import UserStorage from "../storage/user";

const authState = atom(false);

export default function useState() {
  const [auth, setAuth] = useAtom(authState);

  React.useLayoutEffect(() => {
    setAuth(UserStorage.getIsAuth());
  }, [UserStorage.getIsAuth()]);

  return { auth, setAuth };
}
