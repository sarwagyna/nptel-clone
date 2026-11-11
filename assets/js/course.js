/*
 * Course detail page. Usage: course.html?id=noc26-cs133
 * Add &celebrate=1 to open the "Congratulations" modal on load.
 */
(function () {
  const { courses, enrollment, esc, scoreClass, SWAYAM_URL } = window.NPTEL;

  // Where "Create my post" should send the student (the Imprzd post maker).
  // Left empty on purpose: set it to the real URL and the button will open it in a new tab.
  const POST_URL = '';

  const root = document.getElementById('course-root');
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || 'noc26-cs133';
  const course = courses.find((c) => c.id === id);

  const dash = '—';

  /* ---------- not found ---------- */
  if (!course) {
    document.title = 'Course not found | NPTEL';
    const box = document.createElement('div');
    box.className = 'text-center py-5';
    const msg = document.createElement('p');
    msg.className = 'lead';
    msg.textContent = `No course found for "${id}".`;
    const back = document.createElement('a');
    back.className = 'btn btn-outline-secondary';
    back.href = 'index.html';
    back.innerHTML = '<i class="bi bi-arrow-left me-1"></i>Back to My Courses';
    box.append(msg, back);
    root.appendChild(box);
    return;
  }

  document.title = `${course.name} | NPTEL`;

  /* ---------- derived values ---------- */
  const certified = course.status === 'certified';
  const fmt = (n) => (n == null ? dash : Number(n).toFixed(2));

  const assignments = (course.assignments || Array.from({ length: 12 }, () => null)).map((score, i) => ({
    week: i + 1,
    name: `Week ${i + 1} Assignment`,
    max: 100,
    score
  }));
  const submitted = assignments.filter((a) => a.score != null);
  const average = submitted.length
    ? (submitted.reduce((s, a) => s + a.score, 0) / submitted.length).toFixed(2)
    : '-';

  /* ---------- fragments ---------- */
  const resultBody = () => {
    const final = course.score;
    const stat = (num, max, label, cls = '') => `
      <div class="result-stat">
        <div class="num ${cls}">${num} <small>/ ${max}</small></div>
        <div class="lbl">${label}</div>
      </div>`;

    const buttons = certified
      ? `
        <a class="btn btn-success btn-sm" href="#" data-cert><i class="bi bi-download me-1"></i>Download Certificate</a>
        <span class="celebrate-wrap">
          <button type="button" class="btn btn-nptel btn-sm" data-bs-toggle="modal" data-bs-target="#celebrateModal">
            <span aria-hidden="true">🎉</span> Celebrate your achievement
          </button>
          <small>Make a post to share, if you'd like</small>
        </span>
        <span class="result-note">Issue reporting closed</span>`
      : '';

    return `
      <div class="result-body">
        <div class="result-stats">
          ${stat(fmt(course.assignment), 25, 'Assignment')}
          ${stat(fmt(course.exam), 75, 'Exam')}
          ${stat(fmt(final), 100, 'Final', final == null ? '' : scoreClass(final))}
        </div>
        <div class="result-actions">${buttons}</div>
      </div>`;
  };

  const kv = (k, v) => `<div class="kv"><span class="k">${k}</span><span class="v">${v}</span></div>`;

  const enrollmentBody = () => `
    <div class="detail-body">
      ${kv('Application Number', esc(enrollment.applicationNumber))}
      ${kv('Registration Date', esc(course.registered || dash))}
      ${kv('Institution', esc(enrollment.institution))}
      ${kv('LC ID', esc(enrollment.lcId))}
      ${kv('Payment Status', `<span class="badge bg-success">${esc(enrollment.payment)}</span>`)}
      ${kv('Exam Registration', `<span class="badge bg-success">${esc(enrollment.examRegistration)}</span>`)}
    </div>`;

  const assignmentRows = assignments
    .map((a) => {
      const pct = a.score == null ? '-' : `${((a.score / a.max) * 100).toFixed(0)}%`;
      const badge =
        a.score == null
          ? '<span class="badge bg-secondary">Not Submitted</span>'
          : '<span class="badge bg-success">Submitted</span>';
      return `
        <tr>
          <td><span class="badge bg-secondary">Week ${a.week}</span></td>
          <td>${esc(a.name)}</td>
          <td class="c">${a.max}</td>
          <td class="c">${a.score == null ? '-' : a.score}</td>
          <td class="c">${pct}</td>
          <td>${badge}</td>
        </tr>`;
    })
    .join('');

  /* ---------- page ---------- */
  root.innerHTML = `
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="index.html">My Courses</a></li>
        <li class="breadcrumb-item active" aria-current="page">${esc(course.id)}</li>
      </ol>
    </nav>

    <div class="course-hero mb-4">
      <h1>${esc(course.name)}</h1>
      <p>${esc(course.id)} | ${esc(course.semester)} ${esc(course.year)}</p>
    </div>

    <section class="panel mb-4" aria-labelledby="resultHeading">
      <div class="panel-bar">
        <h2 id="resultHeading"><i class="bi bi-clipboard-data"></i> Result</h2>
        <a class="btn btn-sm btn-outline-success" href="${SWAYAM_URL}" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right me-1"></i>SWAYAM</a>
      </div>
      ${resultBody()}
    </section>

    <div class="row g-4 mb-4">
      <div class="col-lg-4">
        <section class="panel detail-card h-100">
          <div class="panel-bar"><h2><i class="bi bi-info-circle"></i> Enrollment Details</h2></div>
          ${enrollmentBody()}
        </section>
      </div>
      <div class="col-lg-8">
        <section class="panel detail-card h-100">
          <div class="panel-bar"><h2><i class="bi bi-graph-up"></i> Score Summary</h2></div>
          <div class="summary-body">
            <div class="summary-stat"><div class="big">${assignments.length}</div><div class="lbl">Total Assignments</div></div>
            <div class="summary-stat"><div class="big">${average === '-' ? '-' : average}</div><div class="lbl">Average Score</div></div>
          </div>
        </section>
      </div>
    </div>

    <section class="panel" aria-labelledby="assignHeading">
      <div class="panel-bar"><h2 id="assignHeading"><i class="bi bi-list-check"></i> Assignment Scores</h2></div>
      <div class="table-responsive">
        <table class="table assign-table">
          <colgroup>
            <col style="width:12.3%"><col style="width:27%"><col style="width:11.4%">
            <col style="width:17.9%"><col style="width:12.2%"><col style="width:19.2%">
          </colgroup>
          <thead>
            <tr>
              <th>Week</th>
              <th>Assignment</th>
              <th class="c">Max Score</th>
              <th class="c">Your Score</th>
              <th class="c">Percentage</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>${assignmentRows}</tbody>
        </table>
      </div>
    </section>

    <a href="index.html" class="btn btn-outline-secondary mt-4"><i class="bi bi-arrow-left me-1"></i>Back to My Courses</a>
  `;

  /* ---------- behaviour ---------- */
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-cert]')) e.preventDefault(); // no backend in this static build
  });

  const modalEl = document.getElementById('celebrateModal');
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

  document.getElementById('createPost').addEventListener('click', () => {
    if (POST_URL) window.open(POST_URL, '_blank', 'noopener');
    modal.hide();
  });

  if (certified && params.get('celebrate') === '1') modal.show();
})();
