import styled from "styled-components";
import colors from "./../../../constants/colors";

const getTypeColor = (type) => {
  switch (type) {
    case "success":
      return colors.types.grass;

    case "info":
      return colors.types.water;

    case "error":
      return colors.types.fighting;

    default:
      return colors.types.fire;
  }
};

const ToastContainer = styled.div`
  &.toast {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000000000000;
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 1ch;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 280px;
    color: black;
    border-left: 6px solid ${(props) => getTypeColor(props.type)};
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    opacity: 0;
    animation: slideOut 0.5s forwards;

    @media screen and (max-width: 768px) {
      width: 90%;
      right: 0;
      top: 60px;
    }
  }

  &.toast.show {
    opacity: 1;
    transition: all 0.3s ease-in-out;
    animation: slideIn 0.5s forwards;
  }

  .toast-content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 13px;
  }

  .icon {
    width: 20px;
    height: 20px;
    padding: 5px;
    background-color: ${(props) => getTypeColor(props.type)};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .message {
    display: flex;
    flex-direction: column;
  }

  .text {
    font-size: 14px;
    color: #666;
  }

  .text-1 {
    color: #333;
    font-weight: 600;
  }

  &.progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
    border-radius: 10px;
    background: #f9f9f9;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: ${(props) => getTypeColor(props.type)};
      border-radius: 10px;
      animation: progress 3s linear infinite;
    }
  }

  @keyframes slideOut {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes slideIn {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes progress {
    0% {
      width: 100%;
    }
    100% {
      width: 0;
    }
  }

  @media screen and (max-width: 768px) {
    .toast {
      width: 90%;
      right: 0;
      top: 20px;
    }
  }
`;

export { ToastContainer };
