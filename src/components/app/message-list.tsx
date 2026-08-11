import { useState } from "react";
import { ChevronDown, Copy, Check } from "lucide-react";
import type { ChatMessage } from "@/lib/chat-store";

function Reasoning({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full text-[15px] text-muted-foreground transition-colors hover:text-foreground"
      >
        {open ? "Скрыть размышления" : "Показать размышления"}
        <ChevronDown
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="mt-2 border-l-2 border-border pl-3 text-sm leading-relaxed text-muted-foreground">
          {text}
        </p>
      )}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="mt-3 flex items-center gap-2 rounded-full py-1 text-[15px] text-muted-foreground transition-colors hover:text-foreground"
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {copied ? "Скопировано" : "Копировать"}
    </button>
  );
}

export function MessageList({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="flex-1 space-y-6 overflow-y-auto px-4 pb-6 pt-2">
      {messages.map((m) =>
        m.role === "user" ? (
          <div
            key={m.id}
            className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3"
          >
            <span className="pt-2 font-mono text-sm text-muted-foreground">
              {String(m.turn ?? 1).padStart(2, "0")}
            </span>
            <div className="flex justify-end">
              <p className="max-w-[85%] rounded-3xl bg-surface-muted px-4 py-2.5 text-[15px] leading-relaxed text-foreground">
                {m.text}
              </p>
            </div>
          </div>
        ) : (
          <div key={m.id} className="pl-1 pr-1">
            {m.pending ? (
              <p className="animate-pulse text-[15px] text-muted-foreground">
                Думает...
              </p>
            ) : (
              <>
                {m.reasoning && <Reasoning text={m.reasoning} />}
                <div className="space-y-3">
                  {m.text.split("\n\n").map((p, i) => (
                    <p
                      key={i}
                      className="text-[17px] leading-[1.6] text-foreground"
                    >
                      {p}
                    </p>
                  ))}
                </div>
                <CopyButton text={m.text} />
              </>
            )}
          </div>
        ),
      )}
    </div>
  );
}
