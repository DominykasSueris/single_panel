import { Link } from "react-router-dom";

/** Utils */
import { AwsLogGroup } from "../../../services/aws/spec";
import { timestampToDate } from "../../../utils/dates";

interface Props {
  group?: AwsLogGroup;
}

const AwsGroupsRow = ({ group }: Props) => {
  if (!group)
    return <></>

  return (
    <tr>
      <td>
        <Link to={{ pathname: `/aws/streams/?group=${group.logGroupName}` }}>
          {group.logGroupName}
        </Link>
      </td>
      <td> {timestampToDate(group.creationTime)}</td>
    </tr>
  );
};
export default AwsGroupsRow;
