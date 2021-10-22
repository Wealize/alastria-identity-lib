import ConfigBuilderService from './services/ConfigBuilderService'
import * as fs from 'fs'

const contractsInfoUrl =
  'https://raw.githubusercontent.com/Wealize/alastria-identity-lib/blob/develop/contracts/ContractInfo.md'
const loadContractsConfig = async () => {
  return await ConfigBuilderService.generate(contractsInfoUrl)
}

loadContractsConfig().then((contractsConfig) => {
  const { contractsAbi, contractsInfo } = contractsConfig

  const config = {
    ...contractsInfo,
    basicTransaction: {
      to: '0x0000000000000000000000000000000000000000',
      data: '0x0',
      gasLimit: 0,
      gasPrice: 0
    },
    contractsAbi: contractsAbi,
    zeroValue:
      '00000000000000000000000000000000000000000000000000000000000000000000'
  }

  const getConfig = () => {
    fs.writeFileSync(
      './src/config.ts',
      `export const config = ${JSON.stringify(config)}`
    )
  }

  getConfig()
})
