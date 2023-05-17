import React, { useContext, useEffect, useState } from "react";
import lightLogo from "../assets/images/logo.svg";
import arrowDown from "../assets/images/icon-arrow-down.svg";
import Moon from "../assets/images/icon-moon.svg";
import styled from "styled-components";
import Dark from "../DarkContext";
import { theme } from "../styles/Theme";

export default function Header() {
  const [currentFont, setCurrentFont] = useState("Sans Serif");
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(true);
  const toggling = () => setIsOpen(!isOpen);
  const { dark, setDark } = useContext(Dark);

  const toggleTheme = () => {
    setToggle(!toggle);
    setDark(!dark);
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
    @media (min-width: 1024px) {
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
      dark ? theme.light.pink : theme.light.gray};
    border-radius: 10px;
    cursor: pointer;
  `;

  const Button = styled.div`
    position: relative;
    left: ${({ props }) => (toggle ? "0" : "55%")};
    transition: 0.3s;

    width: 14px;
    height: 14px;
    background-color: ${({ theme }) => theme.light.white};
    border-radius: 50%;
  `;

  const DropDownContainer = styled("div")``;

  const DropDownHeader = styled("div")`
    font-size: 14px;
    cursor: pointer;
    color: ${({ theme, dark }) =>
      !dark ? theme.light.black : theme.dark.white};
  `;

  const DropDownListContainer = styled("div")`
    width: 182px;
    height: 152px;
    position: relative;
    left: 20%;
    top: 62px;
    background-color: ${({ theme }) =>
      !dark ? theme.light.white : theme.dark.lightBlackTwo};
    border-radius: 30px;
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.1);

    @media (min-width: 768px) {
      top: 72px;
      left: 20%;
    }

    @media (min-width: 1024px) {
      top: 72px;
      left: 10%;
    }
  `;

  const DropDownList = styled("ul")`
    color: ${({ theme }) => theme.light.lightBlack};
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
      color: ${({ theme, dark }) =>
        !dark ? theme.light.black : theme.dark.white};
    }
    &:nth-child(2) {
      font-size: 18px;
      font-family: ${({ theme }) => theme.fonts.lora};
      font-style: bold;
      color: ${({ theme, dark }) =>
        !dark ? theme.light.black : theme.dark.white};
    }

    &:nth-child(3) {
      font-family: ${({ theme }) => theme.fonts.inconsolata};
      font-size: 18px;
      color: ${({ theme, dark }) =>
        !dark ? theme.light.black : theme.dark.white};
    }

    &:hover {
      color: ${({ theme }) => theme.light.pink};
    }
  `;

  const changeLanguage = (theme) => {
    document.body.style.fontFamily = theme.fonts.interBold;
    setIsOpen(!true);
    setCurrentFont("Sans Serif");
  };
  const changeLanguageBold = (theme) => {
    document.body.style.fontFamily = theme.fonts.lora;
    setIsOpen(!true);
    setCurrentFont("Serif");
  };
  const changeLanguageRegular = (theme) => {
    document.body.style.fontFamily = theme.fonts.inconsolata;
    setIsOpen(!true);
    setCurrentFont("Mono");
  };

  return (
    <Div>
      <img src={lightLogo}></img>
      <DivAnother>
        <LanguageDiv>
          <DropDownContainer>
            <DropDownHeader onClick={toggling} dark={dark}>
              {currentFont}
            </DropDownHeader>
            {isOpen && (
              <DropDownListContainer>
                <DropDownList>
                  <ListItem onClick={() => changeLanguage(theme)} dark={dark}>
                    Sans Serif
                  </ListItem>
                  <ListItem
                    onClick={() => changeLanguageBold(theme)}
                    dark={dark}
                  >
                    Serif
                  </ListItem>
                  <ListItem
                    onClick={() => changeLanguageRegular(theme)}
                    dark={dark}
                  >
                    Monospace
                  </ListItem>
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
