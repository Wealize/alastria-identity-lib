import 'mocha'
import { expect } from 'chai'
import ContractParserService from '../../src/services/ContractParserService'

const CONTRACTS_INFO_URL =
  'https://github.com/alastria/alastria-identity/develop/contracts/abi/__contracts_libs_Eidas_sol_Eidas.abi'

describe('Validate ContractParserService Tests', () => {
  it('should get data', async () => {
    const resultExpect =
      '[{"constant":true,"inputs":[{"name":"_eidasLevel","type":"Eidas.EidasLevel"}],"name":"atLeastLow","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"_eidasLevel","type":"Eidas.EidasLevel"},{"name":"_level","type":"Eidas.EidasLevel"}],"name":"atLeast","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"}]'

    const data = await ContractParserService.getJsonDataFromUrl(
      CONTRACTS_INFO_URL
    )

    expect(data).equal(resultExpect)
  })

  it('should get name in content', async () => {
    const expectedName = 'identityKeys'
    const content = {
      constant: true,
      inputs: [
        {
          name: '',
          type: 'address'
        }
      ],
      name: 'identityKeys',
      outputs: [
        {
          name: '',
          type: 'address'
        }
      ],
      playable: false,
      stateMutability: 'view',
      type: 'function'
    }

    const result = ContractParserService.getNameInContent(content)

    expect(expectedName).equal(result)
  })
})
