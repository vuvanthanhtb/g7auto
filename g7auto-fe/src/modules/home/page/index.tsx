import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import DescriptionIcon from "@mui/icons-material/Description";
import { useAppDispatch, useAppSelector } from "@/shell/redux/hooks";
import { getCars } from "@/modules/cars/shell/cars.slice";
import { getCustomers } from "@/modules/customers/shell/customers.slice";
import { getContracts } from "@/modules/contracts/shell/contracts.slice";
import styles from "./home.module.scss";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const totalCars = useAppSelector((state) => state.cars.carTable.totalElements);
  const totalCustomers = useAppSelector((state) => state.customers.customerTable.totalElements);
  const totalContracts = useAppSelector((state) => state.contracts.contractTable.totalElements);

  useEffect(() => {
    document.title = "Tổng quan — G7Auto";
    dispatch(getCars({ page: 1, size: 1 }));
    dispatch(getCustomers({ page: 1, size: 1 }));
    dispatch(getContracts({ page: 1, size: 1 }));
  }, [dispatch]);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Chào buổi sáng";
    if (h < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  const displayName = user?.fullName ?? user?.username ?? "bạn";

  const stats = [
    { label: "Tổng xe", value: totalCars, icon: <DirectionsCarIcon sx={{ fontSize: 22 }} />, color: "#1a73e8", bg: "#e8f0fe", path: "/xe" },
    { label: "Khách hàng", value: totalCustomers, icon: <PeopleIcon sx={{ fontSize: 22 }} />, color: "#2e7d32", bg: "#e8f5e9", path: "/khach-hang" },
    { label: "Hợp đồng", value: totalContracts, icon: <DescriptionIcon sx={{ fontSize: 22 }} />, color: "#e65100", bg: "#fff3e0", path: "/hop-dong" },
    { label: "Showroom", value: "", icon: <StoreIcon sx={{ fontSize: 22 }} />, color: "#6a1b9a", bg: "#f3e5f5", path: "/showroom" },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.banner}>
        <div>
          <h2>{greeting()}, {displayName}!</h2>
          <p>Chào mừng bạn đến với hệ thống quản lý G7Auto.</p>
        </div>
        <AutoAwesomeIcon className={styles.bannerIcon} />
      </div>

      <div className={styles.stats}>
        {stats.map((s) => (
          <div key={s.label} className={styles.statCard} onClick={() => navigate(s.path)}>
            <div className={styles.statIcon} style={{ background: s.bg, color: s.color }}>{s.icon}</div>
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
