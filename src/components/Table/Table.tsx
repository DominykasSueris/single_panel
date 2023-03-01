/** Utils */
import { IAwsLogs, IAwsLogGroups, IAwsStreams } from "../../services/aws/spec";

interface ITableProps {
  headers: string[];
  items: IAwsLogs[] | IAwsLogGroups[] | IAwsStreams[];
  resourceName: string;
  itemComponent: React.FC;
}

const Table = ({ headers, items, itemComponent: ItemComponent, resourceName }: ITableProps) => {
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
          {items.map((item, i) => (
            <ItemComponent key={i} {...{ [resourceName]: item }} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
