import { useEffect, useState } from "react"
import { Home } from "./pages/home"
import { useThemeStore } from "./store/useStore"
import { LoadingScreen } from "./pages/components/LoadingScreen"

export const App = () => {
  const theme = useThemeStore((state) => state.theme)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Set theme on load
    document.documentElement.setAttribute(
      "data-theme",
      theme
    )

    // Simulate load or wait for actual readiness
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [theme])
  return <>{isLoading ? <LoadingScreen /> : <Home />}</>
}
