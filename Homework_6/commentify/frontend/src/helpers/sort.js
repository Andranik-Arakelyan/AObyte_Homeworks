const sort = (arr, dir = "descending", sortBy) => {
  const arrCopy = [...arr];
  if (dir === "ascending") {
    return arrCopy.sort((a, b) => a[sortBy] - b[sortBy]);
  } else {
    return arrCopy.sort((a, b) => b[sortBy] - a[sortBy]);
  }
};

export default sort;
