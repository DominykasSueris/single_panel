import { useState } from "react";

interface IPaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

const Pagination = ({ currentPage, onPageChange, totalPages }: IPaginationProps) => {
  const [activePage, setActivePage] = useState(currentPage);

  const previousPage = () => {
    const previousPage = currentPage - 1 <= 0 ? currentPage : currentPage - 1;
    setActivePage(previousPage);
    onPageChange(previousPage);
  };

  const nextPage = () => {
    const nextPage = currentPage + 1 > totalPages ? currentPage : currentPage + 1;
    setActivePage(nextPage);
    onPageChange(nextPage);
  };

  const renderPages = () => {
    const pageArray = Array.from(Array(totalPages).keys());
    return [
      ...pageArray.map((pageKey: number) => {
        const p = pageKey + 1;
        return (
          <li key={p} className={`page-item ${activePage === p ? "active" : ""}`}>
            <a
              className="page-link"
              href="#"
              onClick={ev => {
                ev.preventDefault();
                setActivePage(p);
                onPageChange(p);
              }}
            >
              {p}
            </a>
          </li>
        );
      })
    ];
  };

  return (
    <nav aria-label="Logs navigation">
      <ul className="pagination">
        <li className={`${currentPage === 1 ? "page-item disabled" : "page-item"}`}>
          <a className="page-link" href="#" aria-label="Previous" onClick={() => previousPage()}>
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        {renderPages()}
        <li className={`${currentPage === totalPages ? "page-item disabled" : "page-item"}`}>
          <a className="page-link" href="#" aria-label="Next" onClick={() => nextPage()}>
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
