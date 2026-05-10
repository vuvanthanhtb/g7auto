import type { ReactNode } from "react";
import style from "./table-title.module.scss";

interface TableTitleProps {
  title: string;
  fromDate?: string;
  toDate?: string;
  extra?: ReactNode;
}

const TableTitleComponent = (props: TableTitleProps) => {
  const { title, fromDate, toDate, extra } = props;
  return (
    <div className={style.container}>
      <label className={style["container__title"]}>{title}</label>
      {fromDate && toDate && (
        <label>
          Từ ngày {fromDate} đến ngày {toDate}
        </label>
      )}
      {extra && <div>{extra}</div>}
    </div>
  );
};

export default TableTitleComponent;
