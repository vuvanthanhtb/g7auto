import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import { getDashboardStats } from "../shell/home.slice";
import { t } from "@/libs/i18n";
import styles from "./home.module.scss";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const stats = useAppSelector((state) => state.home.stats);

  useEffect(() => {
    document.title = t("HOME_PAGE_TITLE");
    dispatch(getDashboardStats());
  }, [dispatch]);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return t("HOME_GREETING_MORNING");
    if (h < 18) return t("HOME_GREETING_AFTERNOON");
    return t("HOME_GREETING_EVENING");
  };

  const displayName = user?.fullName ?? user?.username ?? t("HOME_DEFAULT_NAME");

  const statCards = [
    {
      label: t("HOME_STAT_TOTAL_CARS"),
      value: stats.totalCars,
      icon: <DirectionsCarIcon sx={{ fontSize: 22 }} />,
      color: "#1a73e8",
      bg: "#e8f0fe",
      path: "/xe",
    },
    {
      label: t("HOME_STAT_CUSTOMERS"),
      value: stats.totalCustomers,
      icon: <PeopleIcon sx={{ fontSize: 22 }} />,
      color: "#2e7d32",
      bg: "#e8f5e9",
      path: "/khach-hang",
    },
    {
      label: t("HOME_STAT_CONTRACTS"),
      value: stats.totalContracts,
      icon: <DescriptionIcon sx={{ fontSize: 22 }} />,
      color: "#e65100",
      bg: "#fff3e0",
      path: "/hop-dong",
    },
    {
      label: t("HOME_STAT_SHOWROOMS"),
      value: stats.totalShowrooms,
      icon: <StoreIcon sx={{ fontSize: 22 }} />,
      color: "#6a1b9a",
      bg: "#f3e5f5",
      path: "/showroom",
    },
    {
      label: t("HOME_STAT_DEPOSITS"),
      value: stats.totalDeposits,
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 22 }} />,
      color: "#00838f",
      bg: "#e0f7fa",
      path: "/dat-coc",
    },
    {
      label: t("HOME_STAT_QUOTATIONS"),
      value: stats.totalQuotations,
      icon: <RequestQuoteIcon sx={{ fontSize: 22 }} />,
      color: "#f57f17",
      bg: "#fff8e1",
      path: "/bao-gia",
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.banner}>
        <div>
          <h2>
            {greeting()}, {displayName}!
          </h2>
          <p>{t("HOME_WELCOME")}</p>
        </div>
        <AutoAwesomeIcon className={styles.bannerIcon} />
      </div>

      <div className={styles.stats}>
        {statCards.map((s) => (
          <div
            key={s.label}
            className={styles.statCard}
            onClick={() => navigate(s.path)}
          >
            <div
              className={styles.statIcon}
              style={{ background: s.bg, color: s.color }}
            >
              {s.icon}
            </div>
            <div>
              <p className={styles.statValue}>{s.value}</p>
              <p className={styles.statLabel}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
