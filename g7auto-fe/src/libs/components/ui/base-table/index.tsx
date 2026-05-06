import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import { Pagination, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./table.module.scss";
import type { RootState } from "@/shell/redux/store";
import type { ButtonProps } from "@/libs/types/button.type";
import ButtonComponent from "../button";
import type { BaseTableColumn } from "@/libs/types/table.type";
import { BUTTON, CHECKBOX } from "@/libs/constants/form.constant";
import {
  NUMERICAL_ORDER,
  TBL_NUMBER,
  TBL_STRING,
} from "@/libs/constants/table.constant";
import { formatNumber } from "@/libs/utils";
import { t } from "@/libs/i18n";

type TableRow = Record<string, unknown>;

interface BaseTableProps {
  tableConfig: BaseTableColumn[];
  btnGroup?: ButtonProps[];
  reducer: keyof RootState;
  state: string;
  handleCellAction?: (row: TableRow, key?: string) => void;
  handlePageChange?: (page: number) => void;
  handlers?: Record<string, (e?: React.MouseEvent) => void>;
  showButton?: (refShow: string[], action: string, row: TableRow) => boolean;
  colorCell?: (refColor: string[], row: TableRow) => string;
  btnGroupClassName?: string;
  onSelectionChange?: (ids: string[]) => void;
  isRowSelectable?: (row: TableRow) => boolean;
}

const BaseTableComponent: React.FC<BaseTableProps> = (props) => {
  const {
    tableConfig,
    reducer,
    state,
    handleCellAction,
    btnGroup,
    handlers,
    btnGroupClassName,
    handlePageChange,
    showButton,
    colorCell,
    onSelectionChange,
    isRowSelectable,
  } = props;

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const dataTable = useSelector(
    (store: RootState) =>
      store[reducer][state as keyof (typeof store)[typeof reducer]],
  );
  const {
    content = [],
    totalElements = 0,
    totalPages = 0,
    page = 0,
    size = 0,
  } = dataTable as {
    content?: TableRow[];
    totalElements?: number;
    totalPages?: number;
    page?: number;
    size?: number;
  };

  const contentLengthRef = useRef<number>(-1);
  useEffect(() => {
    if (contentLengthRef.current === content.length) return;
    contentLengthRef.current = content.length;
    setSelectedIds(new Set());
    onSelectionChange?.([]);
  }, [content.length]);

  const hasCheckbox = tableConfig.some((col) => col.type === CHECKBOX);
  const selectableRows = isRowSelectable
    ? content.filter(isRowSelectable)
    : content;

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      onSelectionChange?.([...next]);
      return next;
    });
  };

  const toggleAll = () => {
    const ids = selectableRows.map((row) => String(row.id));
    const allChecked = ids.every((id) => selectedIds.has(id));
    const next = allChecked ? new Set<string>() : new Set<string>(ids);
    setSelectedIds(next);
    onSelectionChange?.([...next]);
  };

  const allSelected =
    selectableRows.length > 0 &&
    selectableRows.every((r) => selectedIds.has(String(r.id)));
  const someSelected =
    !allSelected && selectableRows.some((r) => selectedIds.has(String(r.id)));

  return (
    <React.Fragment>
      <div className={clsx(styles["table-btn-group"], btnGroupClassName)}>
        {btnGroup?.map((btn, index) => (
          <ButtonComponent
            key={`tbl-btn-${index}`}
            type={btn.type}
            disabled={btn.disabled}
            className="me-2"
            style={btn?.style || {}}
            onClick={() => handlers?.[btn.action]?.()}
            title={btn.title}
            action={btn.action}
          />
        ))}
      </div>

      <div className={styles["total-records"]}>
        Tổng bản ghi: <span>{totalElements}</span>
      </div>

      <Table bordered responsive className={styles["table-container"]}>
        <thead>
          <tr>
            {tableConfig.map((col, index) => {
              if (col.type === CHECKBOX) {
                return (
                  <th
                    key={`head-${index}`}
                    style={{ width: 40, textAlign: "center", ...col.style }}
                  >
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = someSelected;
                      }}
                      onChange={toggleAll}
                    />
                  </th>
                );
              }
              return (
                <th
                  key={`head-${index}`}
                  style={{ textAlign: "center", ...col.style }}
                >
                  {t(col.label ?? "")}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {content.map((row, rowIndex) => (
            <tr
              key={`row-${rowIndex}`}
              className={
                hasCheckbox && selectedIds.has(String(row.id))
                  ? styles["row-selected"]
                  : undefined
              }
            >
              {tableConfig.map((col, colIndex) => {
                if (col.type === CHECKBOX) {
                  const selectable = isRowSelectable
                    ? isRowSelectable(row)
                    : true;
                  return (
                    <td
                      key={`cell-${colIndex}-chk`}
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <input
                        type="checkbox"
                        disabled={!selectable}
                        checked={selectable && selectedIds.has(String(row.id))}
                        onChange={() => selectable && toggleRow(String(row.id))}
                        style={
                          !selectable
                            ? { cursor: "not-allowed", opacity: 0.3 }
                            : undefined
                        }
                      />
                    </td>
                  );
                }

                if (col.type === NUMERICAL_ORDER) {
                  let styleCell: React.CSSProperties = col.styleCell ?? {};
                  if (col.colorCustom) {
                    styleCell = {
                      ...styleCell,
                      color: col.colorCustom[String(row[col.name])] ?? "unset",
                    };
                  }
                  return (
                    <td
                      key={`cell-${colIndex}-no`}
                      style={{
                        textAlign: "center",
                        ...styleCell,
                      }}
                      className="align-middle"
                    >
                      {rowIndex + 1 + size * (page - 1)}
                    </td>
                  );
                }

                if ([TBL_STRING, TBL_NUMBER].includes(col.type)) {
                  let styleCell: React.CSSProperties = col.styleCell ?? {};
                  if (Array.isArray(col?.refColor)) {
                    styleCell = {
                      ...styleCell,
                      color: colorCell?.(col.refColor, row) ?? "unset",
                    };
                  }
                  return (
                    <td
                      key={`cell-${colIndex}-str`}
                      style={
                        col.type === TBL_NUMBER
                          ? { ...styleCell, textAlign: "right" }
                          : styleCell
                      }
                      className="align-middle"
                    >
                      {col.type === TBL_NUMBER
                        ? formatNumber(row[col.name] as number)
                        : String(row[col.name] ?? "")}
                    </td>
                  );
                }

                if (col.type === BUTTON) {
                  return (
                    <td
                      key={`cell-${colIndex}-btn`}
                      className={styles["btn-group"]}
                      style={col.styleCell ?? {}}
                    >
                      {(col.btnGroup ?? []).map((btn, btnIndex) => {
                        if (Array.isArray(btn?.refShow)) {
                          const isShow = showButton?.(
                            btn.refShow,
                            btn.action,
                            row,
                          );
                          if (!isShow)
                            return (
                              <span
                                key={`cell-btn-${btnIndex}`}
                                style={{ display: "none" }}
                              >
                                &nbsp;
                              </span>
                            );
                        }
                        return (
                          <ButtonComponent
                            key={`cell-btn-${btnIndex}`}
                            type={btn.type}
                            disabled={btn.disabled}
                            className="me-1"
                            style={btn.style ?? {}}
                            action={btn.action}
                            onClick={() => handleCellAction?.(row, btn.action)}
                            title={t(btn.title ?? "")}
                          />
                        );
                      })}
                    </td>
                  );
                }
                return null;
              })}
            </tr>
          ))}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <Stack alignItems="center" sx={{ py: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e: React.ChangeEvent<unknown>, p: number) => {
              e.preventDefault();
              return handlePageChange?.(p);
            }}
            color="primary"
            size="small"
          />
        </Stack>
      )}
    </React.Fragment>
  );
};

export default BaseTableComponent;
