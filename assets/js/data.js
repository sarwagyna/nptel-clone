/* Mock data + small helpers shared by both pages. */
window.NPTEL = (function () {
  const SWAYAM_URL = 'https://swayam.gov.in';
  const CERTIFICATE_URL = 'verify/NOC-ARF7-36RY-DHWFZ/credential.pdf';

  const courses = [
    {
      id: 'noc26-cs133',
      name: 'Introduction to Machine Learning',
      semester: 'Jul-Dec',
      year: 2026,
      current: true,
      status: 'certified',
      score: 51,
      assignment: 21,
      exam: 30,
      assignments: [90, 95, 85, 90, null, null, 40, 90, 92, 90, null, null],
      registered: 'July 23, 2026'
    },
    { id: 'noc26-cs39', name: 'Data Base Management System', semester: 'Jan-Apr', year: 2026, status: 'certified', score: 67 },
    { id: 'noc26-hs100', name: 'United Nations Sustainable Development Goals (UN SDGs)', semester: 'Jan-Apr', year: 2026, status: 'enrolled' },
    { id: 'noc26-cs67', name: 'Design and analysis of algorithms', semester: 'Jan-Apr', year: 2026, status: 'enrolled' },
    { id: 'noc26-cs72', name: 'Introduction to Database Systems', semester: 'Jan-Apr', year: 2026, status: 'enrolled' },
    { id: 'noc26-cs63', name: 'Artificial Intelligence: Knowledge Representation And Reasoning', semester: 'Jan-Apr', year: 2026, status: 'enrolled' },
    { id: 'noc25-cs110', name: 'Programming In Java', semester: 'Jul-Dec', year: 2025, status: 'certified', score: 83 },
    { id: 'noc25-cs34', name: 'Fundamentals of Object Oriented Programming', semester: 'Jan-Apr', year: 2025, status: 'certified', score: 61 }
  ];

  const enrollment = {
    applicationNumber: 'None',
    institution: 'SRM Institute of Science and Technology - Kattankulathur Campus',
    lcId: '183',
    payment: 'Paid',
    examRegistration: 'Registered'
  };

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

  // green >= 75, amber >= 40, red below
  const scoreClass = (n) => (n == null ? 'none' : n >= 75 ? 'high' : n >= 40 ? 'mid' : 'low');

  return { SWAYAM_URL, CERTIFICATE_URL, courses, enrollment, esc, scoreClass };
})();
