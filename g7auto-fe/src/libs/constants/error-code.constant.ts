import { t } from "@/libs/i18n";

export const SUCCESS_CODE = {
  get LOGIN() { return t("SUCCESS_LOGIN"); },
  get LOGOUT() { return t("SUCCESS_LOGOUT"); },
  get CREATE() { return t("SUCCESS_CREATE"); },
  get UPDATE() { return t("SUCCESS_UPDATE"); },
  get DELETE() { return t("SUCCESS_DELETE"); },
  get ACTION() { return t("SUCCESS_ACTION"); },
};

export const formatMessage = (msg: string): string => t(msg);
