import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Word from "../MyContext";
import Search from "../assets/images/icon-search.svg";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-top: 24px;
  max-width: 100%;
  margin-right: 24px;
  margin-left: 24px;
  height: 48px;
  background-color: #f4f4f4;
  border-style: none;
  border-radius: 16px;
  padding-left: 24px;
  background-image: url("${Search}");
  background-repeat: no-repeat;
  background-position: center;
  background-position-x: 95%;

  @media (min-width: 768px) {
    height: 64px;
    font-size: 20px;
    margin-right: 40px;
    margin-left: 40px;
  }
  @media (min-width: 1440px) {
    max-width: 736px;
    margin-left: 351px;
    padding-right: 351px;
  }
`;

export default function SearchInput() {
  const { value, setValue } = useContext(Word);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <MainDiv>
      <Input
        placeholder="Search for any word..."
        value={value}
        onChange={handleChange}
      ></Input>
    </MainDiv>
  );
}
