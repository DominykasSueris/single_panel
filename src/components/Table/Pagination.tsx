interface Props {
  activePage: number;
  setActivePage: (page: number) => void
  pageCount: number;
}

const Pagination = ({ activePage, setActivePage, pageCount }: Props) => {

  const nextPage = () => {
    if (activePage !== pageCount)
      setActivePage(activePage + 1)
  }

  const prevPage = () => {
    if (activePage !== 1)
      setActivePage(activePage - 1)
  }

  const renderPages = () => {
    const pageArray = Array.from(Array(pageCount).keys());
    return [
      ...pageArray.map((pageKey: number) => {
        const p = pageKey + 1;
        return (
          <li className={`page-item ${activePage === p ? "active" : ""}`}>
            <a
              className="page-link"
              href="#"
              onClick={() => setActivePage(p)}>
              {p}
            </a>
          </li>
        );
      })
    ];
  };

  if (pageCount < 2)
    return <></>

  return (
    <nav aria-label="Logs navigation">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous" onClick={() => prevPage()}>
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        {renderPages()}
        <li className="page-item">
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
