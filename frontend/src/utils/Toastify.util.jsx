import { toast } from "react-toastify";

const toastConfig = {
  success: {
    method: toast.success,
    style: { backgroundColor: "green", color: "#fff" }
  },
  error: {
    method: toast.error,
    style: { backgroundColor: "red", color: "#fff" }
  },
  info: {
    method: toast.info,
    style: { backgroundColor: "lightblue", color: "#fff" }
  },
  warning: {
    method: toast.warning,
    style: { backgroundColor: "orange", color: "yellow" }
  },
  default: {
    method: toast,
    style: { backgroundColor: "var(--color-brand-700)", color: "#fff" }
  }
};

const showToast = (message, type = "default") => {
  const config = toastConfig[type] || toastConfig.default;

  config.method(message, {
    position: "top-right",
    autoClose: 4000,
    style: config.style
  });
};

export default showToast;