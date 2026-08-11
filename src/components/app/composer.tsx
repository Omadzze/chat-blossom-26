import { useState } from "react";
import { ArrowUp } from "lucide-react";

export function Composer({ onSend }: { onSend: (text: string) => void }) {
  const [value, setValue] = useState("");

  function submit() {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  }

  return (
    <div className="sticky bottom-0 bg-background px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="rounded-[28px] border border-border bg-background px-3 pb-2 pt-1"
      >
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          rows={1}
          placeholder="Спросите о проектах, предприятиях или отклонениях"
          className="max-h-32 min-h-[3.25rem] w-full resize-none bg-transparent px-1 py-2.5 text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
        />
        <div className="flex items-center justify-end gap-2">
          <button
            type="submit"
            aria-label="Отправить"
            disabled={!value.trim()}
            className="grid size-10 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-muted disabled:opacity-40"
          >
            <ArrowUp className="size-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
