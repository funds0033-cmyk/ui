import { useSorokit } from "@/context/SorokitProvider";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { truncateAddress } from "@/lib/utils";
import type { Balance } from "@/lib/client";

function AssetRow({ b }: { b: Balance }) {
  const symbol = b.assetType === "native" ? "XLM" : (b.assetCode ?? b.asset);
  const isNative = b.assetType === "native";

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
      <div className="flex items-center gap-2.5">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${isNative ? "bg-teal-dim text-teal" : "bg-purple-dim text-purple"}`}
        >
          {symbol.slice(0, 2)}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[12px] font-medium text-text">{symbol}</span>
          {b.assetIssuer ? (
            <span data-address>{truncateAddress(b.assetIssuer, 8, 4)}</span>
          ) : (
            <span className="text-[10px] text-text-3">Stellar Lumens</span>
          )}
        </div>
      </div>
      <span className="text-[12px] font-medium text-text tabular-nums">
        {parseFloat(b.balance).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 4,
        })}
      </span>
    </div>
  );
}

export function BalanceList() {
  const { balances, isLoadingAccount, isConnected } = useSorokit();
  if (!isConnected) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Assets</CardTitle>
          {!isLoadingAccount && (
            <Badge variant="default">{balances.length}</Badge>
          )}
        </div>
        <CardDescription>Token balances</CardDescription>
      </CardHeader>
      <CardContent className="p-0 px-4">
        {isLoadingAccount ? (
          <div className="py-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-surface-2 animate-pulse" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-16 rounded bg-surface-2 animate-pulse" />
                  <div className="h-2.5 w-24 rounded bg-surface-2 animate-pulse" />
                </div>
                <div className="h-3 w-12 rounded bg-surface-2 animate-pulse" />
              </div>
            ))}
          </div>
        ) : balances.length === 0 ? (
          <p className="text-[11px] text-text-3 text-center py-6">
            No assets found
          </p>
        ) : (
          <div>
            {balances.map((b) => (
              <AssetRow key={b.asset} b={b} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
