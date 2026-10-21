import type { Operation } from "./types";

export interface OperatorConfig {
  operation: Operation;
  label: string;
  keyboardKey: string;
}

export const OPERATORS: OperatorConfig[] = [
  { operation: "divide",   label: "÷", keyboardKey: "/" },
  { operation: "multiply", label: "x", keyboardKey: "*" },
  { operation: "subtract", label: "-", keyboardKey: "-" },
  { operation: "add",      label: "+", keyboardKey: "+" },
];

export const MAX_DIGITS = 9;
export const ERROR_TEXT = "Error";
export const ZERO_TEXT = "0";

export function getOperatorLabel(operation: Operation): string {
  return OPERATORS.find((o) => o.operation === operation)?.label ?? "";
}

export function formatResult(result: number): string {
  return String(Number(result.toPrecision(MAX_DIGITS)));
}