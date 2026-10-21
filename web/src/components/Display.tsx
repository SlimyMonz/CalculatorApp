interface DisplayProps {
  value: string;
  pendingLabel: string;
}

export default function Display({ value, pendingLabel }: DisplayProps) {
  return (
    <>
      {/* Decorative solar panel */}
      <div className="solar" aria-hidden="true" />

      {/* Pending operator on the left, current number on the right */}
      <div className="screen" role="status" aria-live="polite">
        <span className="pending">{pendingLabel}</span>
        <span className="value">{value}</span>
      </div>
    </>
  );
}