/* Dashboard: summary tiles, recent activity, upcoming deadlines. */
(function () {
  const { courses, esc } = window.NPTEL;
  const byId = Object.fromEntries(courses.map((c) => [c.id, c]));

  // Values the dashboard shows that are not derivable from the course list.
  const activeEnrollments = 0;
  const pendingExams = 0;
  const deadlines = []; // [{ title, due }]

  // Recent activity, in display order, with the badge each row carries.
  const recent = [
    { id: 'noc25-cs110', badge: 'Completed' },
    { id: 'noc25-cs34', badge: 'Completed' },
    { id: 'noc26-cs133', badge: 'Enrolled' },
    { id: 'noc26-cs67', badge: 'Enrolled' },
    { id: 'noc26-hs100', badge: 'Enrolled' }
  ];

  // ---- Tiles ----
  const setText = (id, value) => { document.getElementById(id).textContent = value; };
  setText('statTotal', courses.length);
  setText('statCerts', courses.filter((c) => c.status === 'certified').length);
  setText('statActive', activeEnrollments);
  setText('statPending', pendingExams);

  // ---- Recent activity ----
  document.getElementById('recentList').innerHTML = recent
    .filter((r) => byId[r.id])
    .map((r) => {
      const c = byId[r.id];
      return `
        <div class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <h6 class="mb-1">${esc(c.name)}</h6>
            <small class="text-muted">${esc(c.id)} - ${esc(c.semester)} ${esc(c.year)}</small>
          </div>
          <span class="badge activity-badge bg-success">${esc(r.badge)}</span>
        </div>`;
    })
    .join('');

  // ---- Upcoming deadlines ----
  if (deadlines.length) {
    document.getElementById('deadlines').className = 'card-body p-3';
    document.getElementById('deadlines').innerHTML =
      '<ul class="list-unstyled mb-0">' +
      deadlines.map((d) => `<li class="d-flex justify-content-between py-1"><span>${esc(d.title)}</span><small class="text-muted">${esc(d.due)}</small></li>`).join('') +
      '</ul>';
  }
})();
