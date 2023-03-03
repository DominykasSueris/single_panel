export interface AwsModel {
  //arn: string; and other common stuff
}

export interface AwsLogGroup extends AwsModel {
  arn: string;
  logGroupName: string; // rename to name
  creationTime: number;
  metricFilterCount: number;
}

export interface AwsStream extends AwsModel {
  arn: string;
  logStreamName: string; // rename to name
  creationTime: number; // maybe timestamp as well?
  firstEventTimestamp: number;
  lastEventTimestamp: number;
  lastIngestionTime: number;  // maybe timestamp as well?
  uploadSequenceToken: string;
  groupName: string; // still missing in be
  storedBytes: number;
}

export interface AwsLog extends AwsModel {
  //arn: string; add this to BE
  logStreamName: string;
  timestamp: number; // is it creationTime ?
  message: string;
  ingestionTime: number;
  eventId: string; // is it arn ?
  tag: string;
}
