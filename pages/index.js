import * as React from "react";
import Dashboard from "../src/components/dashboard";
import CheckAuth from "../src/reusable/CheckAuth";
export default function Index() {
  return (
    <CheckAuth>
      <Dashboard />
    </CheckAuth>
  );
}
