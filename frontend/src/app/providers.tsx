'use client';

import * as React from 'react';
import '@rainbow-me/rainbowkit/styles.css';

import {
    getDefaultConfig,
    RainbowKitProvider,
    getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import 'dotenv/config'

import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
} from 'wagmi/chains';
import { sepoliaChain } from '@/lib/customChain';

// Use environment variable or fallback to the hardcoded value
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '9811958bd307518b364ff7178034c435';

const config = getDefaultConfig({
    appName: 'ZKads',
    projectId: projectId,
    chains: [mainnet, polygon, optimism, arbitrum, sepoliaChain],
    ssr: true,
});

const { wallets } = getDefaultWallets({
    appName: 'ZKads',
    projectId,
});

const appInfo = {
    appName: 'ZKads',
    learnMoreUrl: 'https://zkads.io/about',
};

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {mounted ? (
                    <RainbowKitProvider appInfo={appInfo}>
                        {children}
                    </RainbowKitProvider>
                ) : (
                    <div style={{ visibility: "hidden" }}>
                        {children}
                    </div>
                )}
            </QueryClientProvider>
        </WagmiProvider>
    );
}
