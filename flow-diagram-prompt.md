# Flow Diagram Prompt for Claude Image Generation

Create a technical flow diagram image showing a privacy-preserving blockchain transaction system with three main operations: token swaps, balance shielding (deposits), and withdrawals.

## System Components

- **Public Wallet**: Regular blockchain wallet address (visible on-chain)
- **Private Pool**: Encrypted UTXO storage in Merkle tree (off-chain encrypted data)
- **Ephemeral Wallet**: Temporary wallet derived from user signature (breaks transaction links)
- **Merkle Tree**: Stores commitments to encrypted UTXOs (only root hash on-chain)
- **ZK Proof Circuit**: Generates zero-knowledge proofs without revealing transaction details
- **Nullifiers**: Prevent double-spending without revealing which UTXO was spent

## Flow 1: Shielding Balances (Deposit)

**Steps:**
1. Public Wallet → [encrypt] → Encrypted UTXO creation
2. Generate Merkle commitment → Add to Merkle Tree
3. Generate ZK proof (proves: valid deposit, correct Merkle inclusion, balance equation satisfied)
4. Submit transaction to relayer/indexer
5. Store encrypted UTXO data client-side
6. Private balance updated

**Visual flow**: Public Wallet → Encryption Box → UTXO Creation → Merkle Tree (show root hash) → Client Storage

## Flow 2: Private Token Swap

**Scenario A (User has private balance):**
1. Private Pool → [ZK proof + nullifiers] → Withdraw to Ephemeral Wallet
2. Ephemeral Wallet → [DEX Swap] → Swapped tokens
3. Swapped tokens → [encrypt] → Deposit back to Private Pool

**Scenario B (User has public balance):**
1. Public Wallet → Deposit to Private Pool (Flow 1)
2. Private Pool → Withdraw to Ephemeral Wallet
3. Ephemeral Wallet → DEX Swap
4. Swapped tokens → Deposit to Private Pool
5. Private Pool → Withdraw to Public Wallet

**Key visual element**: Show Ephemeral Wallet breaking the transaction link - no direct connection between user's public wallet and the swap transaction.

## Flow 3: Withdrawing Funds

**Steps:**
1. Select encrypted UTXOs from Private Pool
2. Generate ZK proof (proves ownership without revealing which UTXOs)
3. Generate nullifiers for spent UTXOs
4. Create change UTXO (encrypted, returned to Private Pool)
5. Send withdrawal amount to Recipient Address
6. Update Merkle Tree with new commitments

**Visual flow**: Encrypted UTXOs → ZK Proof Generation → Nullifier Creation → [Recipient Address + Change UTXO] → Merkle Tree Update

## Privacy Mechanisms to Highlight

- **Zero-Knowledge Proofs**: Prove validity without revealing amounts/identities
- **Encrypted UTXOs**: Client-side encryption, only commitments on-chain
- **Merkle Tree**: Efficient verification without revealing full data
- **Nullifiers**: Double-spend prevention without UTXO revelation
- **Ephemeral Wallets**: Transaction unlinkability for swaps

## Visual Style Requirements

Create a clean, professional technical diagram with:

**Layout**: Three main sections (left to right or top to bottom):
1. Shielding/Deposit flow
2. Swap flow (show both scenarios)
3. Withdrawal flow

**Elements**:
- Rectangular boxes for components (Public Wallet, Private Pool, Ephemeral Wallet, Merkle Tree, ZK Circuit, DEX)
- Arrows showing data/transaction flow
- Color coding:
  - Blue: Public/on-chain operations
  - Green: Private/encrypted operations
  - Orange: ZK proof generation
  - Purple: Ephemeral wallet operations
- Labels on arrows: "encrypt", "decrypt", "prove", "commit", "nullify", "swap"
- Merkle tree visualization: Show root hash at top, leaf commitments at bottom, tree structure
- Encryption indicators: Lock icons or shaded areas for encrypted data
- Break indicators: Show how ephemeral wallet breaks transaction links in swap flow

**Clarity**: Make it immediately clear which operations are public (visible on-chain) vs private (encrypted/off-chain), and how the ephemeral wallet provides transaction unlinkability.
