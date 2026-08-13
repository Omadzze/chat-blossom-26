import { markMock, markValue } from "./mock-marker";

export type ProjectZone = {
  id: string;
  label: string;
  count: string;
  tone: "grey" | "red" | "yellow" | "blue" | "green";
};

const PROJECT_ZONES_RAW: ProjectZone[] = [
  { id: "all", label: "Все", count: "1 277", tone: "grey" },
  { id: "red", label: "Красные", count: "169", tone: "red" },
  { id: "yellow", label: "Жёлтые", count: "123", tone: "yellow" },
  { id: "blue", label: "Синие", count: "259", tone: "blue" },
  { id: "green", label: "Зелёные", count: "684", tone: "green" },
  { id: "grey", label: "Серые", count: "42", tone: "grey" },
];

export const REGION_OPTIONS = [
  "все",
  "Jizzax viloyati",
  "Namangan viloyati",
  "Andijon viloyati",
  "Toshkent viloyati",
  "Xorazm viloyati",
  "Navoiy viloyati",
  "Farg'ona viloyati",
];

export const INDUSTRY_OPTIONS = [
  "все",
  "Текстиль",
  "Стройматериалы",
  "Пищевая",
  "Электротехника",
  "Фармацевтика",
];

const SLICE_RAW = {
  title: "Неиспользуемые производственные мощности: 169 предприятий",
  subtitle: "Аналитический срез: июнь 2026 года · по выбранным фильтрам",
  collected: "Собрано 12 августа в 06:31",
  headline: {
    value: "169",
    of: "из 1 277",
    percent: 13,
    note: "13% предприятий среза, вложено $1 984,4 млн",
  },
  tiles: [
    { label: "Выпуск за период", value: "19,2", of: "из 979,9 млрд сум", percent: 2, note: "2% прошлогоднего выпуска" },
    { label: "Занятость", value: "2 527", of: "из 4 102", percent: 62, note: "62% мест по прошлой отчётности" },
    { label: "Причина не указана", value: "36", of: "из 169", percent: 21, note: "21% группы, причина не указана" },
  ],
  conclusion:
    "Выпуск красной группы за полугодие составил 19,2 млрд сум при 979,9 млрд сум годового факта 2025 года; рабочие места сократились с 4 102 до 2 527. Главный блокер — сбыт: 51 предприятие с портфелем 380,1 млн долларов не имеет постоянных покупателей; вторая по масштабу — незаявленная причина у 36 предприятий с портфелем 371,6 млн долларов. Министерству требуется срочно организовать каналы сбыта для первой группы и принудительно классифицировать проблемы второй.",
  status: "решение в работе у 118, закрыто у 15, не начато у 36",
};

export type Reason = {
  name: string;
  count: string;
  percent: number;
  invested: string;
  owner: string;
};

const REASONS_RAW: Reason[] = [
  { name: "Сбыт", count: "51 из 169", percent: 30, invested: "$380,1 млн", owner: "Минторг и торгпредства" },
  { name: "Причина не заявлена", count: "36 из 169", percent: 21, invested: "$371,6 млн", owner: "Хокимият области, отраслевое управление МИИТ" },
  { name: "Инвестор", count: "20 из 169", percent: 12, invested: "$578,8 млн", owner: "Агентство по привлечению инвестиций" },
  { name: "Отчётность", count: "17 из 169", percent: 10, invested: "$269,7 млн", owner: "Профильный отдел министерства" },
  { name: "Финансы", count: "16 из 169", percent: 9.5, invested: "$172,4 млн", owner: "Обслуживающий банк, Минфин" },
  { name: "Сырьё", count: "11 из 169", percent: 6.5, invested: "$59,4 млн", owner: "Отраслевое объединение, хокимият" },
  { name: "Разрешения и сертификаты", count: "6 из 169", percent: 3.6, invested: "$22 млн", owner: "Хокимият области, профильные инспекции" },
  { name: "Модернизация", count: "5 из 169", percent: 3, invested: "$14,1 млн", owner: "Профильный отдел министерства" },
  { name: "Льготы", count: "4 из 169", percent: 2.6, invested: "$37,2 млн", owner: "Минфин, налоговый комитет" },
  { name: "Кадры", count: "2 из 169", percent: 1.2, invested: "$12,8 млн", owner: "Агентство по занятости" },
  { name: "Логистика", count: "1 из 169", percent: 0.6, invested: "$8,9 млн", owner: "Узбекистон темир йуллари" },
  { name: "Электроснабжение", count: "1 из 169", percent: 0.6, invested: "$34,5 млн", owner: "Региональные электросети" },
];

export type Measure = {
  title: string;
  text: string;
  owner: string;
  coverage: string;
  amount: string;
};

const MEASURES_RAW: Measure[] = [
  {
    title: "Собрать заказы: якорные покупатели, госзакупки, экспортные каналы",
    text: "Сформировать реестр нереализованной продукции 51 предприятия и провести матчинг с якорными покупателями через торгпредства; прийти с портфелем заказов на ближайший квартал.",
    owner: "Минторг и торгпредства",
    coverage: "51 предприятие, 30% группы",
    amount: "$380,1 млн",
  },
  {
    title: "Запросить у хокимиятов причину остановки и внести её в ПМТ",
    text: "Направить поручение хокимиятам по 36 предприятиям с требованием классифицировать причину остановки в двухнедельный срок; прийти с заполненными карточками проблем в ПМТ.",
    owner: "Хокимият области, отраслевое управление МИИТ",
    coverage: "36 предприятий, 21% группы",
    amount: "$371,6 млн",
  },
  {
    title: "Вернуть инвестора к обязательствам либо запустить замену проекта",
    text: "По 20 предприятиям провести сверку судебных статусов с Агентством по привлечению инвестиций; прийти с решением по каждому проекту — возврат к обязательствам или замена.",
    owner: "Агентство по привлечению инвестиций",
    coverage: "20 предприятий, 12% группы",
    amount: "$578,8 млн",
  },
  {
    title: "Истребовать отчётность и сверить фактический выпуск с данными ПМТ",
    text: "Запросить у 17 предприятий отчётность за первое полугодие 2026 года и сверить фактический выпуск с данными ПМТ; прийти с актуализированными показателями.",
    owner: "Профильный отдел министерства",
    coverage: "17 предприятий, 10% группы",
    amount: "$269,7 млн",
  },
  {
    title: "Реструктурировать задолженность с обслуживающим банком",
    text: "Совместно с Минфином и обслуживающими банками провести оценку кредитного портфеля 16 предприятий; прийти с согласованными графиками реструктуризации.",
    owner: "Обслуживающий банк, Минфин",
    coverage: "16 предприятий, 9,5% группы",
    amount: "$172,4 млн",
  },
  {
    title: "Закрыть сырьевые блокеры: графики поставок и кооперация с переработкой",
    text: "Через отраслевые объединения составить графики поставок сырья для 11 предприятий; прийти с обеспеченными сырьём производственными планами.",
    owner: "Отраслевое объединение, хокимият",
    coverage: "11 предприятий, 6,5% группы",
    amount: "$59,4 млн",
  },
];

const BACKGROUND_RAW = {
  note: "Годовой рост по данным Всемирного банка · 2025 год",
  items: [
    { value: "+7,7%", label: "Обрабатывающая промышленность", prev: "2024: +6,9%" },
    { value: "+8,4%", label: "Промышленность и строительство", prev: "2024: +7,3%" },
    { value: "+7,7%", label: "ВВП", prev: "2024: +6,7%" },
  ],
};

export type MarketNote = {
  industry: string;
  headline: string;
  detail: string;
  sources: string[];
};

const MARKET_RAW: MarketNote[] = [
  {
    industry: "Текстиль",
    headline:
      "Хлопковые цены снизились более чем на 10% в 2025 году и на 4% в I квартале 2026 года; прогноз падения около 3% в 2026 году.",
    detail:
      "Предприятия среза с причиной «Сбыт» в текстильной отрасли не компенсируют снижением цен на сырьё недостаток спроса на готовую продукцию.",
    sources: ["worldbank.org", "ers.usda.gov", "fas.usda.gov"],
  },
  {
    industry: "Стройматериалы",
    headline:
      "Мировая строительная активность снизится на 4,5% в 2025 году, затем вырастет на 3,8% в 2026 году.",
    detail:
      "Производители стройматериалов работают в условиях неоднородного спроса: внутреннего спроса недостаточно для загрузки мощностей.",
    sources: ["oxfordeconomics.com", "iea.org", "uzsm.uz"],
  },
];

export type Investment = { name: string; region: string; value: string; percent: number };

const INVESTMENTS_RAW: Investment[] = [
  { name: "DIABAZ MINERAL WOOL", region: "Jizzax viloyati", value: "$164,8 млн", percent: 100 },
  { name: "BASALT THERMO", region: "Jizzax viloyati", value: "$127,7 млн", percent: 77 },
  { name: "RASH-MILK PLUS", region: "Andijon viloyati", value: "$110 млн", percent: 67 },
  { name: "GLOBAL FOOD IMPEX", region: "Xorazm viloyati", value: "$80,4 млн", percent: 49 },
  { name: "GOLDFIBER PRO", region: "Jizzax viloyati", value: "$72,7 млн", percent: 44 },
  { name: "DIABAZ KOMPOZIT", region: "Jizzax viloyati", value: "$66 млн", percent: 40 },
  { name: "EURO GLOBAL INVEST", region: "Toshkent viloyati", value: "$56,8 млн", percent: 34 },
  { name: "JIZZAX KENTEKS", region: "Jizzax viloyati", value: "$54,7 млн", percent: 33 },
  { name: "TEXTILE FINANCE NAMANGAN", region: "Namangan viloyati", value: "$45 млн", percent: 27 },
  { name: "FACTORY CEMENT", region: "Namangan viloyati", value: "$43,7 млн", percent: 26 },
  { name: "GAZGAN MARBLE GROUP", region: "Navoiy viloyati", value: "$37,7 млн", percent: 23 },
  { name: "FERGANA CERAMICS", region: "Farg'ona viloyati", value: "$34,7 млн", percent: 21 },
];

const INVESTMENTS_NOTE_RAW = "12 предприятий с наибольшими вложениями, $894,2 млн из $1 984,4 млн по срезу";

export const PROJECT_ZONES: ProjectZone[] = PROJECT_ZONES_RAW.map((z) => ({
  ...z,
  count: markValue(z.count),
}));
export const SLICE = markMock(SLICE_RAW);
export const REASONS: Reason[] = markMock(REASONS_RAW);
export const MEASURES: Measure[] = markMock(MEASURES_RAW);
export const BACKGROUND = markMock(BACKGROUND_RAW);
export const MARKET: MarketNote[] = markMock(MARKET_RAW);
export const INVESTMENTS: Investment[] = markMock(INVESTMENTS_RAW).map((it) => ({
  ...it,
  name: markValue(it.name),
}));
export const INVESTMENTS_NOTE = markValue(INVESTMENTS_NOTE_RAW);
