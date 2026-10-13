const currentYear = document.querySelector("[data-current-year]");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const studentSearch = document.querySelector("[data-student-search]");

if (studentSearch) {
  const studentRows = Array.from(document.querySelectorAll(".table-wrap tbody tr"));
  const searchStatus = document.querySelector("[data-search-status]");

  studentSearch.addEventListener("input", () => {
    const query = studentSearch.value.trim().toLocaleLowerCase();
    let visibleStudents = 0;

    for (const row of studentRows) {
      const matches = row.textContent.toLocaleLowerCase().includes(query);
      row.hidden = !matches;
      if (matches) visibleStudents += 1;
    }

    if (searchStatus) {
      searchStatus.textContent = `Showing ${visibleStudents} of ${studentRows.length} students`;
    }
  });
}
