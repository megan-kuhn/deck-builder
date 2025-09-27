// js/src/state/pagination.js

let currentPage = 1;
const pageSize = 24;

export function resetPagination() {
  currentPage = 1;
}

export function incrementPage() {
  currentPage++;
}

export function getCurrentPage() {
  return currentPage;
}

export function getPageSize() {
  return pageSize;
}

