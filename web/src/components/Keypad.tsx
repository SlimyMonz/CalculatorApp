const DIGIT_KEYS = [7, 8, 9, 4, 5, 6, 1, 2, 3]; // grid order; 0 sits on the bottom row

interface KeypadProps {
  onDigit: (digit: string) => void;
  onClear: () => void;
  onEnter: () => void;
}

export default function Keypad({ onDigit, onClear, onEnter }: KeypadProps) {
  return (
    <div className="keypad">
      {DIGIT_KEYS.map((digit) => (
        <button key={digit} className="key" onClick={() => onDigit(String(digit))}>
          {digit}
        </button>
      ))}

      {/* Bottom row: Clear, 0, Enter */}
      <button className="key clear" onClick={onClear}>
        C
      </button>
      <button className="key" onClick={() => onDigit("0")}>
        0
      </button>
      <button className="key enter" onClick={onEnter}>
        Enter
      </button>
    </div>
  );
}