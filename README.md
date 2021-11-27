# Intro

This tool is used to test the latency of the RPC server.

# Setup

Input the url of the RPC server.
Input the number of trials.

```bash
npm install -D
npx tsc -w -p .
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

# Result

Don't take this seriously.
Trial=100
Infura(ETH):

```
┌─────────┬───────────────┬──────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
│ (index) │ Latency(mean) │ Latency(P25) │ Latency(P50) │ Latency(P75) │ Latency(P99) │ Latency(max) │
├─────────┼───────────────┼──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│    0    │     21.9      │    13.75     │     18.5     │      28      │     44.1     │      45      │
└─────────┴───────────────┴──────────────┴──────────────┴──────────────┴──────────────┴──────────────┘
```

# Future Update
* For chain with fast speed, we would consider the latency of even subscription. To output the pure server latency, we can use the for loop to actively get the blocknumber.
* Build CLI tool
* Stress test with concurrent