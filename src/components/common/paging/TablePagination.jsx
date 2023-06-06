import { useEffect, useState } from "react";

const TablePagination = ({ start, end, last, move, page, colSpan }) => {
  const [paging, setPaging] = useState([]);

  useEffect(() => {
    const list = [];

    for (let i = start; i <= end; i += 1) {
      list.push(i);
    }

    setPaging(list);
  }, []);

  return (
    <tr>
      <th colSpan={colSpan}>
        <div className="ui right floated pagination menu">
          <a className="icon item" onClick={() => move(Math.max(page - 1, 1))}>
            <i className="left chevron icon"></i>
          </a>
          { 
            !!paging.length && paging.map((page) => (
              <a key={page} className="item" onClick={() => move(page)}>{page}</a>
            ))
          }
          <a className="icon item" onClick={() => move(Math.min(page + 1, last))}>
            <i className="right chevron icon"></i>
          </a>
        </div>
      </th>
    </tr>
  )
};

export default TablePagination;