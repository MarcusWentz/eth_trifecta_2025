export const sepoliaChain = {
    id: 11155111,
    name: 'Sepolia',
    nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: { http: ['https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID'], wss: ['wss://ethereum-sepolia-rpc.publicnode.com'] },
    },
    blockExplorers: {
        default: {
            name: 'Sepolia Explorer',
            url: 'https://sepolia.etherscan.io',
            apiUrl: 'https://api-sepolia.etherscan.io/api',
        },
    },
    testnet: true,
};
