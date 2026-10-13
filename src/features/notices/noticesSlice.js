import { createSlice } from "@reduxjs/toolkit";
import { initialNotices } from "./mockData";

const initialState = {
  activeTab: "calendar",
  currentDate: { month: 9, year: 2026 },
  filters: {
    status: "all",
    noticeBy: "notice_date",
    type: "all",
  },
  searchQuery: "",
  notices: initialNotices,
};

const noticesSlice = createSlice({
  name: "notices",
  initialState,
  reducers: {
    setTab(state, action) {
      state.activeTab = action.payload;
    },
    nextMonth(state) {
      const next = new Date(
        state.currentDate.year,
        state.currentDate.month + 1,
        1
      );
      state.currentDate.month = next.getMonth();
      state.currentDate.year = next.getFullYear();
    },
    prevMonth(state) {
      const prev = new Date(
        state.currentDate.year,
        state.currentDate.month - 1,
        1
      );
      state.currentDate.month = prev.getMonth();
      state.currentDate.year = prev.getFullYear();
    },
    setStatus(state, action) {
      state.filters.status = action.payload;
    },
    setNoticeBy(state, action) {
      state.filters.noticeBy = action.payload;
    },
    setType(state, action) {
      state.filters.type = action.payload;
    },
    setSearch(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setTab,
  nextMonth,
  prevMonth,
  setStatus,
  setNoticeBy,
  setType,
  setSearch,
} = noticesSlice.actions;

export default noticesSlice.reducer;