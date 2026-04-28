import React from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import styles from "./loading.module.scss";
import type { RootState } from "@/shell/redux/store";

const LoadingPage: React.FC = () => {
  const { totalLoadingProcess } = useSelector((state: RootState) => state.loading);
  if (totalLoadingProcess === 0) return null;

  const target = document.querySelector("#root");
  if (!target) return null;

  return ReactDOM.createPortal(
    <div style={{ backgroundColor: "rgba(225,225,225,0.3)" }} className={styles["lds-ellipsis"]}>
      <div /><div /><div /><div />
    </div>,
    target,
  );
};

export default LoadingPage;
