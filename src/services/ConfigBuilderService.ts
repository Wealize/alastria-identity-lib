import { lowerFirstLetter } from '../utils/parserUtils'
import ContractParserService from './ContractParserService'

const CONTRACT_NAME_REGEX = /sol_(.*)\.abi/
const CONTRACT_URL_POSITION = 3
const ADDRESS_POSITION = 2

interface ContractItem {
  name: string
  url: string
  address: string
}

interface ContractConfig {
  contractsAbi: {}
  contractsInfo: Contracts
}

interface Contracts {
  alastriaCredentialRegistry: string
  alastriaIdentityManager: string
  alastriaPublicKeyRegistry: string
  eidas: string
  alastriaPresentationRegistry: string
}

export default class ConfigBuilderService {
  public static async generate(url: string): Promise<ContractConfig> {
    let contractsAbi = {}
    let contractsInfo = {} as Contracts
    const contracts = await this.getContracts(url)

    await Promise.all(
      contracts.map(async (contractItem) => {
        const { url, address, name } = contractItem

        const contractParsed = await ContractParserService.parse(url)
        contractsAbi = {
          ...contractsAbi,
          [url.match(CONTRACT_NAME_REGEX)[1]]: contractParsed
        }

        contractsInfo = {
          ...contractsInfo,
          [lowerFirstLetter(name)]: address
        }
      })
    )
    const contractConfig: ContractConfig = {
      contractsInfo,
      contractsAbi
    }

    return contractConfig
  }

  public static async getContracts(
    contractsInfoUrl: string
  ): Promise<ContractItem[]> {
    const contractsRawResponse = await ContractParserService.getJsonDataFromUrl(
      contractsInfoUrl
    )
    if (!contractsRawResponse) return null
    return this.extractContractItemFromResponse(contractsRawResponse)
  }

  public static async extractContractItemFromResponse(
    contractsCcontent: string
  ): Promise<ContractItem[]> {
    return contractsCcontent.split('\n').reduce((result, contractLine) => {
      if (
        contractLine.split('|')[CONTRACT_URL_POSITION] &&
        contractLine.split('|')[CONTRACT_URL_POSITION].includes('https')
      ) {
        result.push({
          name: contractLine.split('|')[1].trim(),
          url: contractLine.split('|')[CONTRACT_URL_POSITION].trim(),
          address: contractLine.split('|')[ADDRESS_POSITION].trim()
        })
      }
      return result
    }, [] as ContractItem[])
  }
}
