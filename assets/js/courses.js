/* My Courses page: renders current / past courses, list + grid views, and filtering. */
(function () {
  const { courses, esc, scoreClass, SWAYAM_URL, CERTIFICATE_URL } = window.NPTEL;
  const $ = (id) => document.getElementById(id);

  const state = { view: 'list', semester: 'all', year: 'all', status: 'all' };

  const STATUS_LABEL = { certified: 'Passed / Certified', enrolled: 'Enrolled' };

  /* ---------- fragments ---------- */
  const semesterLabel = (c) => `${c.semester} ${c.year}`;

  const statusBadges = (c) =>
    c.status === 'certified'
      ? `<span class="badge status-badge bg-success">Passed / Certified</span>
         <span class="badge status-badge bg-success"><i class="bi bi-award me-1"></i>Certified</span>`
      : `<span class="badge status-badge badge-nptel">Enrolled</span>`;

  const scoreCell = (c) =>
    c.score == null
      ? '<span class="score none">—</span>'
      : `<span class="score ${scoreClass(c.score)}">${c.score.toFixed(1)} / 100</span>`;

  const actions = (c) => {
    const cert =
      c.status === 'certified'
        ? `<a class="btn btn-sm btn-nptel" href="${CERTIFICATE_URL}" download><i class="bi bi-download me-1"></i>Certificate</a>`
        : '';
    const view = `<a class="btn btn-sm btn-outline-primary" href="course.html?id=${encodeURIComponent(c.id)}"><i class="bi bi-eye me-1"></i>View</a>`;
    const swayam = c.current
      ? `<a class="btn btn-sm btn-outline-success" href="${SWAYAM_URL}" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right me-1"></i>SWAYAM</a>`
      : '';
    return cert + view + swayam;
  };

  /* ---------- list (table) view ---------- */
  const tableView = (list) => {
    const rows = list.length
      ? list
          .map(
            (c) => `
        <tr>
          <td>${esc(c.name)}</td>
          <td><span class="noc-badge">${esc(c.id)}</span></td>
          <td class="text-nowrap">${esc(semesterLabel(c))}</td>
          <td><div class="badges">${statusBadges(c)}</div></td>
          <td>${scoreCell(c)}</td>
          <td><div class="actions">${actions(c)}</div></td>
        </tr>`
          )
          .join('')
      : '<tr class="empty-row"><td colspan="6">No courses match the selected filters.</td></tr>';

    return `
      <div class="course-table-wrap table-responsive">
        <table class="table course-table align-middle">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>NOC ID</th>
              <th>Semester</th>
              <th>Status</th>
              <th>Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  };

  /* ---------- grid (card) view ---------- */
  const gridView = (list) => {
    if (!list.length) return '<p class="text-muted mb-0">No courses match the selected filters.</p>';
    return `
      <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
        ${list
          .map(
            (c) => `
          <div class="col">
            <div class="card course-card h-100">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="noc-badge">${esc(c.id)}</span>
                  <span class="text-muted small">${esc(semesterLabel(c))}</span>
                </div>
                <h3 class="h6 mb-3">${esc(c.name)}</h3>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="badges d-flex gap-1 flex-wrap">${statusBadges(c)}</div>
                  ${scoreCell(c)}
                </div>
              </div>
              <div class="card-footer bg-transparent">${actions(c)}</div>
            </div>
          </div>`
          )
          .join('')}
      </div>`;
  };

  /* ---------- render ---------- */
  const matches = (c) =>
    (state.semester === 'all' || c.semester === state.semester) &&
    (state.year === 'all' || String(c.year) === state.year) &&
    (state.status === 'all' || c.status === state.status);

  const render = () => {
    const visible = courses.filter(matches);
    const current = visible.filter((c) => c.current);
    const past = visible.filter((c) => !c.current);
    const draw = state.view === 'grid' ? gridView : tableView;

    $('currentCount').textContent = current.length;
    $('pastCount').textContent = past.length;
    $('currentList').innerHTML = draw(current);
    $('pastList').innerHTML = draw(past);
  };

  /* ---------- filter options ---------- */
  const fill = (select, values, label = (v) => v) => {
    values.forEach((v) => {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = label(v);
      select.appendChild(opt);
    });
  };
  const unique = (arr) => [...new Set(arr)];

  fill($('fSemester'), unique(courses.map((c) => c.semester)).sort());
  fill($('fYear'), unique(courses.map((c) => String(c.year))).sort().reverse());
  fill($('fStatus'), unique(courses.map((c) => c.status)), (s) => STATUS_LABEL[s] || s);

  /* ---------- events ---------- */
  $('filterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    state.semester = $('fSemester').value;
    state.year = $('fYear').value;
    state.status = $('fStatus').value;
    render();
  });

  const setView = (view) => {
    state.view = view;
    $('viewList').classList.toggle('active', view === 'list');
    $('viewGrid').classList.toggle('active', view === 'grid');
    render();
  };
  $('viewList').addEventListener('click', () => setView('list'));
  $('viewGrid').addEventListener('click', () => setView('grid'));

  render();
})();
