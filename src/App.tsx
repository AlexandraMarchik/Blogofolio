import React from "react";

import ThemeProvider from "./context/Theme/Provider";
import { Theme } from "./context/Theme/Context";
import Router from "./pages/Router";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme, ThemeSelectors } from "./redux/reducers/themeSlice";

const App = () => {
  const dispatch = useDispatch();

  const onChangeTheme = (value: Theme) => {
    dispatch(changeTheme(value));
  };
  const theme = useSelector(ThemeSelectors.getThemeValue);

  return (
    <ThemeProvider theme={theme} onChangeTheme={onChangeTheme}>
      <Router />
    </ThemeProvider>
  );
};

export default App;
