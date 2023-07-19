import React, { useState, useEffect, useContext } from "react";

import { useRouter } from "next/router";
import Loading from "./loading";
import { GlobalContext } from "../context/GlobalContext";

export default function CheckAuth(props) {
  const router = useRouter();
  const { user } = useContext(GlobalContext);
  const [showAuth, setShowAuth] = useState(true);
  useEffect(() => {
    //console.log(props.user, props.userToken, '------------');
    if (user === null || !user.token) {
      router.push("/login");
      return;
    }

    setShowAuth(false);
  }, []);

  return showAuth ? <Loading /> : <>{props.children}</>;
}
