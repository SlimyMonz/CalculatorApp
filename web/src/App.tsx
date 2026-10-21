import { useEffect, useState } from "react";
import { calculate, type Operation } from "./api";


// Constants
interface OperatorConfig {
  operation: Operation; // what the API calls it
  label: string;        // what the button and display show
  keyboardKey: string;  // which physical key triggers it
}

const OPERATORS: OperatorConfig[] = [
  { operation: "divide",   label: "÷", keyboardKey: "/" },
  { operation: "multiply", label: "x", keyboardKey: "*" },
  { operation: "subtract", label: "-", keyboardKey: "-" },
  { operation: "add",      label: "+", keyboardKey: "+" },
];

const DIGIT_KEYS = [7, 8, 9, 4, 5, 6, 1, 2, 3]; // laid out in grid order, 0 sits on the bottom row
const MAX_DIGITS = 9;
const ERROR_TEXT = "Error";
const ZERO_TEXT = "0";


// Helpers

// Looks up the display symbol (÷, x, -, +) for an operation.
function getOperatorLabel(operation: Operation): string {
  return OPERATORS.find((o) => o.operation === operation)?.label ?? "";
}

// Trims floating point noise and keeps the result within the display width.
function formatResult(result: number): string {
  return String(Number(result.toPrecision(MAX_DIGITS)));
}


// Component
export default function App() {
  // State

  // The text currently shown on the screen.
  const [display, setDisplay] = useState(ZERO_TEXT);

  // The first number, saved when an operator is pressed.
  const [firstNumber, setFirstNumber] = useState<number | null>(null);

  // The operation waiting for a second number.
  const [pendingOperation, setPendingOperation] = useState<Operation | null>(null);

  // When true, the next digit replaces the display instead of appending to it.
  const [startNewEntry, setStartNewEntry] = useState(true);

  const hasError = display === ERROR_TEXT;

  // Actions

  const resetCalculator = () => {
    setDisplay(ZERO_TEXT);
    setFirstNumber(null);
    setPendingOperation(null);
    setStartNewEntry(true);
  };

  const pressDigit = (digit: string) => {
    const shouldReplaceDisplay = startNewEntry || display === ZERO_TEXT || hasError;

    if (shouldReplaceDisplay) {
      setDisplay(digit);
      setStartNewEntry(false);
      return;
    }

    if (display.length < MAX_DIGITS) {
      setDisplay(display + digit);
    }
  };

  const pressOperator = (operation: Operation) => {
    if (hasError) return;

    // One operation at a time: once the second number is being typed, ignore further operators until Enter or Clear.
    const isSecondNumberBeingTyped = pendingOperation !== null && !startNewEntry;
    if (isSecondNumberBeingTyped) return;

    // Only capture the first number once. Pressing a different operator before typing the second number just swaps the operation.
    if (pendingOperation === null) {
      setFirstNumber(Number(display));
    }

    setPendingOperation(operation);
    setStartNewEntry(true);
  };

  // Handles the Enter key: sends both numbers to the API and shows the result.
  const pressEnter = async () => {
    const isReadyToCalculate =
      pendingOperation !== null && firstNumber !== null && !startNewEntry;
    if (!isReadyToCalculate) return;

    try {
      const response = await calculate(pendingOperation, firstNumber, Number(display));
      setDisplay(formatResult(response.result));
    } catch {
      setDisplay(ERROR_TEXT); // for example, divide by zero
    }

    // Clear the pending state but keep the result on screen.
    setFirstNumber(null);
    setPendingOperation(null);
    setStartNewEntry(true);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      const matchingOperator = OPERATORS.find((o) => o.keyboardKey === key);

      if (/^\d$/.test(key)) {
        pressDigit(key);
      } else if (key === "Enter" || key === "=") {
        pressEnter();
      } else if (key === "Escape" || key === "c") {
        resetCalculator();
      } else if (matchingOperator) {
        pressOperator(matchingOperator.operation);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // --- Render --------------------------------------------------------------

  return (
    <main className="calc">
      {/* Decorative solar panel */}
      <div className="solar" aria-hidden="true" />

      {/* Display: pending operator on the left, current number on the right */}
      <div className="screen" role="status" aria-live="polite">
        <span className="pending">
          {pendingOperation ? getOperatorLabel(pendingOperation) : ""}
        </span>
        <span className="value">{display}</span>
      </div>

      <div className="keys">
        {/* Digits 1-9 */}
        {DIGIT_KEYS.map((digit) => (
          <button
            key={digit}
            className="key"
            onClick={() => pressDigit(String(digit))}
          >
            {digit}
          </button>
        ))}

        {/* Bottom row: Clear, 0, Enter */}
        <button className="key clear" onClick={resetCalculator}>
          C
        </button>
        <button className="key" onClick={() => pressDigit("0")}>
          0
        </button>
        <button className="key enter" onClick={pressEnter}>
          Enter
        </button>

        {/* Operator column (right side, top to bottom) */}
        {OPERATORS.map((operator, index) => {
          const isActive = pendingOperation === operator.operation;

          return (
            <button
              key={operator.operation}
              className={`key op${isActive ? " active" : ""}`}
              style={{ gridColumn: 4, gridRow: index + 1 }}
              onClick={() => pressOperator(operator.operation)}
              aria-label={operator.operation}
            >
              {operator.label}
            </button>
          );
        })}
      </div>
    </main>
  );
}