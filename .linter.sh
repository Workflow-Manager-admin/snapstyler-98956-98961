#!/bin/bash
cd /home/kavia/workspace/code-generation/snapstyler-98956-98961/snapstyler_container
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

