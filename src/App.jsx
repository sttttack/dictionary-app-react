import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import { useState } from "react";
import { GlobalStyles } from "./styles/Global";
import { theme } from "./styles/Theme";
import Header from "./components/Header";
import SearchInput from "./components/SearchInput";
import Dictionary from "./components/Dictionary";
import Word from "./MyContext";
import Dark from "./DarkContext";

function App() {
  const [value, setValue] = useState("");
  const [dark, setDark] = useState(false);

  return (
    <>
      <Dark.Provider value={{ dark, setDark }}>
        <Word.Provider value={{ value, setValue }}>
          <ThemeProvider theme={theme}>
            <GlobalStyles dark={dark} />
            <Header />
            <SearchInput />
            <Dictionary />
          </ThemeProvider>
        </Word.Provider>
      </Dark.Provider>
    </>
  );
}

export default App;
