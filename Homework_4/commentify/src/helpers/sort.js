const sort = (arr, dir = "descending") => {
  arr.forEach((element) => {
    element.average = +(
      element.comments.reduce((acc, comment) => {
        return acc + comment.rating;
      }, 0) / element.comments.length
    ).toFixed(2);
  });
  if (dir === "ascending") {
    return arr.sort((a, b) => a.average - b.average);
  } else {
    return arr.sort((a, b) => b.average - a.average);
  }
};

export default sort;
