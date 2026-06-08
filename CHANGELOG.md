# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial component library release with core wallet, account, transaction, and Soroban contract interaction components
- `SorokitProvider` for context initialization
- Wallet connection components (`ConnectWalletButton`, `WalletAddress`, `WalletStatus`)
- Account display components (`AccountBalance`, `AssetBalance`, `BalanceList`)
- Transaction components (`PaymentForm`, `TransactionStatus`, `TransactionHistory`)
- Soroban interaction components (`ContractRead`, `ContractInvoke`, `SorobanPanel`)
- UI primitives (Button, Card, Badge, Input, Skeleton, Separator)
- Hooks for accessing client, wallet, account, and transaction state
- Support for Stellar mainnet, testnet, and futurenet
- TypeScript strict mode support
- Tailwind CSS compatibility
- Unstyled components with className prop support

### Coming Soon

- Storybook documentation
- Comprehensive test coverage
- More contract interaction examples
- Mobile-responsive design patterns
