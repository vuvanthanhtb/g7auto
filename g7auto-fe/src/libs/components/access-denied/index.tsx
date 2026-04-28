import { useNavigate } from "react-router-dom";
import styles from "./access-denied.module.scss";

const AccessDeniedComponent = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.icon}>🚫</div>
        <h1>Truy cập bị hạn chế</h1>
        <p className={styles.description}>
          Tài khoản của bạn chưa được cấp quyền để truy cập nội dung này.
          Vui lòng liên hệ quản trị viên.
        </p>
        <div className={styles.actions}>
          <button className={styles.primary} onClick={() => navigate("/")}>
            Quay về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedComponent;
