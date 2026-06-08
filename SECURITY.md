# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in sorokit-ui, please **do not** create a public GitHub issue. Instead:

1. **Email the maintainers** with a detailed description of the vulnerability
2. Include steps to reproduce the issue if possible
3. Allow time for the maintainers to respond and develop a fix

Security vulnerabilities will be addressed promptly and disclosed responsibly.

## Security Best Practices

When using sorokit-ui:

- **Always validate user input** before passing it to contract methods or transaction builders
- **Keep dependencies updated** — run `npm audit` regularly and update packages
- **Use HTTPS** when communicating with Horizon or Soroban RPC endpoints
- **Never expose private keys** — sorokit-ui works with wallet SDKs that handle key management securely
- **Review contract code** before invoking Soroban methods with user funds
- **Test thoroughly** on testnet before deploying to mainnet

## Dependency Security

This project uses:

- `sorokit-core` for Stellar/Soroban logic
- `@creit.tech/stellar-wallets-kit` for wallet integration
- Standard React and TypeScript tooling

All dependencies are regularly audited. You can check for vulnerabilities with:

```bash
npm audit
```

## Support

For general security questions or best practices, feel free to open a discussion or issue.
