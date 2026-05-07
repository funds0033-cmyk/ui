import { TransactionPanel } from "@/components/TransactionPanel";

export function TransactionsScreen() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[13px] font-semibold text-text">Transactions</h2>
        <p className="text-[11px] text-text-3 mt-0.5">
          Submit payments on the Stellar network
        </p>
      </div>
      <TransactionPanel />
    </div>
  );
}
