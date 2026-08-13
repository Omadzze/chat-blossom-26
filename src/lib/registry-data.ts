import { markMock, markValue } from "./mock-marker";

export type RegistryParam = { label: string; value: string; note: string };

export type RegistryItem = {
  id: string;
  name: string;
  form: string;
  stir: string;
  region: string;
  district: string;
  industry: string;
  capital: string;
  tone: "red" | "yellow" | "blue" | "green" | "grey";
  type: "Сырьё" | "Финансы" | "Инвестор" | "Сбыт" | "Отчётность";
  problem: string;
  load: string;
  decision: string;
  params: RegistryParam[];
  internal: string;
  external: string;
  measures: { horizon: string; term: string; text: string }[];
  responsibility: string;
  risk: string;
};

export const REGISTRY_TABS = [
  { id: "post", label: "Предприятия постмониторинга" },
  { id: "invest", label: "Инвестпроекты" },
  { id: "projects", label: "Проекты постмониторинга" },
];

export const REGISTRY_STATES = [
  { id: "idle", label: "Простой" },
  { id: "problem", label: "С проблемой" },
  { id: "stopped", label: "Простаивают" },
  { id: "all", label: "Все" },
];

export const REGISTRY_REGIONS = [
  "все",
  "Навоийская область",
  "Сырдарьинская область",
  "Республика Каракалпакстан",
  "Самаркандская область",
  "Андижанская область",
  "Ташкентская область",
  "Джизакская область",
  "Наманганская область",
];

export const REGISTRY_INDUSTRIES = [
  "все",
  "Промышленность стройматериалов",
  "Текстильная и швейная промышленность",
  "Шелковая промышленность",
  "Кожевенно-обувная промышленность",
];

const params = (
  capacity: string,
  load: string,
  output: string,
  plan: string,
  rating: string,
  ratingWas: string,
  finance: string,
  jobs: string,
  jobsPlan: string,
  exportFact: string,
  exportPlan: string,
): RegistryParam[] => [
  { label: "Мощности", value: capacity, note: `загрузка ${load}` },
  { label: "Производство", value: output, note: `план ${plan}` },
  { label: "Рейтинг", value: rating, note: `было ${ratingWas}` },
  { label: "Финансирование", value: finance, note: "освоение средств" },
  { label: "Занятость", value: jobs, note: `план ${jobsPlan}` },
  { label: "Экспорт", value: exportFact, note: `план ${exportPlan}` },
];

const REGISTRY_RAW: RegistryItem[] = [
  {
    id: "navoiyquartz",
    name: "NAVOIYQUARTZ",
    form: "ООО",
    stir: "307166223",
    region: "Навоийская область",
    district: "Uchquduq tumani",
    industry: "Промышленность стройматериалов",
    capital: "3,2 млрд сум",
    tone: "red",
    type: "Сырьё",
    problem:
      "Ishlab chiqarishni kengaytirish uchun tabiiy kvars toshlari qazib olish zaxira yer maydoni sotib olish.",
    load: "0%",
    decision: "в работе",
    params: params(
      "0,5 тыс. т",
      "0%",
      "0 тыс. т",
      "4,4",
      "#1181",
      "#909",
      "план 0 · факт 0 млрд сум",
      "2 чел.",
      "2",
      "0 млн $",
      "0,2",
    ),
    internal:
      "Выпуск не выполнен вовсе, экспорт тоже ниже плана, при этом занятость выполнена. Это говорит о срыве запуска или нехватке сырья, что подтверждается проблемой по приобретению земель для добычи кварца; решение просрочено и вопрос не закрыт.",
    external:
      "По отрасли в Узбекистане сохраняется рост: по данным Всемирного банка, «Industry (including construction), value added (annual % growth)» было 7,3% в 2024 году и 8,4% в 2025 году. То есть внешний фон не объясняет нулевой выпуск предприятия, причина лежит внутри проекта и в сырьевом ограничении.",
    measures: [
      {
        horizon: "Немедленно",
        term: "неделя",
        text: "Хокимияту Навоийской области: зафиксировать отдельный контроль по сырью и затребовать от инвестора график закрытия вопроса по участку под добычу кварца.",
      },
      {
        horizon: "Краткосрочно",
        term: "месяц",
        text: "Поручить профильному управлению и кадастру оформить пакет по земле и недропользованию, с датой подачи на согласование и ответственными лицами.",
      },
      {
        horizon: "Стратегически",
        term: "квартал",
        text: "Провести выездную проверку запуска, сверить поставки сырья, готовность оборудования и принять решение по вводу предприятия в устойчивую работу.",
      },
    ],
    responsibility: "Навоийская область hokimlik + MIIT",
    risk: "Критический",
  },
  {
    id: "gulistan-gold-yarn",
    name: "GULISTAN GOLD YARN",
    form: "ООО",
    stir: "306411907",
    region: "Сырдарьинская область",
    district: "Guliston tumani",
    industry: "Текстильная и швейная промышленность",
    capital: "8,7 млрд сум",
    tone: "red",
    type: "Финансы",
    problem:
      "Korxonada yuzaga kelgan moliyaviy qiyinchiliklar sababli, bankdan jalb etilgan kredit mablag'larini o'z vaqtida qaytarishda muammo.",
    load: "0%",
    decision: "в работе",
    params: params(
      "1,2 тыс. т",
      "0%",
      "0 тыс. т",
      "2,1",
      "#1094",
      "#712",
      "план 12 · факт 9,4 млрд сум",
      "14 чел.",
      "60",
      "0 млн $",
      "1,4",
    ),
    internal:
      "Выпуск остановлен при частично освоенном кредите: обслуживание долга съедает оборотные средства, предприятие не выходит на плановую загрузку.",
    external:
      "Внешний фон по текстилю положительный: экспорт отрасли растёт, спрос сохраняется, значит ограничение носит финансовый, а не рыночный характер.",
    measures: [
      {
        horizon: "Немедленно",
        term: "неделя",
        text: "Обслуживающему банку: вынести вопрос на кредитный комитет и подготовить график реструктуризации задолженности.",
      },
      {
        horizon: "Краткосрочно",
        term: "месяц",
        text: "Согласовать с Минфином и банком условия отсрочки, зафиксировать обязательства инвестора по пополнению оборотных средств.",
      },
      {
        horizon: "Стратегически",
        term: "квартал",
        text: "Вывести предприятие на загрузку не ниже 40% и закрепить постоянных покупателей пряжи по договорам.",
      },
    ],
    responsibility: "Сырдарьинская область hokimlik + банк",
    risk: "Высокий",
  },
  {
    id: "muynak-ldsp",
    name: "MUYNAK LDSP",
    form: "ООО",
    stir: "305882140",
    region: "Республика Каракалпакстан",
    district: "Mo'ynoq tumani",
    industry: "Промышленность стройматериалов",
    capital: "21,5 млрд сум",
    tone: "red",
    type: "Инвестор",
    problem:
      "Korxonaning moliyaviy holati yomonlashib, bankdan olingan 10 mlrd so'm hamda 5,4 mln dollari miqdoridagi majburiyat.",
    load: "0%",
    decision: "в работе",
    params: params(
      "35 тыс. м³",
      "0%",
      "0 тыс. м³",
      "18,0",
      "#1203",
      "#845",
      "план 54 · факт 38 млрд сум",
      "6 чел.",
      "120",
      "0 млн $",
      "3,1",
    ),
    internal:
      "Инвестор не завершает финансирование: оборудование смонтировано частично, выпуска нет, обязательства перед банком растут.",
    external:
      "Рынок ЛДСП в регионе устойчив, дефицит покрывается импортом — при запуске сбыт обеспечен.",
    measures: [
      {
        horizon: "Немедленно",
        term: "неделя",
        text: "Затребовать от инвестора подтверждение источника финансирования и срок завершения монтажа.",
      },
      {
        horizon: "Краткосрочно",
        term: "месяц",
        text: "Рассмотреть вопрос смены инвестора или привлечения соинвестора совместно с агентством по инвестициям.",
      },
      {
        horizon: "Стратегически",
        term: "квартал",
        text: "Принять решение о судьбе проекта: пусконаладка либо передача площадки новому инвестору.",
      },
    ],
    responsibility: "Каракалпакстан hokimlik + MIIT",
    risk: "Критический",
  },
  {
    id: "ziyovuddin-silk",
    name: "ZIYOVUDDIN SILK",
    form: "ООО",
    stir: "306120844",
    region: "Самаркандская область",
    district: "Nurobod tumani",
    industry: "Шелковая промышленность",
    capital: "5,4 млрд сум",
    tone: "yellow",
    type: "Сбыт",
    problem:
      "Korxona tomonidan ishlab chiqarilayotgan mahsulotga talabning kamayganligi sababli ishlab chiqarish hajmi qisqardi.",
    load: "18%",
    decision: "в работе",
    params: params(
      "260 т",
      "18%",
      "47 т",
      "260",
      "#874",
      "#640",
      "план 6 · факт 6 млрд сум",
      "38 чел.",
      "70",
      "0,2 млн $",
      "1,1",
    ),
    internal:
      "Производство работает эпизодически: отсутствуют постоянные контракты на шелковую нить, склад заполнен готовой продукцией.",
    external:
      "Мировые цены на шелк снизились, спрос ключевых покупателей сократился — внешний фон частично объясняет падение.",
    measures: [
      {
        horizon: "Немедленно",
        term: "неделя",
        text: "Минторгу и торгпредствам: подобрать 3 потенциальных покупателя и организовать переговоры.",
      },
      {
        horizon: "Краткосрочно",
        term: "месяц",
        text: "Заключить контракты минимум на 50% мощности, включая кооперацию с местными швейными кластерами.",
      },
      {
        horizon: "Стратегически",
        term: "квартал",
        text: "Перейти на выпуск продукции более высокой переработки для устойчивого сбыта.",
      },
    ],
    responsibility: "Самаркандская область hokimlik + Минторг",
    risk: "Средний",
  },
  {
    id: "andijan-silk-co",
    name: "ANDIJAN SILK CO",
    form: "ООО",
    stir: "307004512",
    region: "Андижанская область",
    district: "Asaka tumani",
    industry: "Шелковая промышленность",
    capital: "4,1 млрд сум",
    tone: "yellow",
    type: "Сбыт",
    problem:
      "Korxonada ishlab chiqarilgan mahsulotga xaridorlar kamligi tufayli, korxona past quvvatda faoliyat yuritgan.",
    load: "12%",
    decision: "в работе",
    params: params(
      "180 т",
      "12%",
      "22 т",
      "180",
      "#958",
      "#803",
      "план 4 · факт 4 млрд сум",
      "26 чел.",
      "55",
      "0,1 млн $",
      "0,9",
    ),
    internal:
      "Загрузка держится на разовых заказах, отдел сбыта фактически не работает, себестоимость выше рыночной цены.",
    external:
      "Спрос на шелковую нить в регионе стабилен, но покупатели предпочитают поставщиков с сертификацией.",
    measures: [
      {
        horizon: "Немедленно",
        term: "неделя",
        text: "Составить перечень покупателей и закрепить ответственного за сбыт на предприятии.",
      },
      {
        horizon: "Краткосрочно",
        term: "месяц",
        text: "Пройти сертификацию продукции и выйти на кооперацию с текстильным кластером области.",
      },
      {
        horizon: "Стратегически",
        term: "квартал",
        text: "Выйти на загрузку 45% и закрепить долгосрочные договоры поставки.",
      },
    ],
    responsibility: "Андижанская область hokimlik + Минторг",
    risk: "Средний",
  },
  {
    id: "farxod-shifer",
    name: "FARXOD SHIFER",
    form: "ООО",
    stir: "305773101",
    region: "Самаркандская область",
    district: "Jomboy tumani",
    industry: "Промышленность стройматериалов",
    capital: "6,8 млрд сум",
    tone: "yellow",
    type: "Отчётность",
    problem:
      "Korxona ko'mir yoqilg'isiga moslashtirilgan bo'lib, ishlab chiqarilgan mahsulotlar tannarxi yuqoriligi sababli 2025-yilda to'xtagan.",
    load: "0%",
    decision: "в работе",
    params: params(
      "12 млн шт",
      "0%",
      "0 млн шт",
      "12",
      "#1112",
      "#977",
      "план 8 · факт 8 млрд сум",
      "9 чел.",
      "48",
      "0 млн $",
      "0",
    ),
    internal:
      "Себестоимость выросла из-за угольного топлива, отчётность за период не сдана — данные по выпуску не подтверждены.",
    external:
      "Цены на стройматериалы растут медленнее затрат на топливо, что делает текущую технологию убыточной.",
    measures: [
      {
        horizon: "Немедленно",
        term: "неделя",
        text: "Обеспечить сдачу отчётности и сверку фактических показателей выпуска.",
      },
      {
        horizon: "Краткосрочно",
        term: "месяц",
        text: "Проработать перевод линии на газ или альтернативное топливо с расчётом окупаемости.",
      },
      {
        horizon: "Стратегически",
        term: "квартал",
        text: "Принять решение о модернизации либо перепрофилировании производства.",
      },
    ],
    responsibility: "Самаркандская область hokimlik + MIIT",
    risk: "Средний",
  },
  {
    id: "nova-infinity-pro",
    name: "NOVA INFINITY PRO",
    form: "ООО",
    stir: "307221845",
    region: "Ташкентская область",
    district: "Qibray tumani",
    industry: "Кожевенно-обувная промышленность",
    capital: "9,3 млрд сум",
    tone: "red",
    type: "Сырьё",
    problem: "Korxonada mahsulot ishlab chiqarish uchun zarur xom ashyo zaxirasini yaratish.",
    load: "0%",
    decision: "в работе",
    params: params(
      "400 тыс. пар",
      "0%",
      "0 тыс. пар",
      "400",
      "#1157",
      "#1002",
      "план 11 · факт 7 млрд сум",
      "12 чел.",
      "150",
      "0 млн $",
      "2,4",
    ),
    internal:
      "Нет сформированного запаса сырья: поставки кожи нерегулярны, линия простаивает после пусконаладки.",
    external:
      "Цены на сырьё на внешнем рынке выросли, локальные поставщики загружены экспортными заказами.",
    measures: [
      {
        horizon: "Немедленно",
        term: "неделя",
        text: "Заключить контракты на поставку сырья минимум на 3 месяца работы.",
      },
      {
        horizon: "Краткосрочно",
        term: "месяц",
        text: "Проработать льготное финансирование оборотных средств под закупку сырья.",
      },
      {
        horizon: "Стратегически",
        term: "квартал",
        text: "Организовать кооперацию с местными кожевенными заводами по долгосрочным поставкам.",
      },
    ],
    responsibility: "Ташкентская область hokimlik + MIIT",
    risk: "Высокий",
  },
  {
    id: "goldfiber-pro",
    name: "GOLDFIBER PRO",
    form: "ООО",
    stir: "306901233",
    region: "Джизакская область",
    district: "Zomin tumani",
    industry: "Промышленность стройматериалов",
    capital: "14,2 млрд сум",
    tone: "yellow",
    type: "Сбыт",
    problem:
      "Korxonada bazalt tolasidan ishlab chiqarilgan mahsulotlarga xaridor kamligi tufayli, past quvvatda faoliyat yuritmoqda.",
    load: "9%",
    decision: "в работе",
    params: params(
      "6 тыс. т",
      "9%",
      "0,5 тыс. т",
      "6",
      "#1046",
      "#921",
      "план 17 · факт 15 млрд сум",
      "31 чел.",
      "95",
      "0,1 млн $",
      "2,0",
    ),
    internal:
      "Продукция новая для рынка, отсутствует техническое признание у проектных организаций, поэтому спрос низкий.",
    external:
      "Строительный рынок растёт, но базальтовые материалы пока слабо включены в проектные нормы.",
    measures: [
      {
        horizon: "Немедленно",
        term: "неделя",
        text: "Организовать презентацию продукции для крупных подрядчиков и госзаказчиков.",
      },
      {
        horizon: "Краткосрочно",
        term: "месяц",
        text: "Включить материалы в проектные каталоги и получить необходимые сертификаты.",
      },
      {
        horizon: "Стратегически",
        term: "квартал",
        text: "Обеспечить участие в инфраструктурных проектах и выход на экспорт.",
      },
    ],
    responsibility: "Джизакская область hokimlik + Минстрой",
    risk: "Средний",
  },
  {
    id: "jinjuz-silk-co",
    name: "JINJUZ SILK CO",
    form: "ООО",
    stir: "307410562",
    region: "Ташкентская область",
    district: "Bo'ka tumani",
    industry: "Шелковая промышленность",
    capital: "3,9 млрд сум",
    tone: "red",
    type: "Сырьё",
    problem:
      "Korxona 2025 yilda ishga tushirilgan bo'lib, xomashyo mahsulotlarini yetishmasligi sababli, past quvvatda faoliyat yuritgan.",
    load: "4%",
    decision: "в работе",
    params: params(
      "120 т",
      "4%",
      "5 т",
      "120",
      "#1188",
      "#1051",
      "план 5 · факт 4 млрд сум",
      "8 чел.",
      "40",
      "0 млн $",
      "0,6",
    ),
    internal:
      "Предприятие запущено в 2025 году, кокон закупается разово, устойчивой сырьевой базы нет.",
    external:
      "Сезонность заготовки кокона и конкуренция за сырьё ограничивают загрузку новых производств.",
    measures: [
      {
        horizon: "Немедленно",
        term: "неделя",
        text: "Закрепить за предприятием объёмы кокона у областного объединения шелководства.",
      },
      {
        horizon: "Краткосрочно",
        term: "месяц",
        text: "Заключить сезонные договоры на сырьё с фермерскими хозяйствами.",
      },
      {
        horizon: "Стратегически",
        term: "квартал",
        text: "Создать собственную сырьевую базу и склад межсезонного хранения.",
      },
    ],
    responsibility: "Ташкентская область hokimlik + Uzbekipaksanoat",
    risk: "Высокий",
  },
  {
    id: "chodak-uniform",
    name: "CHODAK UNIFORM",
    form: "ООО",
    stir: "306550918",
    region: "Наманганская область",
    district: "Pop tumani",
    industry: "Текстильная и швейная промышленность",
    capital: "7,1 млрд сум",
    tone: "yellow",
    type: "Сбыт",
    problem:
      "Korxona tomonidan ishlab chiqarilgan mahsulotga talab kamayganligi natijada past quvvatda faoliyat yuritgan.",
    load: "22%",
    decision: "в работе",
    params: params(
      "900 тыс. шт",
      "22%",
      "198 тыс. шт",
      "900",
      "#812",
      "#744",
      "план 9 · факт 9 млрд сум",
      "84 чел.",
      "180",
      "0,3 млн $",
      "1,8",
    ),
    internal:
      "Заказы на форменную одежду носят разовый характер, участие в тендерах не системное.",
    external:
      "Спрос на спецодежду в стране растёт, значительная часть закрывается импортом.",
    measures: [
      {
        horizon: "Немедленно",
        term: "неделя",
        text: "Подать заявки на действующие тендеры по спецодежде для бюджетных организаций.",
      },
      {
        horizon: "Краткосрочно",
        term: "месяц",
        text: "Заключить рамочные контракты с 2-3 крупными заказчиками.",
      },
      {
        horizon: "Стратегически",
        term: "квартал",
        text: "Выйти на загрузку 60% и начать экспорт в соседние страны.",
      },
    ],
    responsibility: "Наманганская область hokimlik + Минторг",
    risk: "Умеренный",
  },
  {
    id: "geobasalt-products",
    name: "GEOBASALT PRODUCTS",
    form: "ООО",
    stir: "307019773",
    region: "Джизакская область",
    district: "Sharof Rashidov tumani",
    industry: "Промышленность стройматериалов",
    capital: "16,4 млрд сум",
    tone: "yellow",
    type: "Сбыт",
    problem:
      "Korxonada ishlab chiqarilgan bazalt tolasidan geosetka, kompozit quvurlar va kompozit profil mahsulotlariga talab past.",
    load: "15%",
    decision: "в работе",
    params: params(
      "4,5 тыс. т",
      "15%",
      "0,7 тыс. т",
      "4,5",
      "#994",
      "#870",
      "план 19 · факт 16 млрд сум",
      "42 чел.",
      "110",
      "0,2 млн $",
      "2,6",
    ),
    internal:
      "Композитная продукция требует технического продвижения, отдел сбыта не покрывает проектный рынок.",
    external:
      "Инфраструктурное строительство расширяется, потенциал спроса на геосетку высокий.",
    measures: [
      {
        horizon: "Немедленно",
        term: "неделя",
        text: "Провести переговоры с дорожными и водохозяйственными заказчиками.",
      },
      {
        horizon: "Краткосрочно",
        term: "месяц",
        text: "Включить продукцию в сметные нормативы и типовые проекты.",
      },
      {
        horizon: "Стратегически",
        term: "квартал",
        text: "Обеспечить загрузку 50% за счёт инфраструктурных программ.",
      },
    ],
    responsibility: "Джизакская область hokimlik + Минтранс",
    risk: "Средний",
  },
  {
    id: "global-spinners",
    name: "GLOBAL SPINNERS",
    form: "ООО",
    stir: "306338201",
    region: "Навоийская область",
    district: "Karmana tumani",
    industry: "Текстильная и швейная промышленность",
    capital: "11,8 млрд сум",
    tone: "red",
    type: "Сбыт",
    problem:
      "Korxona tomonidan ishlab chiqilgan 50 tonna sochiq mahsuloti korxona omborxonasida sotilmasdan turgan.",
    load: "6%",
    decision: "в работе",
    params: params(
      "2,4 тыс. т",
      "6%",
      "0,15 тыс. т",
      "2,4",
      "#1132",
      "#948",
      "план 13 · факт 12 млрд сум",
      "35 чел.",
      "160",
      "0 млн $",
      "2,2",
    ),
    internal:
      "На складе накоплено 50 т готовой продукции без покупателя, оборотные средства заморожены.",
    external:
      "Экспортные цены на махровые изделия снизились, конкуренция со стороны крупных кластеров усилилась.",
    measures: [
      {
        horizon: "Немедленно",
        term: "неделя",
        text: "Организовать реализацию складских остатков через торговые сети и госзакупки.",
      },
      {
        horizon: "Краткосрочно",
        term: "месяц",
        text: "Через торгпредства найти экспортных покупателей и подписать пробные контракты.",
      },
      {
        horizon: "Стратегически",
        term: "квартал",
        text: "Перейти на работу по предзаказу и обеспечить загрузку не ниже 40%.",
      },
    ],
    responsibility: "Навоийская область hokimlik + Минторг",
    risk: "Высокий",
  },
];

export const REGISTRY: RegistryItem[] = markMock(REGISTRY_RAW);

export const REGISTRY_NOTE = markValue("20 из 169 · порядок по весу признаков");

export function getRegistryItem(id: string) {
  return REGISTRY.find((it) => it.id === id);
}
