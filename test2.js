return (
  <div
    id="homepage"
    className="min-h-screen bg-base-200 text-base-content"
  >
    {/* Navbar */}
    <nav
      id="navbar"
      className="bg-base-100 shadow-md px-5 py-4"
    >
      <div
        id="navbar-container"
        className="mx-auto flex max-w-6xl items-center justify-between"
      >
        <NavLink
          id="logo"
          to="/"
          className="text-2xl font-bold text-primary"
        >
          CodeMaster
        </NavLink>

        <div
          id="user-actions"
          className="flex items-center gap-3"
        >
          <span id="welcome-text" className="font-medium">
            Hi, {user?.firstName}
          </span>

          {user?.role === "admin" && (
            <NavLink
              id="admin-panel-btn"
              to="/admin"
              className="rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-content"
            >
              Admin Panel
            </NavLink>
          )}

          <button
            id="logout-btn"
            onClick={handleLogout}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>

    {/* Main Content */}
    <main
      id="main-content"
      className="mx-auto max-w-6xl p-6"
    >

      {/* Filters */}
      <div
        id="filters"
        className="mb-8 flex flex-wrap gap-4"
      >

        <select
          id="status-filter"
          ...
        >
        </select>

        <select
          id="difficulty-filter"
          ...
        >
        </select>

        <select
          id="tag-filter"
          ...
        >
        </select>

      </div>

      {/* Problem List */}
      <div
        id="problem-list"
        className="space-y-4"
      >
        {filteredProblems.length === 0 ? (
          <div
            id="no-problems"
            className="mt-10 text-center text-lg"
          >
            No Problems Found
          </div>
        ) : (
          filteredProblems.map((problem) => {
            const isSolved = solvedProblems.some(
              (sp) => sp._id === problem._id
            );

            return (
              <div
                id={`problem-${problem._id}`}
                key={problem._id}
                className="rounded-xl bg-base-100 p-5 shadow-md transition hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <NavLink
                    id={`problem-link-${problem._id}`}
                    to={`/problem/${problem._id}`}
                    className="text-lg font-semibold transition hover:text-primary"
                  >
                    {problem.title}
                  </NavLink>

                  {isSolved && (
                    <span
                      id={`solved-badge-${problem._id}`}
                      className="rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white"
                    >
                      Solved
                    </span>
                  )}
                </div>

                <div
                  id={`problem-tags-${problem._id}`}
                  className="mt-4 flex flex-wrap gap-2"
                >
                  <span
                    id={`difficulty-${problem._id}`}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getDifficultyBadgeColor(problem.difficulty)}`}
                  >
                    {problem.difficulty}
                  </span>

                  {problem.tags?.map((tag) => (
                    <span
                      id={`tag-${problem._id}-${tag}`}
                      key={tag}
                      className="rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

    </main>

    <footer id="footer">
      {/* Footer (if you add one later) */}
    </footer>
  </div>
);