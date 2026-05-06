import { t } from "@/libs/i18n";

export const SUCCESS_CODE = {
  get LOGIN() { return t("COMMON_SUCCESS_LOGIN"); },
  get LOGOUT() { return t("COMMON_SUCCESS_LOGOUT"); },
  get CREATE() { return t("COMMON_SUCCESS_CREATE"); },
  get UPDATE() { return t("COMMON_SUCCESS_UPDATE"); },
  get DELETE() { return t("COMMON_SUCCESS_DELETE"); },
  get ACTION() { return t("COMMON_SUCCESS_ACTION"); },
};

export const formatMessage = (msg: string): string => t(msg);
