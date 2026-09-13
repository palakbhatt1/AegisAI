export default function SeverityBadge({ severity }) {
  const styles = {
    low: "bg-slate-700 text-slate-300 border-slate-600",
    medium: "bg-amber-900/40 text-amber-300 border-amber-700/50",
    high: "bg-orange-900/40 text-orange-300 border-orange-700/50",
    critical: "bg-rose-900/40 text-rose-300 border-rose-700/50 shadow-[0_0_10px_rgba(225,29,72,0.2)]"
  };

  const style = styles[severity?.toLowerCase()] || styles.low;

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border uppercase tracking-wider ${style}`}>
      {severity}
    </span>
  );
}
