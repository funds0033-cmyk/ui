import { AccountCard } from "@/components/AccountCard";
import { BalanceList } from "@/components/BalanceList";
import { useSorokit } from "@/context/SorokitProvider";

export function AccountScreen() {
  const { isConnected } = useSorokit();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[13px] font-semibold text-text">Account</h2>
        <p className="text-[11px] text-text-3 mt-0.5">
          Account details and asset balances
        </p>
      </div>

      {!isConnected ? (
        <div className="rounded-lg border border-border bg-surface p-8 text-center">
          <p className="text-[11px] text-text-3">
            Connect your wallet to view account details
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <AccountCard />
          <BalanceList />
        </div>
      )}
    </div>
  );
}
