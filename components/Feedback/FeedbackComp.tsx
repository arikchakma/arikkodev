export default function FeedbackComp() {
  return (
    <form className="mt-10 w-[min(400px,100%)] rounded-lg bg-link-color/[0.02] ring-1 ring-link-color/10">
      <div className="px-5 pb-4 pt-5">
        <h4 className="font-medium tracking-tight">Feedback</h4>
        <textarea
          aria-label="Feedback input"
          placeholder="Your feedback..."
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          className="mt-2 block w-full rounded-md border-none bg-link-color/5 p-2 outline-none focus:ring-1 focus:ring-indigo-500"
          rows={4}
        />
      </div>
      {/* Reactions */}
      <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4">
        <div className="flex items-center gap-1.5">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/30">
            <span className="text-lg leading-none">😊</span>
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/30">
            <span className="text-lg leading-none">🎉</span>
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/30">
            <span className="text-lg leading-none">😢</span>
          </button>
        </div>
        <button
          type="submit"
          className="rounded-sm bg-text-dark px-4 py-2 font-medium leading-none tracking-tight text-bgWhite"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
