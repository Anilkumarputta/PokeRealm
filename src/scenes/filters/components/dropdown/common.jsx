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
  height: 45px;
  background-color: ${colors.blue[600]};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
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
    background-color: ${colors.blue[700]};
  }
`;

const DropdownList = styled.ul`
  list-style-type: none;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;
  transition: all 0.3s ease;
  display: none;

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
  height: 30px;
  background-color: ${colors.blue[600]};
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
