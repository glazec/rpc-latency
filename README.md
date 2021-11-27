# Intro

This tool is used to test the latency of the RPC server.

# Setup

Input the url of the RPC server.
Input the number of trials.

```bash
npm install -D
tsc -w -p .
node build/latency.js
```

The output should look like the following. The unit is second:

```
┌─────────┬───────────────┬──────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
│ (index) │ Latency(mean) │ Latency(P25) │ Latency(P50) │ Latency(P75) │ Latency(P99) │ Latency(max) │
├─────────┼───────────────┼──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│    0    │     25.4      │    11.25     │      20      │      31      │    56.91     │      57      │
└─────────┴───────────────┴──────────────┴──────────────┴──────────────┴──────────────┴──────────────┘
```
