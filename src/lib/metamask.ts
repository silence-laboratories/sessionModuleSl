import { type Address } from 'viem';

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
    };
  }
}

export async function connectMetaMask(): Promise<{address: Address}> {
  if (!window.ethereum) {
    throw new Error("MetaMask not found! Please install MetaMask first.");
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x14A34' }], // Base Sepolia chainId: 84532 (0x14A34)
    });
  } catch (switchError: any) {
    // If Base Sepolia isn't added, add it
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x14A34',
            chainName: 'Base Sepolia',
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18
            },
            rpcUrls: ['https://base-sepolia.g.alchemy.com/v2/'],
            blockExplorerUrls: ['https://sepolia.basescan.org']
          }]
        });
      } catch (addError) {
        throw new Error("Failed to add Base Sepolia network");
      }
    }
  }

  try {
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    }) as string[];
    
    return { address: accounts[0] as Address };
  } catch (error) {
    throw new Error("Failed to connect to MetaMask");
  }
}
