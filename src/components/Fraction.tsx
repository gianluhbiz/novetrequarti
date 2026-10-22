/** Stacked ¾ like on the café's sign. Inherits font size from the parent. */
export default function Fraction({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex translate-y-[-0.04em] flex-col items-center align-top text-[0.36em] leading-[0.92] ${className}`}
      aria-label="tre quarti"
    >
      <span>3</span>
      <span className="my-[0.05em] h-[0.08em] w-[1.1em] bg-current" />
      <span>4</span>
    </span>
  )
}
