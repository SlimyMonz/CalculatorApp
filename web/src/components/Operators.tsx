import type { Operation } from "../types";
import { OPERATORS } from "../calculator";

interface OperatorsProps {
  activeOperation: Operation | null; // highlights the pending operator
  onOperator: (operation: Operation) => void;
}

export default function Operators({ activeOperation, onOperator }: OperatorsProps) {
  return (
    <div className="operators">
      {OPERATORS.map((operator) => {
        const isActive = activeOperation === operator.operation;

        return (
          <button
            key={operator.operation}
            className={`key op${isActive ? " active" : ""}`}
            onClick={() => onOperator(operator.operation)}
            aria-label={operator.operation}
          >
            {operator.label}
          </button>
        );
      })}
    </div>
  );
}