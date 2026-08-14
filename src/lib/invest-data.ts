import { markMock, markValue } from "./mock-marker";

export type InvestParam = { label: string; value: string; accent?: "green" | "red" };

export type InvestItem = {
  id: string;
  name: string;
  owner: string;
  region: string;
  district: string;
  executor: string;
  industry: string;
  cost: string;
  /** освоено, млн USD — пусто, если в источнике нет данных */
  done?: string;
  /** доля освоения — пусто, если в источнике нет данных */
  share?: string;
  /** срок реализации — пусто, если в источнике нет данных */
  term?: string;
  headline: string;
  params: InvestParam[];
  missing?: string;
  internal: string;
  external: string;
  measures: { horizon: string; term: string; text: string; owner: string }[];
  updated: string;
};

export const INVEST_STATES = [
  { id: "all", label: "Все" },
  { id: "low", label: "Освоение ниже 30%" },
  { id: "none", label: "Без освоения" },
  { id: "error", label: "Ошибка в данных" },
];

export const INVEST_REGIONS = [
  "все",
  "Джизакская область",
  "Бухарская область",
  "Хорезмская область",
  "Ташкентская область",
];

export const INVEST_INDUSTRIES = [
  "все",
  "Energetika sohasi",
  "Kimyo sanoati",
  "Turizm sohasi",
  "Tog'-kon va metallurgiya sanoati",
];

const RAW: InvestItem[] = [
  {
    id: "jizzax-elektr",
    name: "Jizzax viloyatida integratsiyalashgan elektr stansiyalarini qurish",
    owner: "GK Rosatom",
    region: "Джизакская область",
    district: "Forish tumani",
    executor: '"O\'zatom" agentligi',
    industry: "Energetika sohasi",
    cost: "9 500",
    term: "2025 → 2035",
    headline: "план 2026 есть, факт освоения нулевой",
    params: [
      { label: "Освоение", value: "не заведён из 9 500,0 млн $", accent: "red" },
      { label: "План освоения", value: "500,0 млн $ на 2026 год", accent: "green" },
    ],
    missing: "факт освоения, экспорт, связанное предприятие ПМТ",
    internal:
      "По PMI проект ГК Rosatom в Джизакской области рассчитан на 2025–2035 годы, полная стоимость составляет 9 500,0 млн $, план освоения на 2026 год составляет 500,0 млн $. Факт освоения и месяц факта не заведены. Связанное предприятие в ПМТ и экспорт по ИНН отсутствуют. Причину отклонения по имеющимся данным установить нельзя.",
    external:
      "По данным World Bank, приток прямых иностранных инвестиций в Узбекистан в 2025 году составил 4 398 423 257,8 USD (индикатор BX.KLT.DINV.CD.WD). Это общий показатель по стране, а не отраслевой фон по энергетике; он не объясняет отклонение проекта, тем более что факт освоения не заведён.",
    measures: [
      {
        horizon: "Немедленно",
        term: "неделя",
        text: "Проверить данные об освоении за 2026 год и внести накопительный факт с указанием месяца в PMI.",
        owner: '"O\'zatom" agentligi',
      },
      {
        horizon: "Краткосрочно",
        term: "месяц",
        text: "Сверить план 2026 года на 500,0 млн $ с первичными данными проекта и уточнить наличие связанного предприятия в ПМТ.",
        owner: '"O\'zatom" agentligi',
      },
      {
        horizon: "Стратегически",
        term: "квартал",
        text: "Организовать регулярное квартальное обновление освоения проекта, сроков реализации и данных по экспорту.",
        owner: "Jizzax viloyati",
      },
    ],
    updated: "разбор от 7 августа",
  },
  {
    id: "qandim-gaz",
    name: "Qandim guruhi konlarini gazni qayta ishlash zavodi qurilishi bilan o'zlashtirish, Xauzak va Shodi konlari",
    owner: "Lukoil Uzbekistan Operating Company",
    region: "Бухарская область",
    district: "Qorako'l tumani",
    executor: "Energetika vazirligi",
    industry: "Energetika sohasi",
    cost: "6 250",
    done: "194,8 по 7 мес.",
    share: "3,1%",
    term: "2004 → 2046",
    headline: "освоение за 7 месяцев ниже графика",
    params: [
      { label: "Освоение", value: "194,8 из 6 250,0 млн $", accent: "red" },
      { label: "Доля освоения", value: "3,1% по 7 мес." },
    ],
    internal:
      "Проект реализуется с 2004 года и рассчитан до 2046 года, накопленное освоение по 7 месяцам составляет 194,8 млн $ при полной стоимости 6 250,0 млн $. Текущий темп освоения не выводит проект на плановый график ввода мощностей по переработке газа.",
    external:
      "По данным World Bank, добывающий сектор Узбекистана сохраняет умеренный рост, поэтому внешний фон не объясняет низкий темп освоения — ограничение носит проектный характер.",
    measures: [
      {
        horizon: "Немедленно",
        term: "неделя",
        text: "Запросить у оператора детализацию освоения по 7 месяцам и причины отставания от годового плана.",
        owner: "Energetika vazirligi",
      },
      {
        horizon: "Краткосрочно",
        term: "месяц",
        text: "Согласовать скорректированный график освоения на 2026 год с контрольными точками по строительству завода.",
        owner: "Energetika vazirligi",
      },
      {
        horizon: "Стратегически",
        term: "квартал",
        text: "Вынести проект на квартальный мониторинг с оценкой рисков сроков ввода и обновлением данных по экспорту.",
        owner: "Buxoro viloyati",
      },
    ],
    updated: "разбор от 7 августа",
  },
  {
    id: "aviatsiya-dizel",
    name: "Ekologik toza aviatsiya hamda yashil dizel yoqilg'isini ishlab chiqarish",
    owner: "Allied Biofuels Holding",
    region: "Хорезмская область",
    district: "Tuproqqal'a tumani",
    executor: "Xorazm viloyati hokimligi",
    industry: "Kimyo sanoati",
    cost: "5 540",
    done: "2 по 7 мес.",
    share: "0%",
    headline: "освоение практически не началось",
    params: [
      { label: "Освоение", value: "2,0 из 5 540,0 млн $", accent: "red" },
      { label: "Доля освоения", value: "0% по 7 мес.", accent: "red" },
    ],
    missing: "срок реализации",
    internal:
      "Накопленное освоение по 7 месяцам составляет 2,0 млн $ при стоимости 5 540,0 млн $, срок реализации в источнике не заведён. Фактически проект остаётся на предпроектной стадии.",
    external:
      "Мировой спрос на экологичное авиатопливо растёт, поэтому рыночный фон благоприятный: ограничение внутреннее — отсутствие финансового закрытия и заведённых сроков.",
    measures: [
      {
        horizon: "Немедленно",
        term: "неделя",
        text: "Внести в PMI срок реализации проекта и подтвердить статус финансового закрытия.",
        owner: "Xorazm viloyati hokimligi",
      },
      {
        horizon: "Краткосрочно",
        term: "месяц",
        text: "Провести встречу с инвестором и зафиксировать график освоения на 2026 год.",
        owner: "Kimyo sanoati",
      },
      {
        horizon: "Стратегически",
        term: "квартал",
        text: "Оценить реалистичность проекта и при отсутствии движения вынести вопрос о пересмотре параметров.",
        owner: "Xorazm viloyati hokimligi",
      },
    ],
    updated: "разбор от 7 августа",
  },
  {
    id: "sea-breeze-chorvoq",
    name: '"Sea Breeze Uzbekistan" tomonidan Chorvoq suv ombori boyida yirik xalqaro turizm markazi barpo etish',
    owner: "Agalarov Development",
    region: "Ташкентская область",
    district: "Bo'stonliq tumani",
    executor: "Toshkent viloyati hokimligi",
    industry: "Turizm sohasi",
    cost: "5 000",
    done: "7,7 по 7 мес.",
    share: "0,2%",
    term: "2026 → 2027",
    headline: "сжатый срок при минимальном освоении",
    params: [
      { label: "Освоение", value: "7,7 из 5 000,0 млн $", accent: "red" },
      { label: "Доля освоения", value: "0,2% по 7 мес.", accent: "red" },
    ],
    internal:
      "Проект заявлен на 2026–2027 годы, но освоение по 7 месяцам составляет 7,7 млн $ из 5 000,0 млн $. При таком темпе заявленный срок ввода туристического центра недостижим.",
    external:
      "Туристический поток в Узбекистан растёт, спрос на курортную инфраструктуру подтверждён, значит причина отставания — в организации строительства и финансировании.",
    measures: [
      {
        horizon: "Немедленно",
        term: "неделя",
        text: "Запросить у инвестора подтверждённый график работ и источники финансирования первого этапа.",
        owner: "Toshkent viloyati hokimligi",
      },
      {
        horizon: "Краткосрочно",
        term: "месяц",
        text: "Уточнить срок реализации в PMI и синхронизировать его с фактическим ходом строительства.",
        owner: "Turizm sohasi",
      },
      {
        horizon: "Стратегически",
        term: "квартал",
        text: "Организовать квартальный контроль этапов и инфраструктурного обеспечения площадки.",
        owner: "Toshkent viloyati hokimligi",
      },
    ],
    updated: "разбор от 7 августа",
  },
  {
    id: "yoshlik-1",
    name: '"Yoshlik-I" konini o\'zlashtirish (1-bosqich, birinchi navbat)',
    owner: "VEB.RF",
    region: "Ташкентская область",
    district: "Olmaliq shahar",
    executor: '"Olmaliq KMK" AJ',
    industry: "Tog'-kon va metallurgiya sanoati",
    cost: "4 620",
    done: "112,7 по 7 мес.",
    share: "2,4%",
    term: "2017 → 2026",
    headline: "срок завершения 2026, освоение 2,4%",
    params: [
      { label: "Освоение", value: "112,7 из 4 620,0 млн $", accent: "red" },
      { label: "Доля освоения", value: "2,4% по 7 мес.", accent: "red" },
    ],
    internal:
      "Проект идёт с 2017 года с завершением в 2026 году, накопленное освоение по 7 месяцам — 112,7 млн $ из 4 620,0 млн $. Разрыв между сроком и освоением указывает на срыв графика первой очереди.",
    external:
      "Цены на медь на мировом рынке остаются высокими, внешний фон поддерживает проект, поэтому ограничение внутреннее — темп работ и финансирование.",
    measures: [
      {
        horizon: "Немедленно",
        term: "неделя",
        text: "Сверить накопленный факт освоения с отчётностью комбината и устранить расхождения в PMI.",
        owner: '"Olmaliq KMK" AJ',
      },
      {
        horizon: "Краткосрочно",
        term: "месяц",
        text: "Подготовить обновлённый график первой очереди с реалистичной датой ввода.",
        owner: '"Olmaliq KMK" AJ',
      },
      {
        horizon: "Стратегически",
        term: "квартал",
        text: "Вынести проект на отдельный контроль с ежеквартальной оценкой освоения и экспорта.",
        owner: "Toshkent viloyati hokimligi",
      },
    ],
    updated: "разбор от 7 августа",
  },
];

export const INVEST: InvestItem[] = markMock(RAW);

export const INVEST_NOTE = markValue(
  "20 из 2423 · порядок по стоимости · освоение считается от стоимости проекта",
);

export const INVEST_SUMMARY = markValue(
  "стоимость среза 208 474 млн USD · освоено 21 616 млн USD · без освоения 257 · с ошибкой в данных 323 · рабочих мест 44 492",
);

export function getInvestItem(id: string) {
  return INVEST.find((i) => i.id === id);
}
