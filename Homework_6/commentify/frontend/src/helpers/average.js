export default function calculateAverages(arr) {
  arr.forEach((element) => {
    element.average = +(
      element.comments.reduce((acc, comment) => {
        return acc + comment.rating;
      }, 0) / element.comments.length
    ).toFixed(2);
  });
  return arr;
}
