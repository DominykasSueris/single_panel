import { useState } from "react";

/** Cloud Services */
import { CloudWatch } from "services/aws/aws";
import { IAwsLogGroups } from "services/aws/spec";

/** Components  */
import BackButton from "components/Buttons/BackButton";
import SearchBar from "components/SearchBar/SearchBar";
import Pagination from "components/Pagination/Pagination";
import Spinner from "components/Spinner/Spinner";
import AlertError from "components/Alert/AlertError";
import Table from "components/Table/Table";
import AwsGroupsRow from "components/Table/AwsTableRows/AwsGroupsRow";

/** Utils */
import { useCloudWatch, useQuery } from "utils/hooks";
import { sliceArray, getNumberOfPages } from "utils/arrays";

const AwsGroups = () => {
  const qsParams = useQuery();
  const page = Number(qsParams.get("page") || "1");
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [filterQuery, setFilterQuery] = useState<string>("");

  const { data: groups, loading, error } = useCloudWatch<IAwsLogGroups>(CloudWatch.groups());

  const filterByGroupName = (groupName: string) => {
    const result = groups.filter(group => group.logGroupName.includes(groupName));
    return sliceArray(result, currentPage);
  };

  if (error) return <AlertError />;

  if (loading) return <Spinner />;

  return (
    <>
      <div className="d-flex justify-content-between pt-4 pb-4">
        <BackButton />
        <SearchBar placeHolder="Search" setFilterQuery={setFilterQuery} />
      </div>
      <Table
        headers={["Log group", "Creation time"]}
        itemComponent={AwsGroupsRow}
        items={filterByGroupName(filterQuery)}
        resourceName="group"
      />
      <Pagination
        totalPages={getNumberOfPages(groups)}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </>
  );
};

export default AwsGroups;
