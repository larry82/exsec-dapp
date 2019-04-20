const address = '0x4d7622bb8d725cecdd7f578fb5d12a1e8cc650d4'
const ABI = [
  {
    'constant': false,
    'inputs': [
      {
        'name': '_description',
        'type': 'string'
      },
      {
        'name': '_endTime',
        'type': 'uint256'
      },
      {
        'name': '_cap',
        'type': 'uint256'
      },
      {
        'name': '_minimum',
        'type': 'uint256'
      }
    ],
    'name': 'createMarket',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'constructor'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'name': 'deployedMarkets',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'getDeployedMarkets',
    'outputs': [
      {
        'name': '',
        'type': 'address[]'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'superAdmin',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  }
]
export {address, ABI}