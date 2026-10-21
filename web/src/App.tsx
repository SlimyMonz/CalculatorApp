import { useEffect, useState } from "react";
import { calculate } from "./api";
import type { Operation } from "./types";
import { ERROR_TEXT, MAX_DIGITS, OPERATORS, ZERO_TEXT, formatResult, getOperatorLabel } from "./calculator";
import Display from "./components/Display";
import Keypad from "./components/Keypad";
import Operators from "./components/Operators";

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

  // Render
  return (
    <main className="calc">
      <Display
        value={display}
        pendingLabel={pendingOperation ? getOperatorLabel(pendingOperation) : ""}
      />
      <div className="keys">
        <Keypad onDigit={pressDigit} onClear={resetCalculator} onEnter={pressEnter} />
        <Operators activeOperation={pendingOperation} onOperator={pressOperator} />
      </div>
    </main>
  );
}