import { providers, utils } from 'ethers'
import dotenv from 'dotenv'
import { exit } from 'process'
import { max, mean, median, round } from 'mathjs'
dotenv.config()
// ===== Uncomment this for mainnet =======
const rpcUrl = process.env.rpcUrl || ''
const provider = new providers.JsonRpcProvider(rpcUrl)
// const provider = providers.getDefaultProvider(rpcUrl, { chainId: 25, name: 'CRO' })

let counter = 0
const trial = process.env.trial || 0
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
  // const result = await utils.fetchJson(
  //   'https://quvfhaze.china.bsc.node.web3rpc.com',
  //   '{ "id": 56, "jsonrpc": "2.0", "method": "eth_chainId", "params": [ ] }'
  // )
  // console.log(result)

  const network = await provider.getNetwork()
  const startBlock = await provider.getBlockNumber()
  let currentBlock = startBlock
  let newBlock
  while (counter < trial) {
    newBlock = await provider.getBlockNumber()
    if (newBlock > currentBlock) {
      currentBlock = newBlock
      const receivedTime = round(Date.now() / 1000)
      const timeStamp = (await provider.getBlock(newBlock)).timestamp
      const latency = receivedTime - timeStamp
      console.log(`[${counter}/${trial}] Block Number:${newBlock}, Latency: ${latency}s`)
      latencies.push(latency)
      counter++
    }
  }
  const structDatas = [
    {
      'Latency(mean)': round(mean(latencies), 2),
      'Latency(P25)': round(quantile(latencies, 0.25), 2),
      'Latency(P50)': round(median(latencies), 2),
      'Latency(P75)': round(quantile(latencies, 0.75), 2),
      'Latency(P99)': round(quantile(latencies, 0.99), 2),
      'Latency(max)': max(latencies)
    }
  ]
  console.table(structDatas)
}

main()
