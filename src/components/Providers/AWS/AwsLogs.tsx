import { useState } from "react";

/** Cloud Services */
import { CloudWatch } from "services/aws/aws";
import { IAwsLogs } from "services/aws/spec";

/** Components  */
import SearchBar from "components/SearchBar/SearchBar";
import Pagination from "components/Pagination/Pagination";
import Spinner from "components/Spinner/Spinner";
import AlertError from "components/Alert/AlertError";
import BackButton from "components/Buttons/BackButton";
import Table from "components/Table/Table";
import AwsLogsRow from "components/Table/AwsTableRows/AwsLogsRow";

/** Utils */
import { getNumberOfPages, sliceArray } from "utils/arrays";
import { useCloudWatch, useQuery } from "utils/hooks";

const AwsLogs = () => {
  const groupName = useQuery().get("group") || "";
  const [page, setPage] = useState<number>(1);
  const [filterQuery, setFilterQuery] = useState<string>("");
  const {
    data: logs,
    loading,
    error
  } = useCloudWatch<IAwsLogs>(CloudWatch.logs([{ group: groupName }]));

  const filterByStreamName = (streamName: string) => {
    const result = logs.filter(log => log.logStreamName.includes(streamName));
    return sliceArray(result, page);
  };

  if (error) return <AlertError />;

  if (loading) return <Spinner />;

  return (
    <>
      <div className="d-flex justify-content-between pt-4 pb-4">
        <BackButton />
        <SearchBar placeHolder="Search pattern" setFilterQuery={setFilterQuery} />
      </div>
      <Table
        headers={["Log stream name", "Message", "Timestamp"]}
        itemComponent={AwsLogsRow}
        items={filterByStreamName(filterQuery)}
        resourceName="log"
      />
      <Pagination
        currentPage={page}
        onPageChange={(page: number) => setPage(page)}
        totalPages={getNumberOfPages(logs)}
      />
    </>
  );
};

export default AwsLogs;
