import { useState } from "react";

/** Cloud Services */
import { CloudWatch } from "../../../services/aws/aws";
import { IAwsStreams } from "../../../services/aws/spec";

/** Components  */
import BackButton from "../../Buttons/BackButton";
import SearchBar from "../../SearchBar/SearchBar";
import Pagination from "../../Pagination/Pagination";
import AlertError from "../../Alert/AlertError";
import Spinner from "../../Spinner/Spinner";
import Table from "../../Table/Table";
import AwsStreamsRow from "../../Table/AwsTableRows/AwsStreamsRow";

/** Utils */
import { useCloudWatch, useQuery } from "../../../utils/hooks";
import { arrays } from "../../../utils/";

const AwsStreams = () => {
  const page = Number(useQuery().get("page") || "1");
  const groupName = useQuery().get("group") || "";
  const [filteredStreams, setFilteredStreams] = useState<IAwsStreams[]>([]);

  const {
    data: streams,
    loading,
    error
  } = useCloudWatch<IAwsStreams>(CloudWatch.streams([groupName]));

  streams.forEach(stream => (stream.groupName = groupName));

  if (error) return <AlertError />;

  if (loading) return <Spinner />;

  const filterByStreamName = (streamName: string) => {
    const result = streams.filter(stream => stream.logStreamName.includes(streamName));
    setFilteredStreams(result);
  };

  return (
    <>
      <div className="d-flex justify-content-between pt-4 pb-4">
        <BackButton />
        {/* <SearchBar placeHolder="Search" search={filterByStreamName} isFinishDate={false} /> */}
      </div>
      <Table
        headers={["Log stream", "First event time", "Last event time"]}
        itemComponent={AwsStreamsRow}
        items={streams}
        resourceName="stream"
      />
      <Pagination active={page} pageCount={arrays.getNumberOfPages(filteredStreams)} />
    </>
  );
};

export default AwsStreams;
