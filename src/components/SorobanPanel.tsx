import { useState } from "react";
import { useSorokit } from "@/context/SorokitProvider";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { getClient } from "@/lib/client";

type State = "idle" | "loading" | "success" | "error";

export function SorobanPanel() {
  const { isConnected, address } = useSorokit();
  const [contractId, setContractId] = useState("");
  const [method, setMethod] = useState("");
  const [args, setArgs] = useState("");
  const [state, setState] = useState<State>("idle");
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  const canInvoke = isConnected && contractId.trim() && method.trim();

  async function invoke(e: React.FormEvent) {
    e.preventDefault();
    if (!canInvoke) return;
    setState("loading");
    setError(null);
    setResult(null);
    try {
      let parsedArgs: unknown[] = [];
      if (args.trim()) {
        try {
          parsedArgs = JSON.parse(args.trim());
        } catch {
          setError("Invalid JSON in arguments");
          setState("error");
          return;
        }
      }
      const { data, error: err } = await getClient().soroban.invokeContract({
        contractId: contractId.trim(),
        method: method.trim(),
        args: parsedArgs,
        sourceAccount: address ?? undefined,
      });
      if (err) {
        setError(err);
        setState("error");
        return;
      }
      setResult(data);
      setState("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setState("error");
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardContent>
          <p className="text-[11px] text-text-3 text-center py-8">
            Connect your wallet to invoke contracts
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Contract Invoke</CardTitle>
          <Badge variant="teal">Soroban</Badge>
        </div>
        <CardDescription>Call a Soroban smart contract method</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={invoke} className="space-y-3">
          <Input
            label="Contract ID"
            placeholder="C..."
            value={contractId}
            onChange={(e) => setContractId(e.target.value)}
            disabled={state === "loading"}
          />
          <Input
            label="Method"
            placeholder="transfer, balance, mint…"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            disabled={state === "loading"}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-text-2">
              Arguments (JSON array)
            </label>
            <textarea
              placeholder='["arg1", 42]'
              value={args}
              onChange={(e) => setArgs(e.target.value)}
              disabled={state === "loading"}
              rows={3}
              className="w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-[11px] font-mono text-text placeholder:text-text-3 outline-none focus:border-border-2 focus:ring-1 focus:ring-primary/30 transition-colors resize-none disabled:opacity-40"
            />
          </div>

          {state === "success" && result !== null && (
            <div className="rounded-md bg-green-dim border border-green/20 p-3 space-y-1.5">
              <Badge variant="success" dot>
                Result
              </Badge>
              <pre className="text-[10px] font-mono text-text-2 whitespace-pre-wrap break-all mt-1">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
          {state === "error" && error && (
            <div className="rounded-md bg-red-dim border border-red/20 p-3">
              <p className="text-[11px] text-red">{error}</p>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter>
        {(state === "success" || state === "error") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setState("idle");
              setResult(null);
              setError(null);
            }}
          >
            Clear
          </Button>
        )}
        <Button
          size="sm"
          loading={state === "loading"}
          disabled={!canInvoke}
          onClick={invoke as unknown as React.MouseEventHandler}
        >
          {state === "loading" ? "Invoking…" : "Invoke"}
        </Button>
      </CardFooter>
    </Card>
  );
}
