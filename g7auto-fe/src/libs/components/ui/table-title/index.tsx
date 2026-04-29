import style from "./table-title.module.scss";

interface TableTitleProps {
  title: string;
  fromDate?: string;
  toDate?: string;
}

const TableTitleComponent = (props: TableTitleProps) => {
  const { title, fromDate, toDate } = props;
  return (
    <div className={style.container}>
      <label className={style["container__title"]}>{title}</label>
      {fromDate && toDate && (
        <label>
          Từ ngày {fromDate} đến ngày {toDate}
        </label>
      )}
    </div>
  );
};

export default TableTitleComponent;
