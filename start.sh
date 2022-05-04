#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

echo $SCRIPT_DIR

cd $SCRIPT_DIR

git pull
npm install

n=0
until [ "$n" -ge 5 ]
do
  npm start
  sleep 20
done
