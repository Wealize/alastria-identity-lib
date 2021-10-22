import { responseBodyRequest } from '../utils/requestUtils'

interface ContractAbiInput {
  name: string
  type: string
}

interface ContractAbiOutput {
  name: string
  type: string
}

interface ContractAbi {
  constant: boolean
  inputs: ContractAbiInput[]
  name: string
  outputs: ContractAbiOutput[]
  playable: boolean
  stateMutability: string
  type: string
}

const DEFAULT_GITHUB_URL = 'https://github.com/'
const DEFAULT_GITHUB_RAW_URL = 'https://raw.githubusercontent.com/'

export default class ContractParserService {
  public static async parse(url: string) {
    const contractResponse = await this.getJsonDataFromUrl(url)
    if (contractResponse) {
      const contractsAbi: ContractAbi[] = JSON.parse(contractResponse)
      return this.extractDataFromContent(contractsAbi)
    }
  }

  public static async getJsonDataFromUrl(url: string): Promise<string> {
    url = url
      .replace(DEFAULT_GITHUB_URL, DEFAULT_GITHUB_RAW_URL)
      .replace('blob/', '')

    const bodyRequest = await responseBodyRequest(url)
    if (!bodyRequest) {
      return null
    }

    return bodyRequest
  }

  public static getNameInContent(content: ContractAbi): string {
    const { name, type } = content
    if (type === 'constructor') return 'constructor'

    return name
  }

  public static extractDataFromContent(content: ContractAbi[]) {
    return content.reduce((result, item) => {
      result[this.getNameInContent(item)] = item
      return result
    }, {})
  }
}
