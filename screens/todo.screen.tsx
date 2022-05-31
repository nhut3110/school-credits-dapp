import React from "react";
import TodoContainer from "@/components/TodoScreen/app-container";
import TodoAndActivityScreen from "@/components/TodoScreen/index";
export default function TodoScreen() {
  return (
    <TodoContainer>
      {/* <TodoMainScreen /> */}
      <TodoAndActivityScreen />
    </TodoContainer>
  );
}
