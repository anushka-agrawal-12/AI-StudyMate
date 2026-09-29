import { NavLink, Outlet } from "react-router-dom";
function DashboardLayout() {
  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="logo">
          🎓 AI StudyMate
        </div>

        <nav className="sidebar-nav">
<NavLink
  to="/dashboard"
  className={({ isActive }) =>
    isActive ? "nav-item active" : "nav-item"
  }
>
  🏠 Dashboard
</NavLink>

         <NavLink
  to="/subjects"
  className={({ isActive }) =>
    isActive ? "nav-item active" : "nav-item"
  }
>
  📚 Subjects
</NavLink>

<NavLink
  to="/tasks"
  className={({ isActive }) =>
    isActive ? "nav-item active" : "nav-item"
  }
>
  ✅ Tasks
</NavLink>

          <div className="nav-item">
            📝 Notes
          </div>

          <div className="nav-item">
            ⏱️ Study Timer
          </div>

          <div className="nav-item">
            📊 Analytics
          </div>

          <div className="nav-item">
            🤖 AI Tutor
          </div>

        </nav>

        <div className="sidebar-bottom">
          ⚙️ Settings
        </div>

      </aside>

      {/* Page Content */}
      <main className="dashboard-main">

        <Outlet />

      </main>

    </div>
  );
}

export default DashboardLayout;