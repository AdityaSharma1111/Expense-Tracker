import { Outlet } from "react-router-dom"
import toast, {Toaster} from 'react-hot-toast';
import {ThemeProvider} from "./context/theme";
import { useState, useEffect } from "react";

function App() {
  const [themeMode, setThemeMode] = useState("light")

  const lightTheme = () => {
    setThemeMode("light")
  }

  const darkTheme = () => {
    setThemeMode("dark")
  }

  // actual change in theme

  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark") // remove whichever class is present
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])


  return (
    <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
      <Outlet />
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: '13px'
          }
        }}
      />
    </ThemeProvider>
  )
}

export default App
