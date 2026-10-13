import { createSelector } from "@reduxjs/toolkit";

// Raw state access
const selectNoticesState = (state) => state.notices;
const selectActiveTab = (state) => state.notices.activeTab;
const selectCurrentDate = (state) => state.notices.currentDate;
const selectFilters = (state) => state.notices.filters;
const selectSearchQuery = (state) => state.notices.searchQuery;
const selectNotices = (state) => state.notices.notices;

// Filter notices
const selectFilteredNotices = createSelector(
  [selectNotices, selectFilters, selectSearchQuery],
  (notices, filters, searchQuery) => {
    return notices.filter((notice) => {
      // Type filter
      if (filters.type !== "all" && notice.type !== filters.type) {
        return false;
      }
      // Status filter
      if (filters.status !== "all" && notice.status !== filters.status) {
        return false;
      }
      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !notice.title.toLowerCase().includes(q) &&
          !notice.type.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }
);

// Group notices by date (respecting noticeBy toggle)
const selectNoticeGroups = createSelector(
  [selectFilteredNotices, selectFilters],
  (notices, filters) => {
    const groups = {};
    notices.forEach((notice) => {
      const key = filters.noticeBy === "notice_date" ? notice.date : notice.dueDate;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(notice);
    });
    return groups;
  }
);

// Build calendar cells
const selectCalendarCells = createSelector(
  [selectCurrentDate, selectNoticeGroups],
  (currentDate, noticeGroups) => {
    const year = currentDate.year;
    const month = currentDate.month;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const todayStr = today.toDateString();

    const cells = [];
    let dateCounter = 1;

    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        let dateStr, dateObj, inCurrentMonth, isToday;

        if (row === 0 && col < firstDay) {
          const prevMonth = new Date(year, month, 1);
          prevMonth.setDate(prevMonth.getDate() - (firstDay - col));
          dateObj = prevMonth;
          dateStr = dateObj.toDateString();
          inCurrentMonth = false;
          isToday = dateStr === todayStr;
        } else if (dateCounter <= daysInMonth) {
          dateObj = new Date(year, month, dateCounter);
          dateStr = dateObj.toDateString();
          inCurrentMonth = true;
          isToday = dateStr === todayStr;
          dateCounter++;
        } else {
          const nextMonth = new Date(year, month + 1, 0);
          nextMonth.setDate(nextMonth.getDate() + (dateCounter - daysInMonth));
          dateObj = nextMonth;
          dateStr = dateObj.toDateString();
          inCurrentMonth = false;
          isToday = dateStr === todayStr;
        }

        const noticeKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;
        const notices = noticeGroups[noticeKey] || [];

        cells.push({ dateStr, dateObj, inCurrentMonth, isToday, notices });
      }
    }

    return cells;
  }
);

export { selectActiveTab, selectCurrentDate, selectFilters, selectSearchQuery, selectFilteredNotices, selectNoticeGroups, selectCalendarCells };