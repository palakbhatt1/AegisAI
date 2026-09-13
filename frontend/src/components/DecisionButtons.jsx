export default function DecisionButtons({ onApprove, onReject, isSubmitting }) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 mt-8 p-6 lg:p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-white shadow-2xl items-center justify-between">
      <div className="flex-1 text-center sm:text-left">
        <h4 className="text-lg font-black tracking-tight text-black mb-1">AUTHORIZATION REQUIRED</h4>
        <p className="text-sm font-medium text-slate-500">Review the proposed solution before dispatching.</p>
      </div>
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <button 
          onClick={onReject}
          disabled={isSubmitting}
          className="btn-danger w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
          )}
          REJECT
        </button>
        <button 
          onClick={onApprove}
          disabled={isSubmitting}
          className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          )}
          APPROVE
        </button>
      </div>
    </div>
  );
}
