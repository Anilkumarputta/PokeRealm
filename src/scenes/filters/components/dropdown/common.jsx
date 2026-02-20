import styled from "styled-components";
import colors from "./../../../../constants/colors";

const DropdownContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
`;

const DropdownBtn = styled.button`
  width: 100%;
  min-height: 42px;
  background: linear-gradient(135deg, ${colors.blue[700]} 0%, ${colors.blue[600]} 100%);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 10px;
  }

  &:hover {
    background: linear-gradient(135deg, ${colors.blue[800]} 0%, ${colors.blue[700]} 100%);
  }
`;

const DropdownList = styled.ul`
  list-style-type: none;
  position: absolute;
  top: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  z-index: 100;
  transition: all 0.3s ease;
  display: none;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.24);

  &.active {
    animation: slide-in-top 0.5s ease;
    display: block;
    top: 42px;
  }

  @-webkit-keyframes slide-in-top {
    0% {
      -webkit-transform: translateY(-5px);
      transform: translateY(-5px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-top {
    0% {
      -webkit-transform: translateY(-5px);
      transform: translateY(-5px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const DropdownItem = styled.li`
  width: 100%;
  min-height: 34px;
  background-color: var(--surface-panel);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;

  &:hover {
    background-color: ${colors.blue[700]};
  }

  &:active {
    background-color: ${colors.blue[800]};
    border: none;
    outline: none;
  }

  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.bg ?? colors.blue[600]};
    border: none;
    padding: 5px;
  }
`;

export { DropdownContainer, DropdownBtn, DropdownList, DropdownItem };
