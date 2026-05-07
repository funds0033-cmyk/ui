import { SorobanPanel } from "@/components/SorobanPanel";

export function SorobanScreen() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-[13px] font-semibold text-text">Soroban</h2>
        <p className="text-[11px] text-text-3 mt-0.5">
          Invoke smart contracts on the Stellar network
        </p>
      </div>
      <SorobanPanel />
    </div>
  );
}
