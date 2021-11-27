import { providers } from 'ethers'
import dotenv from 'dotenv'
import { exit } from 'process'
import { max, mean, median, round } from 'mathjs'
dotenv.config()
// ===== Uncomment this for mainnet =======
const provider = new providers.JsonRpcProvider(process.env.rpcUrl)
let counter = 0
// eslint-disable-next-line prefer-const
let latencies: number[] = []
const asc = (arr: number[]) => arr.sort((a, b) => a - b)
const quantile = (arr: number[], q: number) => {
  const sorted = asc(arr)
  const pos = (sorted.length - 1) * q
  const base = Math.floor(pos)
  const rest = pos - base
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base])
  } else {
    return sorted[base]
  }
}

async function main() {
  provider.on('block', async (blockNumber) => {
    if (counter >= 10) {
      const structDatas = [
        {
          'Latency(mean)': mean(latencies),
          'Latency(P25)': quantile(latencies, 0.25),
          'Latency(P50)': median(latencies),
          'Latency(P75)': quantile(latencies, 0.75),
          'Latency(P99)': quantile(latencies, 0.99),
          'Latency(max)': max(latencies)
        }
      ]
      console.table(structDatas)
      exit()
    }
    const receivedTime = round(Date.now() / 1000)
    const timeStamp = (await provider.getBlock(blockNumber)).timestamp
    const latency = receivedTime - timeStamp
    console.log(`${counter}. Block Number:${blockNumber}, Latency: ${latency}s`)
    latencies.push(latency)
    counter++
  })
}

main()
