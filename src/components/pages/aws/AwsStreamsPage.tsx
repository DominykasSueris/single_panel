import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

/** Redux */
import { RootState } from "../../../redux/store";
import { updateLoadingState } from "../../../redux/reducers/loading";

/** Cloud Services */
import { CloudWatch } from "../../../services/aws/aws";
import { AwsStream } from "../../../services/aws/spec";

/** Components  */
import BackButton from "../../Buttons/BackButton";
import SearchBar from "../../SearchBar/SearchBar";
import AlertEmpty from "../../alerts/AlertEmpty";
import AlertError from "../../alerts/AlertError";
import Spinner from "../../Spinner/Spinner";
import Table from "../../table/Table";
import AwsStreamsRow from "../../table/models/AwsStreamRow";

/** Utils */
import { useQuery } from "../../../utils/hooks";

const AwsStreamsPage = () => {
  const dispatch = useDispatch();
  const groupName = useQuery().get("group") || "";
  const [streams, setStreams] = useState<AwsStream[]>([]);
  const [filteredStreams, setFilteredStreams] = useState<AwsStream[]>([]);
  const [empty, setEmpty] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const stateLoading = useSelector((state: RootState) => state.loading.loading);

  const setLoading = (loading: boolean) => {
    const payload = { loadingData: loading };
    const action = updateLoadingState(payload);
    dispatch(action);
  };

  const loadStreams = async (prefix?: string | undefined) => {
    let dataStreams: AwsStream[] = [];
    const groups = [groupName];
    setLoading(true);
    CloudWatch.streams(groups, prefix)
      .observe(data => {
        data.map((stream: { [x: string]: string }) => (stream["groupName"] = groupName));
        dataStreams = dataStreams.concat(data);
        setStreams(dataStreams);
        setFilteredStreams(dataStreams);
        setLoading(false);
      })
      .done(() => {
        setLoading(false);
      })
      .catch(() => setError(true));
  };

  useEffect(() => {
    if (filteredStreams.length === 0) setEmpty(true);
    else setEmpty(false);
  }, [stateLoading, filteredStreams]);

  useEffect(() => {
    loadStreams();
  }, []);

  const filterByStreamName = (streamName: string) => {
    const result = streams.filter(stream => stream.logStreamName.includes(streamName));
    setFilteredStreams(result);
  };

  return (
    <>
      {error ? <AlertError /> : null}
      {stateLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="d-flex justify-content-between pt-4 pb-4">
            <BackButton />
            <SearchBar placeHolder="Search" search={filterByStreamName} isFinishDate={false} />
          </div>
          {empty ? (
            <AlertEmpty />
          ) : (
            [
              <Table
                headers={["Log stream", "First event time", "Last event time"]}
                itemComponent={AwsStreamsRow}
                items={streams}
                resourceName="stream"
              />,
            ]
          )}
        </>
      )}
    </>
  );
};

export default AwsStreamsPage;
