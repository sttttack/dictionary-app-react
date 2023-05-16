import React, { useState } from "react";
import lightLogo from "../assets/images/logo.svg";
import arrowDown from "../assets/images/icon-arrow-down.svg";
import Moon from "../assets/images/icon-moon.svg";
import styled from "styled-components";

export default function Header() {
  const [currentFont, setCurrentFont] = useState("Fix this");
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(true);
  const toggling = () => setIsOpen(!isOpen);

  const toggleTheme = () => {
    setToggle(!toggle);
  };

  const Div = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 24px;
    padding-left: 24px;
    padding-right: 24px;
    @media (min-width: 768px) {
      margin-right: 18px;
      margin-left: 18px;
      padding-top: 58px;
    }
    @media (min-width: 1439px) {
      padding-left: 351px;
      padding-right: 351px;
    }
  `;

  const DivAnother = styled.div`
    display: flex;
    align-items: center;
  `;

  const LanguageDiv = styled.div`
    display: flex;
    gap: 12px;
    border-right: 1px solid #e9e9e9;
    align-items: center;
    padding-right: 16px;
    height: 32px;
  `;

  const ThemeDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding-left: 16px;
  `;

  const Toggle = styled.div`
    padding-left: 3px;
    padding-top: 3px;
    width: 40px;
    height: 20px;
    background-color: ${({ theme }) =>
      toggle ? theme.colors.gray : theme.colors.pink};
    border-radius: 10px;
  `;

  const Button = styled.div`
    position: relative;
    left: ${({ props }) => (toggle ? "0" : "55%")};
    width: 14px;
    height: 14px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
  `;

  const DropDownContainer = styled("div")``;

  const DropDownHeader = styled("div")`
    font-family: ${({ theme }) => theme.fonts.interBold};
    font-size: 14px;
    color: ${({ theme }) => theme.colors.lightBlack};
  `;

  const DropDownListContainer = styled("div")`
    width: 182px;
    height: 152px;
    position: relative;
    left: 20%;
    top: 62px;
    background-color: #ffffff;
    border-radius: 30px;
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.1);

    @media (min-width: 768px) {
      top: 72px;
      left: 20%;
    }

    @media (min-width: 1439px) {
      top: 72px;
      left: 10%;
    }
  `;

  const DropDownList = styled("ul")`
    color: ${({ theme }) => theme.colors.lightBlack};
    margin-top: 24px;
    padding-top: 24px;
    font-size: 18px;
    width: auto;
    height: 104px;
    cursor: pointer;
  `;

  const ListItem = styled("li")`
    list-style: none;
    margin-bottom: 16px;

    &:nth-child(1) {
      font-family: ${({ theme }) => theme.fonts.interBold};
      font-size: 18px;
    }
    &:nth-child(2) {
      font-size: 18px;
      font-family: ${({ theme }) => theme.fonts.lora};
      font-style: bold;
    }

    &:nth-child(3) {
      font-family: ${({ theme }) => theme.fonts.inconsolata};
      font-size: 18px;
    }
  `;

  return (
    <Div>
      <img src={lightLogo}></img>
      <DivAnother>
        <LanguageDiv>
          <DropDownContainer>
            <DropDownHeader onClick={toggling}>{currentFont}</DropDownHeader>
            {isOpen && (
              <DropDownListContainer>
                <DropDownList>
                  <ListItem>Sans Serif</ListItem>
                  <ListItem>Serif</ListItem>
                  <ListItem>Monospace</ListItem>
                </DropDownList>
              </DropDownListContainer>
            )}
          </DropDownContainer>
          <img src={arrowDown} alt="arrow down" onClick={toggling}></img>
        </LanguageDiv>
        <ThemeDiv>
          <Toggle>
            <Button onClick={toggleTheme} />
          </Toggle>
          <img src={Moon} alt="moon"></img>
        </ThemeDiv>
      </DivAnother>
    </Div>
  );
}
