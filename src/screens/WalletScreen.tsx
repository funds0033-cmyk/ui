import { useSorokit } from "@/context/SorokitProvider";
import { AccountCard } from "@/components/AccountCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { truncateAddress } from "@/lib/utils";

export function WalletScreen() {
  const { address, isConnected, disconnectWallet, network } = useSorokit();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[13px] font-semibold text-text">Wallet</h2>
        <p className="text-[11px] text-text-3 mt-0.5">
          Manage your connected wallet
        </p>
      </div>

      {/* Status */}
      <div className="rounded-lg border border-border bg-surface p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[11px] font-bold text-primary shrink-0">
              {address ? address.slice(0, 2) : "—"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium text-text">
                  {isConnected ? "Connected" : "Disconnected"}
                </span>
                <Badge variant={isConnected ? "success" : "default"} dot>
                  {isConnected ? "Active" : "Inactive"}
                </Badge>
              </div>
              {address && (
                <span data-address className="mt-0.5 block">
                  {truncateAddress(address, 12, 6)}
                </span>
              )}
            </div>
          </div>
          {isConnected && (
            <Button variant="secondary" size="sm" onClick={disconnectWallet}>
              Disconnect
            </Button>
          )}
        </div>

        {network && (
          <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-3">
            <InfoItem label="Network" value={network.name} />
            <InfoItem label="RPC" value={network.rpcUrl} mono />
          </div>
        )}
      </div>

      <AccountCard />
    </div>
  );
}

function InfoItem({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-text-3">
        {label}
      </span>
      <span
        className={`text-[11px] text-text-2 break-all ${mono ? "font-mono" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
