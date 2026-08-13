import { markMock, markValue } from "./mock-marker";

export type RegistryItem = {
  id: string;
  name: string;
  region: string;
  industry: string;
  tone: "red" | "yellow" | "blue" | "green" | "grey";
  zone: string;
  status: string;
  reason: string;
  invested: string;
  jobs: string;
  output: string;
  owner: string;
  updated: string;
};

const REGISTRY_RAW: RegistryItem[] = [
  {
    id: "r1",
    name: "Jizzax Textile Cluster MChJ",
    region: "Jizzax viloyati",
    industry: "Текстиль",
    tone: "red",
    zone: "Красная зона",
    status: "Решение в работе",
    reason: "Сбыт: нет постоянных покупателей",
    invested: "$96,4 млн",
    jobs: "310 из 620",
    output: "1,8 млрд сум",
    owner: "Минторг и торгпредства",
    updated: "Обновлено 12 августа",
  },
  {
    id: "r2",
    name: "Namangan Ceramic Group MChJ",
    region: "Namangan viloyati",
    industry: "Стройматериалы",
    tone: "red",
    zone: "Красная зона",
    status: "Не начато",
    reason: "Причина не заявлена",
    invested: "$74,9 млн",
    jobs: "120 из 410",
    output: "0,4 млрд сум",
    owner: "Хокимият области",
    updated: "Обновлено 11 августа",
  },
  {
    id: "r3",
    name: "Andijon Agro Food MChJ",
    region: "Andijon viloyati",
    industry: "Пищевая",
    tone: "yellow",
    zone: "Жёлтая зона",
    status: "Решение в работе",
    reason: "Финансы: просроченный кредит",
    invested: "$41,2 млн",
    jobs: "265 из 300",
    output: "12,6 млрд сум",
    owner: "Обслуживающий банк, Минфин",
    updated: "Обновлено 12 августа",
  },
  {
    id: "r4",
    name: "Toshkent Electro Systems MChJ",
    region: "Toshkent viloyati",
    industry: "Электротехника",
    tone: "blue",
    zone: "Синяя зона",
    status: "Запуск в этом году",
    reason: "Модернизация линии",
    invested: "$128,7 млн",
    jobs: "480 из 520",
    output: "64,1 млрд сум",
    owner: "Профильный отдел министерства",
    updated: "Обновлено 10 августа",
  },
  {
    id: "r5",
    name: "Xorazm Pharma MChJ",
    region: "Xorazm viloyati",
    industry: "Фармацевтика",
    tone: "green",
    zone: "Зелёная зона",
    status: "Работает штатно",
    reason: "Ограничений нет",
    invested: "$58,3 млн",
    jobs: "402 из 402",
    output: "88,5 млрд сум",
    owner: "Отраслевое управление МИИТ",
    updated: "Обновлено 12 августа",
  },
  {
    id: "r6",
    name: "Navoiy Building Materials MChJ",
    region: "Navoiy viloyati",
    industry: "Стройматериалы",
    tone: "red",
    zone: "Красная зона",
    status: "Решение в работе",
    reason: "Сырьё: перебои поставок",
    invested: "$33,6 млн",
    jobs: "88 из 240",
    output: "2,2 млрд сум",
    owner: "Отраслевое объединение, хокимият",
    updated: "Обновлено 9 августа",
  },
  {
    id: "r7",
    name: "Farg'ona Knit Mills MChJ",
    region: "Farg'ona viloyati",
    industry: "Текстиль",
    tone: "yellow",
    zone: "Жёлтая зона",
    status: "Решение в работе",
    reason: "Отчётность не сдана",
    invested: "$27,4 млн",
    jobs: "196 из 350",
    output: "7,9 млрд сум",
    owner: "Профильный отдел министерства",
    updated: "Обновлено 8 августа",
  },
  {
    id: "r8",
    name: "Jizzax Cable Plant MChJ",
    region: "Jizzax viloyati",
    industry: "Электротехника",
    tone: "grey",
    zone: "Серая зона",
    status: "Данных недостаточно",
    reason: "Нет отчётных данных",
    invested: "$14,8 млн",
    jobs: "нет данных",
    output: "нет данных",
    owner: "Хокимият области",
    updated: "Обновлено 5 августа",
  },
  {
    id: "r9",
    name: "Namangan Dairy Union MChJ",
    region: "Namangan viloyati",
    industry: "Пищевая",
    tone: "green",
    zone: "Зелёная зона",
    status: "Работает штатно",
    reason: "Ограничений нет",
    invested: "$22,1 млн",
    jobs: "268 из 268",
    output: "41,3 млрд сум",
    owner: "Отраслевое управление МИИТ",
    updated: "Обновлено 12 августа",
  },
  {
    id: "r10",
    name: "Andijon Auto Components MChJ",
    region: "Andijon viloyati",
    industry: "Электротехника",
    tone: "blue",
    zone: "Синяя зона",
    status: "Запуск в этом году",
    reason: "Инвестор досогласовывает график",
    invested: "$102,5 млн",
    jobs: "150 из 600",
    output: "5,4 млрд сум",
    owner: "Агентство по привлечению инвестиций",
    updated: "Обновлено 11 августа",
  },
];

export const REGISTRY: RegistryItem[] = markMock(REGISTRY_RAW);

export const REGISTRY_NOTE = markValue(
  "Реестр предприятий по срезу июнь 2026 года · показаны 10 из 1 277 карточек",
);
