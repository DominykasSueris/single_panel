# WatchLand (Beta)

## Table of contents
* [General info](#general-info)
* [Technologies and tools](#technologies-and-tools)
* [Setup](#setup)
* [Docker](#docker)

## General info
WatchLand is a tool that provides combined monitoring of servers, databases, tools and services through [AWS CloudWatch](https://aws.amazon.com/cloudwatch/), [Azure Monitor](https://azure.microsoft.com/en-gb/products/monitor/) and [Google Cloud Logging](https://cloud.google.com/logging). 
Watchland gives an easy access to monitor in real time log entries from different cloud accounts with the ability to combined them in one place, without the need to constantly switch between accounts and regions.

## Technologies and tools
* React: 18.2.0
* TypeScript: 4.7.4
* React-router-dom: 6.3.0
* [WatchLand TS client](https://www.npmjs.com/package/watch-land-ts-client)
* [AWS/CloudWatch - AWS SDK](https://www.npmjs.com/package/aws-sdk)

## Setup
To run this project, clone it locally from github:

`git clone https://github.com/DominykasSueris/watch_land`

## Docker

Docker image available at: https://hub.docker.com/repository/docker/dominykassueris/watch_land/general

Terminal: `docker pull dominykassueris/watch_land:latest`

Run docker image locally: `sh ./run.sh` 

