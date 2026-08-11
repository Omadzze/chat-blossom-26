import { useEffect, useState } from "react";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  reasoning?: string;
  turn?: number;
  pending?: boolean;
};

const CANNED: { text: string; reasoning: string }[] = [
  {
    text: "Привет! Я помощник платформы МИИТ. Помогаю с вопросами по внутренним данным министерства: проекты, предприятия, экспортёры, отрасли, региональные срезы. Также могу найти актуальную публичную информацию или проверить нормы законодательства по lex.uz.\n\nЧем могу помочь?",
    reasoning:
      "Запрос общий, без указания проекта или региона. Отвечаю кратким описанием возможностей и предлагаю уточнить задачу.",
  },
  {
    text: "По портфелю за текущий период: 128 активных проектов, из них 19 с отклонением по срокам более 30 дней и 7 с отклонением по бюджету более 10%.\n\nИсточник цифр: PMI (снимок за последнюю дату загрузки) и словарь метрик «Отклонение по срокам».",
    reasoning:
      "Считаю по словарю метрик: беру снимок PMI на последнюю дату, фильтрую статус «в работе», считаю отклонение план/факт по контрольным точкам.",
  },
  {
    text: "Проект 501 отстаёт на 47 дней. Основные причины по PMT: задержка поставки оборудования (28 дней) и переоформление разрешительных документов (19 дней).\n\nИсточник: PMT, журнал контрольных точек проекта 501.",
    reasoning:
      "Сопоставляю план и факт по контрольным точкам проекта 501, затем группирую причины задержек из журнала PMT.",
  },
];

export const HISTORY_ITEMS = [
  "Сводка по портфелю за август",
  "Проблемные проекты Ферганской области",
  "Проверка норм по lex.uz для экспортёров",
  "Почему проект 501 отстаёт",
  "Повторяющиеся проблемы региона: поставки",
  "Экспортёры текстильной отрасли",
  "Отклонения по бюджету свыше 10%",
  "Сравнение PMI и PMT по срокам",
  "Список предприятий с приостановкой работ",
  "Разбор контрольных точек проекта 214",
  "Региональный срез по инвестициям",
  "Динамика отгрузок за квартал",
  "Уточнение требований к проверке договоров",
  "Отрасли с ростом занятости",
];

let messages: ChatMessage[] = [];
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

export function getMessages() {
  return messages;
}

export function useChat() {
  const [, force] = useState(0);
  useEffect(() => {
    const l = () => force((n) => n + 1);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return messages;
}

export function resetChat() {
  messages = [];
  emit();
}

export function sendMessage(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return;
  const turn = messages.filter((m) => m.role === "user").length + 1;
  const pendingId = `a-${Date.now()}`;
  messages = [
    ...messages,
    { id: `u-${Date.now()}`, role: "user", text: trimmed, turn },
    { id: pendingId, role: "assistant", text: "", pending: true },
  ];
  emit();

  const reply = CANNED[(turn - 1) % CANNED.length]!;
  setTimeout(() => {
    messages = messages.map((m) =>
      m.id === pendingId
        ? { ...m, pending: false, text: reply.text, reasoning: reply.reasoning }
        : m,
    );
    emit();
  }, 900);
}
