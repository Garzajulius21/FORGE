#!/bin/bash
cd "$(dirname "$0")"
npm run dev -- --port 5200 &
sleep 2
open http://localhost:5200
wait
