import Web3 from 'web3'

async function main() {
  //   const web3 = new Web3('https://speedy-nodes-nyc.moralis.io/5404abd38849a695df68e2a7/bsc/mainnet')
  const web3 = new Web3('https://cro-1.node.web3rpc.com')
  //   const web3 = new Web3('https://temp3.china.bsc.node.web3rpc.com')
  console.log(await web3.eth.getBlockNumber())
}
main()
