// Mirrors ICalculationResult on the backend.
export interface CalculationResult {
  operation: string;
  a: number;
  b: number;
  result: number;
}

export type Operation = "add" | "subtract" | "multiply" | "divide";

export async function calculate(op: Operation, a: number, b: number): Promise<CalculationResult> {
  const res = await fetch(`/api/${op}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ a, b }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Request failed");
  }
  return res.json();
}
