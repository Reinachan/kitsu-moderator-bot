#!/bin/bash

npm start "Startup" "Starting script (this means that the host machine might've been restarted)"

n=0
until [ "$n" -ge 5 ]
do
  o=$((4-n))
  npm start
  n=$((n+1))
  if [ $n -eq 5 ]
  then
    sleep 1
  elif [ $n -eq 4 ]
  then
    npm start "Error" "Increasing wait time before final attempt."
    sleep 120
  else
    npm start "Error" "Self-destructing in ${o}"
    sleep 20
  fi
done

npm start "Error" "Self-destruction sequence activated. Blowing up."