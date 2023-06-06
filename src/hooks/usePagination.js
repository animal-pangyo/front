const usePagination = ({ page = 1, total = 0, perPage = 10 }) => {
  const last = Math.ceil(total / perPage);
  const start = parseInt(page / perPage) * perPage + 1;
  const end = Math.max(Math.min(start + 9, last), 1);

  return {
    start,
    end,
    last,
    page
  }
};

export default usePagination;