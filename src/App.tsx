import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, LucideUsers2 } from "lucide-react";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import Tasks from "./pages/Tasks";
import UsersPage from "./pages/UsersPage";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <main className="App flex">
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          active={location.pathname === "/" || location.pathname === "/tasks"}
          onClick={() => navigate("/tasks")}
        />
        <SidebarItem
          icon={<LucideUsers2 size={20} />}
          text="Users"
          active={location.pathname === "/users"}
          onClick={() => navigate("/users")}
        />
      </Sidebar>

      <div className="flex-1 px-8 py-6 overflow-auto">
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
