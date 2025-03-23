# SovereignAds

## Overview
**Privacy-Preserving Ad Network Using ZKPs**

A **privacy-first** advertising network that leverages **zero-knowledge proofs (ZKPs)** to enable targeted ads **without exposing user data**. Users retain complete control over their information while still receiving relevant advertisements and earning **USDC rewards** for engagement.

## Problem
Traditional ad networks collect and broker vast amounts of user data, often leading to:
- Privacy violations and mass surveillance.
- Risk of data breaches exposing sensitive user information.
- Profiteering by ad networks at the expense of user security.

## Solution
This project ensures **targeted advertising without private data revelation** by utilizing **SP1 zkVM** for zero-knowledge proofs. The system works as follows:
1. **ZK Proof Generation:** Users generate a **zero-knowledge proof** of their data using **SP1 zkVM** without exposing private details.
2. **Verification Against Ad Criteria:** The ZK proof is verified to check if the user qualifies for an ad, without revealing raw data.
3. **Ad Display & Rewards:** If the user meets the criteria, the ad is shown, and they receive a **USDC reward** for viewing.

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

https://github.com/MarcusWentz/eth_trifecta_2025/tree/main/sp1

## Frontend

https://github.com/MarcusWentz/eth_trifecta_2025/tree/main/frontend
