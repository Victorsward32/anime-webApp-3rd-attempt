// Array.prototype.myMap() = function (cb) {
//     let tempArr = [];
//     for (let i = 0; i < this.length; i++) {
//         tempArr.push(cb(this.i, i, this))
//     }
//     return tempArr;
// }

export const getPages = (currentPage, totalPages) => {
  let pages = [];

  // Always add first page
  pages.push(1);

  // Add left dots
  if (currentPage > 3) {
    pages.push("...");
  }

  // Add current page neighbors
  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i > 1 && i < totalPages) {
      pages.push(i);
    }
  }

  // Add right dots
  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  // Always add last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};

