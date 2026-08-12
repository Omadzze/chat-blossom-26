import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { Composer } from "@/components/app/composer";
import { MessageList } from "@/components/app/message-list";
import { sendMessage, useChat } from "@/lib/chat-store";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Диалог — Аналитик" },
      {
        name: "description",
        content:
          "Диалог с аналитическим помощником: ответы по проектам, предприятиям и отклонениям с указанием источника данных.",
      },
      { property: "og:title", content: "Диалог — Аналитик" },
      {
        property: "og:description",
        content: "Ответы по PMI и PMT с указанием источника каждой цифры.",
      },
    ],
  }),
  component: ChatPage,
});

function ChatPage() {
  const messages = useChat();

  return (
    <AppShell showNav>
      <main className="flex flex-1 flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 px-4 py-8">
            <p className="text-[15px] text-muted-foreground">
              Задайте вопрос, чтобы начать диалог.
            </p>
          </div>
        ) : (
          <MessageList messages={messages} />
        )}
        <Composer onSend={sendMessage} />
      </main>
    </AppShell>
  );
}
