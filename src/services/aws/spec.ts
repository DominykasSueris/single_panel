export interface AwsModel {
  arn: string;
}

export interface AwsLogGroup extends AwsModel {
  logGroupName: string;
  creationTime: number;
  metricFilterCount: number;
}

export interface AwsStream extends AwsModel {
  logStreamName: string;
  creationTime: number;
  firstEventTimestamp: number;
  lastEventTimestamp: number;
  lastIngestionTime: number;
  uploadSequenceToken: string;
  groupName: string;
  storedBytes: number;
}

export interface AwsLog extends AwsModel {
  logStreamName: string;
  timestamp: number;
  message: string;
  ingestionTime: number;
  eventId: string;
  tag: string;
}
