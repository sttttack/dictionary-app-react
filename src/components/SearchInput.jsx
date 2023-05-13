import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Word from "../MyContext";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-top: 24px;
  margin-left: 24px;
  width: 90%;
  height: 48px;
  background-color: #f4f4f4;
  border-style: none;
  border-radius: 16px;
  padding-left: 24px;
  background-image: url("src/assets/images/icon-search.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-position-x: 90%;
`;

const EmptyValue = styled.p`
  font-size: 16px;
  color: #ff5252;
  margin-left: 24px;
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
      {/* <EmptyValue>{wordValue ? "" : ""}</EmptyValue> */}
    </MainDiv>
  );
}
