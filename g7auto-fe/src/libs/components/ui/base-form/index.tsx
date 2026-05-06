import clsx from "clsx";
import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik, FormikProvider } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";

import ButtonComponent from "../button";
import styles from "./base-form.module.scss";
import {
  TEXT,
  SELECT,
  BUTTON,
  DATE,
  DATETIME,
  NUMBER_INPUT,
} from "@/libs/constants/form.constant";
import type {
  BaseFormComponentProps,
  IField,
} from "@/libs/types/config-form.type";
import type { ButtonProps } from "@/libs/types/button.type";
import { t } from "@/libs/i18n";

const BaseFormComponent = <T extends Record<string, any>>(
  props: BaseFormComponentProps<T>,
) => {
  const {
    formConfig,
    validationSchema,
    values,
    onChange = () => {},
    options,
    handlers,
  } = props;

  const [disabledButtons, setDisabledButtons] = useState<
    Record<string, boolean>
  >({});

  const handleButtonDelay = (key: string) => {
    setDisabledButtons((prev) => ({ ...prev, [key]: true }));
    setTimeout(
      () => setDisabledButtons((prev) => ({ ...prev, [key]: false })),
      2000,
    );
  };

  const handleButtonClick = async (buttonKey: string, child: ButtonProps) => {
    handleButtonDelay(buttonKey);
    const handler = child.action ? handlers?.[child.action] : undefined;
    if (handler) {
      const result = await handler(formik.values, {
        submit: formik.submitForm,
        setFieldValue: formik.setFieldValue,
      });
      if (result === false) return;
    }
    if (!handler && child.type === "submit") await formik.submitForm();
  };

  const formik = useFormik({
    initialValues: values || ({} as T),
    validationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: () => {},
  });

  const isFieldVisible = (field: IField) => {
    if (!field.visibleWhen) return true;
    try {
      return field.visibleWhen(formik.values);
    } catch {
      return true;
    }
  };

  return (
    <div className={styles["form-container"]}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit} noValidate>
            <Row>
              {formConfig.fields.map((field: IField, index: number) => {
                if (!isFieldVisible(field)) return null;

                if (field.type === TEXT) {
                  const name = field.name ?? "";
                  const error = formik.errors[name] as string;
                  const touched =
                    formik.touched[name] || formik.submitCount > 0;
                  return (
                    <Col key={index} md={field.size} xs={12} className="mb-3">
                      <Form.Group controlId={name}>
                        <Form.Label>
                          {t(field.label ?? "")}
                          {field?.required && (
                            <span className={styles["form-required"]}>*</span>
                          )}
                        </Form.Label>
                        <Form.Control
                          className="shadow-none form-control-custom"
                          type={
                            field?.isPassword
                              ? "password"
                              : (field.inputType ?? "text")
                          }
                          placeholder={field.placeholder}
                          disabled={field.disabled}
                          isInvalid={touched && !!error}
                          value={String(formik.values[name] ?? "")}
                          onChange={(e) => {
                            formik.setFieldValue(name, e.target.value);
                            onChange({
                              ...formik.values,
                              [name]: e.target.value,
                            });
                          }}
                          onBlur={formik.handleBlur}
                        />
                        <Form.Control.Feedback type="invalid">
                          {error}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  );
                }

                if (field.type === NUMBER_INPUT) {
                  const name = field.name ?? "";
                  const error = formik.errors[name] as string;
                  const touched =
                    formik.touched[name] || formik.submitCount > 0;
                  return (
                    <Col key={index} md={field.size} xs={12} className="mb-3">
                      <Form.Group controlId={name}>
                        <Form.Label>
                          {t(field.label ?? "")}
                          {field?.required && (
                            <span className={styles["form-required"]}>*</span>
                          )}
                        </Form.Label>
                        <Form.Control
                          className="shadow-none form-control-custom"
                          type="number"
                          placeholder={field.placeholder}
                          disabled={field.disabled}
                          isInvalid={touched && !!error}
                          value={String(formik.values[name] ?? "")}
                          onChange={(e) => {
                            formik.setFieldValue(
                              name,
                              e.target.value ? Number(e.target.value) : "",
                            );
                            onChange({
                              ...formik.values,
                              [name]: e.target.value
                                ? Number(e.target.value)
                                : "",
                            });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          {error}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  );
                }

                if (field.type === SELECT) {
                  const name = field.name ?? "";
                  const error = formik.errors[name] as string;
                  const touched =
                    formik.touched[name] || formik.submitCount > 0;
                  return (
                    <Col
                      key={index}
                      md={field.size}
                      xs={12}
                      className="mb-3"
                      style={field?.style || {}}
                    >
                      <Form.Group controlId={name}>
                        <Form.Label>
                          {t(field.label ?? "")}
                          {field?.required && (
                            <span className={styles["form-required"]}>*</span>
                          )}
                        </Form.Label>
                        <Select
                          options={(options?.[field.option ?? ""] as []) || []}
                          placeholder={field.placeholder ?? "Chọn..."}
                          isDisabled={field.disabled}
                          isMulti={field?.isMulti || false}
                          value={formik.values[name] ?? null}
                          isClearable
                          onChange={(val) => {
                            formik.setFieldValue(name, val);
                            onChange({ ...formik.values, [name]: val });
                          }}
                          className={clsx("select-input", {
                            "is-invalid": touched && !!error,
                          })}
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          className="d-block"
                        >
                          {touched && error}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  );
                }

                if (field.type === DATE) {
                  const name = field.name ?? "";
                  const error = formik.errors[name] as string;
                  const touched =
                    formik.touched[name] || formik.submitCount > 0;
                  return (
                    <Col key={index} md={field.size} xs={12} className="mb-3">
                      <Form.Group controlId={name}>
                        <Form.Label>
                          {t(field.label ?? "")}
                          {field?.required && (
                            <span className={styles["form-required"]}>*</span>
                          )}
                        </Form.Label>
                        <DatePicker
                          value={
                            formik.values[name]
                              ? dayjs(String(formik.values[name]))
                              : null
                          }
                          onChange={(val) => {
                            const v = val ? val.format("YYYY-MM-DD") : null;
                            formik.setFieldValue(name, v);
                            onChange({ ...formik.values, [name]: v });
                          }}
                          disabled={field.disabled}
                          format="DD/MM/YYYY"
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              size: "small",
                              error: touched && !!error,
                              helperText: touched && error,
                            },
                          }}
                        />
                      </Form.Group>
                    </Col>
                  );
                }

                if (field.type === DATETIME) {
                  const name = field.name ?? "";
                  const error = formik.errors[name] as string;
                  const touched =
                    formik.touched[name] || formik.submitCount > 0;
                  return (
                    <Col key={index} md={field.size} xs={12} className="mb-3">
                      <Form.Group controlId={name}>
                        <Form.Label>
                          {t(field.label ?? "")}
                          {field?.required && (
                            <span className={styles["form-required"]}>*</span>
                          )}
                        </Form.Label>
                        <DateTimePicker
                          value={
                            formik.values[name]
                              ? dayjs(String(formik.values[name]))
                              : null
                          }
                          onChange={(val) => {
                            const v = val
                              ? val.format("YYYY-MM-DDTHH:mm:ss")
                              : null;
                            formik.setFieldValue(name, v);
                            onChange({ ...formik.values, [name]: v });
                          }}
                          disabled={field.disabled}
                          format="DD/MM/YYYY HH:mm"
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              size: "small",
                              error: touched && !!error,
                              helperText: touched && error,
                            },
                          }}
                        />
                      </Form.Group>
                    </Col>
                  );
                }

                if (field.type === BUTTON) {
                  return (
                    <Col
                      key={index}
                      md={field.size}
                      xs={12}
                      className={clsx("mb-3", styles["form-btn-container"])}
                      style={field?.style || {}}
                    >
                      {field.childs?.map((child, i) => {
                        const keyBtn = `btn-${index}-${i}`;
                        const isLoading = disabledButtons[keyBtn];
                        return (
                          <ButtonComponent
                            key={i}
                            type="button"
                            isLoading={isLoading}
                            disabled={child.disabled || isLoading}
                            title={t(child.title ?? "")}
                            action={child.action}
                            className="me-2"
                            style={child?.style || {}}
                            onClick={(e) => {
                              e.preventDefault();
                              handleButtonClick(keyBtn, child);
                            }}
                          />
                        );
                      })}
                    </Col>
                  );
                }

                return null;
              })}
            </Row>
          </Form>
        </FormikProvider>
      </LocalizationProvider>
    </div>
  );
};

export default BaseFormComponent;
