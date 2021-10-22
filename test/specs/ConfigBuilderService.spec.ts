import 'mocha'
import { expect } from 'chai'
import ConfigBuilderService from '../../src/services/ConfigBuilderService'

const contractsInfoUrl =
  'https://raw.githubusercontent.com/alastria/alastria-identity/master/contracts/ContractInfo.md'

describe('Validate ConfigBuilderService Tests', () => {
  it('should get contracts', async () => {
    const expectedResult = [
      {
        url: 'https://github.com/alastria/alastria-identity/blob/develop/contracts/abi/__contracts_libs_Eidas_sol_Eidas.abi',
        address: '0x57a9604784f82e5637624ca9c87015aaa31e300d'
      }
    ]

    const contracts = await ConfigBuilderService.getContracts(contractsInfoUrl)

    expect(contracts[0].url).equal(expectedResult[0].url)
    expect(contracts[0].address).equal(expectedResult[0].address)
  })

  it('should generate config', async () => {
    const expecedtResult = '0x57a9604784f82e5637624ca9c87015aaa31e300d'

    const result = await ConfigBuilderService.generate(contractsInfoUrl)
    const {
      contractsInfo: { eidas }
    } = result

    expect(eidas).equal(expecedtResult)
  })
})
