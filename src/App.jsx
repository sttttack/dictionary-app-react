import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/Global";
import { theme } from "./styles/Theme";
import Header from "./components/Header";
import SearchInput from "./components/SearchInput";
import Dictionary from "./components/Dictionary";
import Word from "./MyContext";
import { useState } from "react";

function App() {
  const [value, setValue] = useState("");

  return (
    <>
      <Word.Provider value={{ value, setValue }}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Header />
          <SearchInput />
          <Dictionary />
        </ThemeProvider>
      </Word.Provider>
    </>
  );
}

export default App;
