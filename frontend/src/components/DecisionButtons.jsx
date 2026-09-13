export default function DecisionButtons({ onApprove, onReject, isSubmitting }) {
  return (
    <div className="flex gap-4 mt-6 p-4 bg-slate-800/40 rounded-xl border border-slate-700/50">
      <div className="flex-1">
        <h4 className="text-sm font-medium text-slate-200 mb-1">Human Decision Required</h4>
        <p className="text-xs text-slate-400">Review the suggested fix before applying it to the codebase.</p>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={onReject}
          disabled={isSubmitting}
          className="btn-danger disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          )}
          Reject
        </button>
        <button 
          onClick={onApprove}
          disabled={isSubmitting}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          )}
          Approve
        </button>
      </div>
    </div>
  );
}
