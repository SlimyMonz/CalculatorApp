import type { Operation } from "./types";

// Mirrors ICalculationResult on the backend.
export interface CalculationResult {
  operation: string;
  a: number;
  b: number;
  result: number;
}

// Picks the right endpoint function for the operation the user selected.
export function calculate(op: Operation, a: number, b: number): Promise<CalculationResult> {
  switch (op) {
    case "add":      return add(a, b);
    case "subtract": return subtract(a, b);
    case "multiply": return multiply(a, b);
    case "divide":   return divide(a, b);
  }
}

// Normally this would be generated in some way with an OpenAPI spec based on the backend, but for the sake of this demo I duplicated the endpoints manually.
async function add(a: number, b: number): Promise<CalculationResult> {
  const res = await fetch("/api/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ a, b }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail ?? "Add request failed");
  }
  return res.json();
}

async function subtract(a: number, b: number): Promise<CalculationResult> {
  const res = await fetch("/api/subtract", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ a, b }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail ?? "Subtract request failed");
  }
  return res.json();
}

async function multiply(a: number, b: number): Promise<CalculationResult> {
  const res = await fetch("/api/multiply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ a, b }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail ?? "Multiply request failed");
  }
  return res.json();
}

async function divide(a: number, b: number): Promise<CalculationResult> {
  const res = await fetch("/api/divide", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ a, b }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail ?? "Divide request failed");
  }
  return res.json();
}

