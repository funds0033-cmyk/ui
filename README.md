<div align="center">

<h1>sorokit-ui</h1>

<p><strong>React component library for Stellar.</strong></p>

<p>
  Drop-in UI primitives for wallet connection, transaction flows,<br/>
  account display, and Soroban contract interaction — powered by <code>sorokit-core</code>.
</p>

<p>
  <a href="https://github.com/Just-Bamford/sorokit-ui/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT" />
  </a>
  <img src="https://img.shields.io/badge/react-%5E18.0-61dafb" alt="React 18" />
  <img src="https://img.shields.io/badge/typescript-%5E5.0-3178c6" alt="TypeScript" />
  <img src="https://img.shields.io/badge/stellar-mainnet%20%7C%20testnet%20%7C%20futurenet-6f42c1" alt="Stellar Networks" />
</p>

<p>Part of the <a href="https://github.com/Just-Bamford">sorokit</a> ecosystem.</p>

<br/>

</div>

---

## Overview

`sorokit-ui` is the React layer of the sorokit ecosystem. It provides ready-to-use components that connect directly to `sorokit-core` — so you can add wallet connection, balance display, payment flows, and Soroban contract interaction to your app without building any of the wiring yourself.

All components are unstyled by default and accept a `className` prop, making them compatible with Tailwind, CSS Modules, or any styling approach you already use.

---

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Provider Setup](#provider-setup)
- [Components](#components)
- [Hooks](#hooks)
- [Styling](#styling)
- [Networks](#networks)
- [Design Principles](#design-principles)
- [License](#license)

---

## Installation

```bash
npm install sorokit-ui sorokit-core @creit.tech/stellar-wallets-kit
```

Both `sorokit-core` and `@creit.tech/stellar-wallets-kit` are required peer dependencies.

---

## Quick Start

Wrap your app in `SorokitProvider`, then use components anywhere in the tree:

```tsx
import {
  SorokitProvider,
  ConnectWalletButton,
  AccountBalance,
} from "sorokit-ui";

function App() {
  return (
    <SorokitProvider network="testnet">
      <ConnectWalletButton />
      <AccountBalance />
    </SorokitProvider>
  );
}
```

---

## Provider Setup

`SorokitProvider` initialises a `sorokit-core` client and makes it available to all child components via context.

```tsx
import { SorokitProvider } from "sorokit-ui";

<SorokitProvider
  network="testnet" // "mainnet" | "testnet" | "futurenet"
  horizonUrl="https://..." // optional: override Horizon URL
  rpcUrl="https://..." // optional: override Soroban RPC URL
>
  {children}
</SorokitProvider>;
```

---

## Components

### Wallet

```tsx
// Connect / disconnect button with wallet picker
<ConnectWalletButton />

// Display the connected wallet's public key (truncated)
<WalletAddress />

// Show connection status
<WalletStatus />
```

### Account

```tsx
// Display all balances for the connected account
<AccountBalance />

// Filter by asset
<AccountBalance assetCode="USDC" excludeZero />

// Display a single asset balance inline
<AssetBalance assetCode="XLM" />
```

### Transactions

```tsx
// Pre-wired payment form: amount + destination + submit
<PaymentForm
  onSuccess={(result) => console.log(result)}
  onError={(err) => console.error(err)}
/>

// Display a single transaction's status by hash
<TransactionStatus hash="abc123..." />
```

### Soroban

```tsx
// Read a contract value and display it
<ContractRead
  contractId="C..."
  method="get_balance"
  args={[scAddress]}
/>

// Invoke a contract method with a connected wallet
<ContractInvoke
  contractId="C..."
  method="transfer"
  args={[scAddress, scAmount]}
  onSuccess={(hash) => console.log(hash)}
/>
```

---

## Hooks

If you need the underlying client or wallet state directly, hooks are available:

```tsx
import { useSorokit, useWallet, useAccount, useTransaction } from "sorokit-ui";

// Access the raw sorokit-core client
const { client } = useSorokit();

// Wallet state and connect/disconnect actions
const { publicKey, connected, connect, disconnect } = useWallet();

// Account data for the connected wallet
const { balances, loading, error } = useAccount();

// Build and submit transactions
const { buildPayment, submit, status } = useTransaction();
```

All hooks must be used inside a `SorokitProvider`.

---

## Styling

Components are unstyled by default. Every component accepts a `className` prop:

```tsx
// Tailwind
<ConnectWalletButton className="rounded-lg bg-indigo-600 px-4 py-2 text-white" />

// CSS Modules
<AccountBalance className={styles.balance} />
```

To apply a consistent base style across all components, pass a `classNames` map to the provider:

```tsx
<SorokitProvider
  network="testnet"
  classNames={{
    connectButton: "rounded-lg bg-indigo-600 px-4 py-2 text-white",
    accountBalance: "font-mono text-sm text-gray-700",
  }}
>
  {children}
</SorokitProvider>
```

---

## Networks

```tsx
// Development
<SorokitProvider network="testnet">

// Production
<SorokitProvider network="mainnet">

// Bleeding edge
<SorokitProvider network="futurenet">

// Self-hosted infrastructure
<SorokitProvider
  network="mainnet"
  horizonUrl="https://my-horizon.example.com"
  rpcUrl="https://my-rpc.example.com"
>
```

---

## Design Principles

**Composable** — every component does one thing. Combine them freely; there are no required groupings or wrapper hierarchies beyond the provider.

**Unstyled by default** — no opinion about your design system. Bring Tailwind, CSS Modules, styled-components, or plain CSS.

**Powered by sorokit-core** — all network logic lives in [`sorokit-core`](https://github.com/Just-Bamford/sorokit-core). Components are thin UI wrappers — no duplicated Stellar logic, no diverging behaviour between the SDK and the UI layer.

**No-throw, all the way down** — error states are props and hook return values, never unhandled exceptions.

---

## Contributing

Pull requests are welcome. For significant changes, please open an issue first to discuss what you'd like to change.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed development guidelines, code style, and the PR process.

---

## Publishing to npm

This package is now public (`"private": false` in package.json). To publish a new version:

1. Update the version in `package.json`
2. Update [CHANGELOG.md](CHANGELOG.md) with changes
3. Create a GitHub release with tag `v{version}`
4. CI automatically publishes to npm

Requires `NPM_TOKEN` secret in GitHub repository settings.

---

## License

[MIT](LICENSE)
