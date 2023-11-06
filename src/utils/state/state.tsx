import { atom, useAtom } from "jotai";
import React from "react";
import UserStorage from "../storage/user";

const authState = atom(false);

export default function useState() {
  const [auth, setAuth] = useAtom(authState);

  React.useEffect(() => {
    setAuth(UserStorage.getIsAuth());
  }, []);

  return { auth, setAuth };
}
