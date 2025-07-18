import { Bell, LogOut, CreditCard, Settings, LayoutDashboard } from "lucide-react"
import { Button } from "./ui/button"
import { ThemeToggle } from "./ui/theme-toggle"
import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"

export function Header() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleHomeClick = () => {
    navigate("/")
  }

  const handleSettingsClick = () => {
    navigate("/settings")
  }

  const handleDashboardClick = () => {
    navigate("/dashboard")
  }

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm glass-effect">
      <div className="flex h-16 items-center justify-between px-6">
        <div 
          className="text-xl font-bold cursor-pointer hover:text-primary transition-colors flex items-center gap-2 glow-effect shiny-effect rounded-lg px-3 py-2"
          onClick={handleHomeClick}
        >
          <CreditCard className="h-6 w-6 text-primary" />
          Subscribe Codex
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user && (
            <>
              <Button variant="ghost" size="icon" onClick={handleDashboardClick} className="glow-effect shiny-effect">
                <LayoutDashboard className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="glow-effect shiny-effect">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSettingsClick} className="glow-effect shiny-effect">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="glow-effect shiny-effect">
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          )}
          {!user && (
            <Button onClick={() => navigate('/login')} className="glow-effect shiny-effect">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}