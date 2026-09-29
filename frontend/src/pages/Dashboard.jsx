function Dashboard() {
  return (
    <>
      {/* Top Bar */}
    <header className="topbar">

  <div>
    <p className="page-label">OVERVIEW</p>

    <h1>Good morning, Student 👋</h1>

    <p>
      Here's what's happening with your studies today.
    </p>
  </div>

  <div className="profile">
    <div className="avatar">
      A
    </div>

    <div>
      <strong>Student</strong>
      <span>Student Account</span>
    </div>
  </div>

</header>


      {/* Statistics */}
     <section className="stats-grid">

  <div className="stat-card">
    <div className="stat-icon subjects-icon">
  📚
</div>

    <div className="stat-content">
      <p>Subjects</p>
      <h2>0</h2>
      <span>Active subjects</span>
    </div>
  </div>


  <div className="stat-card">
<div className="stat-icon tasks-icon">
  ✅
</div>

    <div className="stat-content">
      <p>Tasks</p>
      <h2>0</h2>
      <span>Pending tasks</span>
    </div>
  </div>


  <div className="stat-card">
   <div className="stat-icon time-icon">
  ⏱️
</div>

    <div className="stat-content">
      <p>Study Time</p>
      <h2>0h</h2>
      <span>This week</span>
    </div>
  </div>


  <div className="stat-card">
  <div className="stat-icon streak-icon">
  🔥
</div>

    <div className="stat-content">
      <p>Study Streak</p>
      <h2>0</h2>
      <span>Days</span>
    </div>
  </div>

</section>


      {/* Main Dashboard Grid */}
      <section className="dashboard-grid">

        {/* Today's Tasks */}
        <div className="dashboard-card">

          <div className="card-header">

            <div>
              <h2>Today's Tasks</h2>
              <p>Stay on top of your work</p>
            </div>

            <button>
              + Add Task
            </button>

          </div>

          <div className="empty-state">

            <div className="empty-icon">
              ✅
            </div>

            <h3>No tasks yet</h3>

            <p>
              Add a task to start organizing your day.
            </p>

          </div>

        </div>


        {/* Quick Actions */}
        <div className="dashboard-card">

          <div className="card-header">

            <div>
              <h2>Quick Actions</h2>
              <p>Jump into your study tools</p>
            </div>

          </div>

          <div className="quick-actions">

            <button>
              📚 Add Subject
            </button>

            <button>
              📝 Create Note
            </button>

            <button>
              ⏱️ Start Studying
            </button>

            <button>
              🤖 Ask AI Tutor
            </button>

          </div>

        </div>

      </section>


      {/* AI Section */}
      <section className="ai-banner">

        <div className="ai-banner-icon">
          🤖
        </div>

        <div className="ai-banner-content">

          <h2>
            Study smarter with AI
          </h2>

          <p>
            Ask questions, summarize your notes,
            generate practice questions and learn
            from your own study materials.
          </p>

        </div>

        <button>
          Open AI Tutor →
        </button>

      </section>

    </>
  );
}

export default Dashboard;