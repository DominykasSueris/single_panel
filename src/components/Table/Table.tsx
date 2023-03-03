/** Utils */
import { useMemo, useState } from "react";
import { AwsLog, AwsLogGroup, AwsStream } from "../../services/aws/spec";
import AlertEmpty from "../alerts/AlertEmpty";
import Pagination from "./Pagination";

interface Props {
  headers: string[];
  items: AwsLog[] | AwsLogGroup[] | AwsStream[];
  resourceName: string;
  itemComponent: React.FC;
  pageSize?: number
}

const Table = ({ headers, items, itemComponent: ItemComponent, resourceName, pageSize = 10 }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return items.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  if (!items.length)
    return <AlertEmpty />

  return (
    <div className="container pb-5">
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((item, i) => (
            <ItemComponent key={i} {...{ [resourceName]: item }} />
          ))}
        </tbody>
      </table>
      <Pagination activePage={currentPage} setActivePage={setCurrentPage} pageCount={Math.ceil(items.length / pageSize)} />
    </div>
  );
};

export default Table;
