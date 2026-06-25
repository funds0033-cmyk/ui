import { useSorokit } from "@/context/useSorokit";
import { Button } from "@/components/ui/Button";
import { truncateAddress } from "@/lib/utils";

export function WalletConnectButton({
  onOpenModal,
}: {
  onOpenModal?: () => void;
}) {
  const { isConnected, isConnecting, address, connectWallet } = useSorokit();

  if (isConnected && address) {
    return (
      <button
        onClick={onOpenModal}
        className="inline-flex items-center gap-1.5 sm:gap-2 h-8 px-2 sm:px-3.5 rounded-lg bg-surface-2 border border-line hover:border-line-2 transition-colors cursor-pointer"
      >
        <span className="w-2 h-2 rounded-full bg-green shrink-0" />
        <span data-address className="hidden sm:inline">{truncateAddress(address)}</span>
      </button>
    );
  }

  return (
    <Button size="md" loading={isConnecting} onClick={connectWallet} className="px-2.5 sm:px-4">
      <span className="hidden sm:inline">{isConnecting ? "Connecting…" : "Connect Wallet"}</span>
      <span className="sm:hidden">{isConnecting ? "…" : "Connect"}</span>
    </Button>
  );
}
