import { useContext } from "react";
import { toastContext } from "../../contexts/toastContext";
import { ToastContainer } from "./components";

const Toast = () => {
  const { toast, setToast } = useContext(toastContext);

  setTimeout(() => {
    setToast({ open: false });
  }, 5000);

  if (!toast.open) {
    return null;
  }

  return (
    <ToastContainer
      type={toast.type}
      className={`toast ${toast.open ? "show" : ""}`}
    >
      <div className="toast-content">
        {toast.type === "success" && <i class="fa-solid fa-check icon"></i>}
        {toast.type === "error" && <i class="fa-solid fa-x-mark icon"></i>}
        {toast.type === "info" && <i class="fa-solid fa-info icon"></i>}
        <div className="message">
          <span className="text text-1">{toast.title}</span>
          <span className="text text-2">{toast.message}</span>
        </div>
      </div>
      <div className="progress"></div>
    </ToastContainer>
  );
};

export default Toast;
