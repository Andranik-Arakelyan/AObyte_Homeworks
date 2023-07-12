const sort = (arr, dir = "descending") => {
  if (dir === "ascending") {
    return arr.sort((a, b) => a.average - b.average);
  } else {
    return arr.sort((a, b) => b.average - a.average);
  }
};

export default sort;
