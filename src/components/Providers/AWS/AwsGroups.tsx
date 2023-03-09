import { useState } from "react";

/** Cloud Services */
import { CloudWatch } from "services/aws/aws";
import { IAwsLogGroups } from "services/aws/spec";

/** Components  */
import BackButton from "components/Buttons/BackButton";
import SearchBar from "components/SearchBar/SearchBar";
// import Pagination from "components/Pagination/Pagination";
import Spinner from "components/Spinner/Spinner";
import AlertError from "components/Alert/AlertError";
import Table from "components/Table/Table";
import AwsGroupsRow from "components/Table/AwsTableRows/AwsGroupsRow";

/** Utils */
// import { arrays } from "utils/";
import { useCloudWatch, useQuery } from "utils/hooks";

const AwsGroups = () => {
  const page = Number(useQuery().get("page") || "1");
  const [filterQuery, setFilterQuery] = useState<string>("");

  const { data: groups, loading, error } = useCloudWatch<IAwsLogGroups>(CloudWatch.groups());

  const filterByGroupName = (groupName: string) => {
    return groups.filter(group => group.logGroupName.includes(groupName));
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
      {/* <Pagination active={page} pageCount={arrays.getNumberOfPages(filteredGroups)} /> fix it */}
    </>
  );
};

export default AwsGroups;
