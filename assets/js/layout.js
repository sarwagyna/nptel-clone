/*
 * Shared page chrome (navbar, migration banner, footer, floating report button).
 * Each <script src="layout.js" data-part="..."> inserts its part right where the tag sits,
 * so there is no flash of missing layout.
 */
(function () {
  const script = document.currentScript;
  const part = script && script.dataset.part;

  /* ---- Footer artwork (images live in assets/img; swap the files to change a logo) ---- */
  const partnerFiles = ['partner-1.png', 'partner-2.png', 'partner-3.png', 'partner-4.png',
                        'partner-5.png', 'partner-6.png', 'partner-7.png', 'partner-8.png'];
  const partners = partnerFiles
    .map((f) => `<img src="assets/img/${f}" alt="" height="40">`)
    .join('');

  const logo = `<img class="nptel-logo" src="assets/img/nptel-logo.png" alt="NPTEL" width="133" height="30">`;

  const templates = {
    header: () => `
      <nav class="navbar navbar-expand-lg navbar-dark nptel-navbar">
        <div class="container-fluid">
          <a class="navbar-brand" href="index.html"><i class="bi bi-mortarboard-fill"></i> NPTEL</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"
                  aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mainNav">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item"><a class="nav-link" href="dashboard.html"><i class="bi bi-speedometer2"></i> Dashboard</a></li>
              <li class="nav-item"><a class="nav-link" href="index.html"><i class="bi bi-book"></i> My Courses</a></li>
              <li class="nav-item"><a class="nav-link" href="#"><i class="bi bi-award"></i> Certificates</a></li>
              <li class="nav-item"><a class="nav-link" href="#"><i class="bi bi-ticket-perforated"></i> Halltickets</a></li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="bi bi-building"></i> LC
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">LC Dashboard</a></li>
                  <li><a class="dropdown-item" href="#">Registrations</a></li>
                </ul>
              </li>
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="bi bi-person-circle"></i> sarwannandhofficial672007@gmail.com
                </a>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a class="dropdown-item" href="#">Profile</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#">Log out</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="migration-banner" role="note">
        <i class="bi bi-info-circle"></i>
        Previous semester scores and certificates have been migrated to this website! Please check yours, and if anything
        is missing or incorrect, cross-verify against the
        <a href="https://archive.nptel.ac.in" target="_blank" rel="noopener">old website (archive.nptel.ac.in)</a>,
        and if you still find an issue, <a href="#">report a problem</a>.
      </div>`,

    footer: () => `
      <footer class="site-footer">
        <div class="container">
          <div class="row gy-4">
            <div class="col-md-4">${logo}</div>
            <div class="col-md-4">
              <h6>About NPTEL</h6>
              <p>National Programme on Technology Enhanced Learning (NPTEL) is a joint initiative of the IITs and IISc to offer online courses &amp; certification.</p>
              <p>Funded by MoE, Govt. of India.</p>
              <h6 class="mt-3">Follow Us</h6>
              <div class="follow">
                <a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
                <a href="#" aria-label="Twitter"><i class="bi bi-twitter"></i></a>
                <a href="#" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
                <a href="#" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
              </div>
            </div>
            <div class="col-md-4">
              <h6>Our Partners</h6>
              <div class="partners">${partners}</div>
            </div>
          </div>
          <hr>
          <p class="copy">&copy; 2026 NPTEL - All rights reserved. National Programme on Technology Enhanced Learning, IIT Madras</p>
        </div>
      </footer>`,

    report: () => `<a href="#" class="report-fab"><i class="bi bi-bug"></i> Report a problem</a>`
  };

  if (script && templates[part]) {
    script.insertAdjacentHTML('beforebegin', templates[part]());
  }
})();
