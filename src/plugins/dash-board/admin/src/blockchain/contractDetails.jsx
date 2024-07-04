export const contractDetails = {
  tokenFactory: {
    name: "tokenFactory",
    abi: [
      {
        constant: false,
        inputs: [
          {
            name: "account",
            type: "address",
          },
        ],
        name: "removeOwner",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "symbol",
            type: "string",
          },
          {
            name: "decimals",
            type: "uint8",
          },
          {
            name: "initialSupply",
            type: "uint256",
          },
        ],
        name: "createToken",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          {
            name: "account",
            type: "address",
          },
        ],
        name: "isOwner",
        outputs: [
          {
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          {
            name: "account",
            type: "address",
          },
        ],
        name: "addOwner",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: "tokenAddress",
            type: "address",
          },
          {
            indexed: false,
            name: "name",
            type: "string",
          },
          {
            indexed: false,
            name: "symbol",
            type: "string",
          },
          {
            indexed: false,
            name: "decimals",
            type: "uint8",
          },
          {
            indexed: false,
            name: "initialSupply",
            type: "uint256",
          },
          {
            indexed: false,
            name: "owner",
            type: "address",
          },
        ],
        name: "TokenCreated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: "addedOwner",
            type: "address",
          },
          {
            indexed: true,
            name: "addedBy",
            type: "address",
          },
        ],
        name: "OwnerAdded",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: "removedOwner",
            type: "address",
          },
          {
            indexed: true,
            name: "removedBy",
            type: "address",
          },
        ],
        name: "OwnerRemoved",
        type: "event",
      },
    ],
    address: "0x7c61a4d7e0d3f7fc802dba1ea66d1dd3ac276857",
  },
};
