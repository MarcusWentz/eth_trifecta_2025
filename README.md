![112135134](https://github.com/user-attachments/assets/d6c1f991-e2a0-42e6-8bd1-a75856757e2a)# SovereignAds

## Overview
**Privacy-Preserving Ad Network Using ZKPs**

A **privacy-first** advertising network that leverages **zero-knowledge proofs (ZKPs)** to enable targeted ads **without exposing user data**. Users retain complete control over their information while still receiving relevant advertisements and earning **USDC rewards** for engagement.

## Problem
Traditional ad networks collect and broker vast amounts of user data, often leading to:
- Privacy violations and mass surveillance.
- Risk of data breaches exposing sensitive user information.
- Profiteering by ad networks at the expense of user security.

## Solution
Traditional digital advertising relies on massive data collection, where companies store and broker user information to target ads. This approach not only threatens user privacy but also creates risks of data breaches and unauthorized data sales.

This project introduces a novel solution by leveraging Zero-Knowledge Proofs (ZKPs) to enable ad targeting without exposing personal data. Users’ data never leaves their devices, yet advertisers can still verify whether a user belongs to a target audience. This ensures privacy while maintaining ad relevance.

Key benefits include:
- **Targeted Ads without Data Exposure:** Advertisers can still reach the right audience without collecting user data.
- **User Data Sovereignty:** Users retain complete control over their data, which never leaves their device.
- **Fair Compensation:** Users are rewarded directly for ad interactions, aligning incentives between users and advertisers.
- **Seamless Integration:** Ads are displayed directly on websites, ensuring a smooth experience for both users and businesses.


## Tech Stack
- **SP1 zkVM & RISC Zero** – Used to create and verify **zero-knowledge proofs**.
- **Rust Backend** – Handles verification and ad matching logic.
- **React Frontend** – Displays ads to users and manages their interactions.


## Repository Structure
- **[RISC Zero](https://github.com/MarcusWentz/eth_trifecta_2025/tree/main/risc0)** – ZK proving system using RISC Zero.
- **[SP1](https://github.com/MarcusWentz/eth_trifecta_2025/tree/main/sp1)** – ZK proving system using SP1 zkVM.
- **[Frontend](https://github.com/MarcusWentz/eth_trifecta_2025/tree/main/frontend)** – User-facing React application.

## Why It Matters
This project aligns **advertising incentives with user privacy**, ensuring:
- **Data Sovereignty:** Users never share raw personal data.
- **Fair Rewards:** Users get paid in **USDC** for ad views.
- **Trustless Verification:** Advertisers can verify audience targeting **without seeing user data**.


## RISC Zero

https://github.com/MarcusWentz/eth_trifecta_2025/tree/main/risc0

## SP1



## Frontend

https://github.com/MarcusWentz/eth_trifecta_2025/tree/main/frontend
