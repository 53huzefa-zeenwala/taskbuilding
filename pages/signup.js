import React from "react";
import { Blob, SignupForm } from "../components";

export default function signup() {
  return (
    <div className="overflow-x-hidden relative">
      <Blob size={160} type="light" fromX={-50} fromY={-50} rotate={80} />
      <Blob size={125} type="light" fromX={275} fromY={270} rotate={300} />
      <SignupForm />
    </div>
  );
}
