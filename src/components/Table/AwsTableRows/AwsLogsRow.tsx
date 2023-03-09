import { useState } from "react";
import { ReactComponent as ArrowLogo } from "assets/arrow/arrow.svg";
import "./AwsLogsRow.scss";

/** Utils */
import { timestampToDate } from "utils/dates";

/** Services */
import { IAwsLogs } from "services/aws/spec";

interface IAwsLogsRow {
  log?: IAwsLogs;
}

const AwsLogsRow = ({ log }: IAwsLogsRow) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggle = () => {
    setOpen(current => !current);
  };
  return (
    <>
      {log ? (
        <tr onClick={toggle}>
          <td>
            <ArrowLogo className={`logo ${open ? "open" : ""}`}></ArrowLogo>
            {log.logStreamName}
          </td>
          <td>{log.message}</td>
          <td> {timestampToDate(log.timestamp)}</td>
        </tr>
      ) : null}
      {open ? (
        <tr onClick={toggle}>
          <td colSpan={3}>
            <ArrowLogo className={`logo ${open ? "open" : ""}`}></ArrowLogo>
            {log?.logStreamName}
          </td>
        </tr>
      ) : null}
    </>
  );
};
export default AwsLogsRow;
