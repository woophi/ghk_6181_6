import { AmountInput } from '@alfalab/core-components/amount-input';
import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { CalendarMobile } from '@alfalab/core-components/calendar/mobile';
import { Collapse } from '@alfalab/core-components/collapse';
import { Gap } from '@alfalab/core-components/gap';
import { Input } from '@alfalab/core-components/input';
import { List } from '@alfalab/core-components/list';
import { PureCell } from '@alfalab/core-components/pure-cell';
import { Radio } from '@alfalab/core-components/radio';
import { Status } from '@alfalab/core-components/status';
import { Steps } from '@alfalab/core-components/steps';
import { Switch } from '@alfalab/core-components/switch';

import { SelectMobile } from '@alfalab/core-components/select/mobile';
import { Tag } from '@alfalab/core-components/tag';
import { Typography } from '@alfalab/core-components/typography';
import { CalendarMIcon } from '@alfalab/icons-glyph/CalendarMIcon';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronLeftMIcon } from '@alfalab/icons-glyph/ChevronLeftMIcon';
import { ChevronUpMIcon } from '@alfalab/icons-glyph/ChevronUpMIcon';
import { InformationCircleMIcon } from '@alfalab/icons-glyph/InformationCircleMIcon';
import { UsersMIcon } from '@alfalab/icons-glyph/UsersMIcon';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import benefitsImg from './assets/benefits.png';
import oneImg from './assets/one.png';
import questionsImg from './assets/questions.png';
import threeImg from './assets/three.png';
import twoImg from './assets/two.png';
import { faqs, TICKER_TO_IMAGE, TICKER_TO_TITLE, useRobotsData } from './hooks/useData';
import { ImgStack } from './ImgStack';
import { LS, LSKeys } from './ls';
import { RiskStatus } from './RiskStatus';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { RobotItem } from './types';
import { sendDataToGA } from './utils/events';

const chips = [30_000, 40_000, 60_000];

type OptionKey = 'per_month' | 'per_week' | 'per_quarter' | 'per_annual';

const OPTIONS = [
  { key: 'per_month', content: 'Раз в месяц' },
  { key: 'per_week', content: 'Раз в неделю' },
  { key: 'per_quarter', content: 'Раз в квартал' },
  { key: 'per_annual', content: 'Раз в год' },
];

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [sum, setSum] = useState(10000);
  const [autoSum, setAutoSum] = useState(0);
  const [perItem, setPerItem] = useState<OptionKey>('per_month');
  const [selectedRobot, setSelectedRobot] = useState<RobotItem | null>(null);
  const [view, setView] = useState<'robot' | 'step1' | 'step2'>('robot');
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [collapsedItems, setCollapsedItem] = useState<string[]>([]);
  const [selectedTicker, setSelectedTicker] = useState('');
  const [checked, setChecked] = useState(true);
  const [openBs, setOpenBs] = useState(false);
  const [payDate, setPayDate] = useState(dayjs().add(1, 'month').toDate().toISOString());
  const [error, setError] = useState('');
  const [errorAutoSum, setErrorAutomSum] = useState('');

  const { robots } = useRobotsData();

  useEffect(() => {
    if (!LS.getItem(LSKeys.UserId, null)) {
      LS.setItem(LSKeys.UserId, Date.now());
    }
  }, []);

  const submit = () => {
    if (!sum) {
      setError('Введите сумму инвестирования');
      return;
    }
    if (!autoSum && checked) {
      setErrorAutomSum('Введите сумму автоплатежа');
      return;
    }
    window.gtag('event', '6181_add_bot', { bot: selectedRobot?.robot_info.name || '', var: 'var6' });

    setLoading(true);

    sendDataToGA({
      avto: checked ? `[${autoSum}, ${perItem.replace('per_', '')}]` : 'off',
      bot: selectedRobot?.robot_info.name || '',
      sum: String(sum),
    }).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
      setLoading(false);
    });
  };

  const handleChangeInput = (_: React.ChangeEvent<HTMLInputElement>, { value }: { value: number | null }) => {
    if (error) {
      setError('');
    }
    setSum(value ?? 0);
  };
  const handleChangeInputAutoSum = (_: React.ChangeEvent<HTMLInputElement>, { value }: { value: number | null }) => {
    if (errorAutoSum) {
      setErrorAutomSum('');
    }
    setAutoSum(value ?? 0);
  };

  const handleSwitchToggle = () => {
    setChecked(prevState => !prevState);
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  if (selectedRobot) {
    if (view === 'step2') {
      return (
        <>
          <div className={appSt.container}>
            <div>
              <Typography.Text view="secondary-medium">ШАГ 2 ИЗ 2</Typography.Text>
              <Typography.TitleResponsive
                style={{ marginTop: '6px' }}
                tag="h1"
                view="medium"
                font="system"
                weight="semibold"
              >
                Укажите первоначальную сумму инвестирования
              </Typography.TitleResponsive>
            </div>

            <AmountInput label="" value={sum} error={error} onChange={handleChangeInput} block minority={1} bold={false} />

            <div>
              <Swiper spaceBetween={12} slidesPerView="auto">
                {chips.map(chip => (
                  <SwiperSlide key={chip} className={appSt.swSlide}>
                    <Tag view="filled" size="xxs" shape="rectangular" onClick={() => setSum(chip)}>
                      {chip.toLocaleString('ru')} ₽
                    </Tag>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <Switch block reversed checked={checked} label="Пополнять регулярно" onChange={handleSwitchToggle} />

            {checked && (
              <>
                <AmountInput
                  label="Сумма автоплатежа"
                  labelView="outer"
                  value={autoSum}
                  error={errorAutoSum}
                  onChange={handleChangeInputAutoSum}
                  block
                  minority={1}
                  bold={false}
                />

                <SelectMobile
                  options={OPTIONS}
                  label="Буду вносить"
                  labelView="outer"
                  block
                  selected={perItem}
                  onChange={p => setPerItem((p.selected?.key ?? 'per_month') as OptionKey)}
                />

                <Input
                  label="Первый платёж"
                  labelView="outer"
                  value={payDate ? dayjs(payDate).format('DD.MM.YYYY') : undefined}
                  disabled={!perItem}
                  block
                  rightAddons={<CalendarMIcon color="#898991" />}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpenBs(true);
                  }}
                />
              </>
            )}
          </div>
          <Gap size={96} />

          <div className={appSt.bottomBtn}>
            <ButtonMobile
              view="secondary"
              size={56}
              style={{ minWidth: 56, maxWidth: 56 }}
              onClick={() => {
                setView('step1');
              }}
            >
              <ChevronLeftMIcon width={24} height={24} />
            </ButtonMobile>
            <ButtonMobile block view="primary" size={56} onClick={submit} loading={loading}>
              Подключить
            </ButtonMobile>
          </div>

          <CalendarMobile
            value={payDate ? dayjs(payDate).toDate().getTime() : undefined}
            selectorView={'full'}
            yearsAmount={2}
            onClose={() => setOpenBs(false)}
            open={openBs}
            minDate={dayjs().toDate().getTime()}
            maxDate={dayjs().add(2, 'year').toDate().getTime()}
            onChange={date => setPayDate(dayjs(date).toDate().toISOString())}
          />
        </>
      );
    }

    if (view === 'step1') {
      return (
        <>
          <div className={appSt.container}>
            <div>
              <Typography.Text view="secondary-medium">ШАГ 1 ИЗ 2</Typography.Text>
              <Typography.TitleResponsive
                style={{ marginTop: '6px' }}
                tag="h1"
                view="medium"
                font="system"
                weight="semibold"
              >
                Выберите актив
              </Typography.TitleResponsive>
            </div>
            {selectedRobot.available_assets.map(ticker => (
              <PureCell className={appSt.stockRow} key={ticker} onClick={() => setSelectedTicker(ticker)}>
                <PureCell.Graphics verticalAlign="center">
                  <img src={TICKER_TO_IMAGE[ticker]} width={48} height={48} alt={ticker} />
                </PureCell.Graphics>
                <PureCell.Content>
                  <PureCell.Main>
                    <Typography.Text view="primary-medium" tag="p" defaultMargins={false}>
                      {TICKER_TO_TITLE[ticker]}
                    </Typography.Text>

                    <Typography.Text view="primary-small" color="secondary">
                      {ticker}
                    </Typography.Text>
                  </PureCell.Main>
                </PureCell.Content>
                <PureCell.Addon verticalAlign="center">
                  <Radio checked={selectedTicker === ticker} onChange={() => setSelectedTicker(ticker)} />
                </PureCell.Addon>
              </PureCell>
            ))}
          </div>
          <Gap size={96} />

          <div className={appSt.bottomBtn}>
            <ButtonMobile
              view="secondary"
              size={56}
              style={{ minWidth: 56, maxWidth: 56 }}
              onClick={() => {
                setSelectedTicker('');
                setView('robot');
              }}
            >
              <ChevronLeftMIcon width={24} height={24} />
            </ButtonMobile>
            <ButtonMobile
              block
              view="primary"
              size={56}
              onClick={() => {
                if (selectedTicker) {
                  window.gtag('event', '6181_add_bot', { bot: selectedRobot.robot_info.name, var: 'var6' });

                  setView('step2');
                }
              }}
            >
              Продолжить
            </ButtonMobile>
          </div>
        </>
      );
    }

    return (
      <>
        <div className={appSt.container}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <RiskStatus
                risk={robots.findIndex(robot => robot.id === selectedRobot.id) === robots.length - 1 ? 'medium' : 'low'}
              />
              <Status view="muted" color="grey" size={20} uppercase={false}>
                <Typography.Text
                  view="secondary-small"
                  weight="bold"
                  style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <UsersMIcon width={10} height={10} />
                  <span style={{ marginTop: '1px' }}>1235 подключили</span>
                </Typography.Text>
              </Status>
            </div>
            <Typography.TitleResponsive style={{ margin: '6px 0' }} tag="h1" view="xlarge" font="system" weight="semibold">
              {selectedRobot.robot_info.name}
            </Typography.TitleResponsive>
            <Typography.Text tag="p" defaultMargins={false} view="primary-medium">
              {selectedRobot.robot_info.short_description}
            </Typography.Text>
          </div>

          <div className={appSt.box}>
            <div className={appSt.rowSb}>
              <div>
                <Typography.Text tag="p" defaultMargins={false} view="primary-small" color="secondary">
                  Прогноз на 12 мес.
                </Typography.Text>
                <Typography.Text view="primary-medium">
                  {selectedRobot.financial_metrics.potential_annual_return}
                </Typography.Text>
              </div>
              <InformationCircleMIcon width={20} height={20} color="#C5C5C7" />
            </div>
            <div className={appSt.rowSb}>
              <div>
                <Typography.Text tag="p" defaultMargins={false} view="primary-small" color="secondary">
                  Максимальная просадка
                </Typography.Text>
                <Typography.Text view="primary-medium">{selectedRobot.financial_metrics.maximum_drawdown}</Typography.Text>
              </div>
              <InformationCircleMIcon width={20} height={20} color="#C5C5C7" />
            </div>
            <div className={appSt.rowSb}>
              <div>
                <Typography.Text tag="p" defaultMargins={false} view="primary-small" color="secondary">
                  Коэффициент волатильности
                </Typography.Text>
                <Typography.Text view="primary-medium">
                  {selectedRobot.financial_metrics.volatility_coefficient}
                </Typography.Text>
              </div>
              <InformationCircleMIcon width={20} height={20} color="#C5C5C7" />
            </div>
            <div className={appSt.rowSb}>
              <div>
                <Typography.Text tag="p" defaultMargins={false} view="primary-small" color="secondary">
                  Минимальная сумма
                </Typography.Text>
                <Typography.Text view="primary-medium">
                  {typeof selectedRobot.financial_metrics.minimum_amount === 'string'
                    ? selectedRobot.financial_metrics.minimum_amount
                    : `${selectedRobot.financial_metrics.minimum_amount.min}`}
                </Typography.Text>
              </div>
              <InformationCircleMIcon width={20} height={20} color="#C5C5C7" />
            </div>
          </div>

          <div>
            <Typography.TitleResponsive tag="h2" view="small" font="system" weight="semibold">
              О стратегии
            </Typography.TitleResponsive>
            <Typography.Text tag="p" defaultMargins={false} style={{ marginTop: '8px' }} view="primary-medium">
              {selectedRobot.robot_info.detailed_description}
            </Typography.Text>
          </div>

          <div className={appSt.box2}>
            <img src={benefitsImg} width={48} height={48} alt="Benefits" />
            <div>
              <Typography.Text tag="p" defaultMargins={false} view="primary-medium" weight="bold">
                Пример
              </Typography.Text>
              <Typography.Text tag="p" defaultMargins={false} view="primary-small" color="secondary">
                {selectedRobot.example_usage.scenario}
              </Typography.Text>
            </div>
          </div>

          <Typography.TitleResponsive tag="h2" view="small" font="system" weight="semibold">
            Доступные бумаги
          </Typography.TitleResponsive>

          <div>
            <Swiper style={{ marginLeft: '0' }} spaceBetween={6} slidesPerView="auto">
              {selectedRobot.available_assets.map(ticker => (
                <SwiperSlide className={appSt.stockSlide} key={ticker}>
                  <img src={TICKER_TO_IMAGE[ticker]} width={48} height={48} alt={ticker} />
                  <Typography.Text view="secondary-small">{TICKER_TO_TITLE[ticker]}</Typography.Text>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div>
            <Typography.TitleMobile tag="h2" view="small" color="primary" weight="semibold" font="system">
              Как это работает
            </Typography.TitleMobile>
            <Gap size={12} />
            <Steps isVerticalAlign={true} interactive={false} className={appSt.stepStyle}>
              <Typography.Text view="component-primary">
                Решаете, с какой бумагой и какой суммой работает робот
              </Typography.Text>
              <Typography.Text view="component-primary">Подключаете его — а дальше он всё делает сам</Typography.Text>
              <Typography.Text view="component-primary">
                В любой момент можно отключить. Все сделки видны, деньги остаются у вас
              </Typography.Text>
            </Steps>
          </div>

          <div>
            <Typography.TitleMobile tag="h2" view="small" color="primary" weight="semibold" font="system">
              Частые вопросы
            </Typography.TitleMobile>
            <Gap size={12} />
            <div className={appSt.box}>
              {faqs.map((faq, index) => (
                <div key={index}>
                  <div
                    onClick={() => {
                      window.gtag('event', '6181_FAQ_bot', {
                        bot: selectedRobot.robot_info.name,
                        var: 'var6',
                        faq: String(index + 1),
                      });
                      setCollapsedItem(items =>
                        items.includes(String(index + 1))
                          ? items.filter(item => item !== String(index + 1))
                          : [...items, String(index + 1)],
                      );
                    }}
                    className={appSt.rowSb}
                  >
                    <Typography.Text view="primary-medium" weight="medium">
                      {faq.question}
                    </Typography.Text>
                    {collapsedItems.includes(String(index + 1)) ? (
                      <div style={{ flexShrink: 0 }}>
                        <ChevronUpMIcon />
                      </div>
                    ) : (
                      <div style={{ flexShrink: 0 }}>
                        <ChevronDownMIcon />
                      </div>
                    )}
                  </div>
                  <Collapse expanded={collapsedItems.includes(String(index + 1))}>
                    {faq.answers.length > 1 ? (
                      <List tag="ul" marker="•">
                        {faq.answers.map((answer, ansIndex) => (
                          <List.Item key={ansIndex}>
                            <Typography.Text view="primary-medium">{answer}</Typography.Text>
                          </List.Item>
                        ))}
                      </List>
                    ) : (
                      <Typography.Text view="primary-medium">{faq.answers[0]}</Typography.Text>
                    )}
                  </Collapse>
                </div>
              ))}
            </div>
          </div>

          <div className={appSt.box2} style={{ flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <img src={questionsImg} width={48} height={48} alt="Questions" />
              <div>
                <Typography.Text tag="p" defaultMargins={false} view="primary-medium" weight="bold">
                  Остались вопросы?
                </Typography.Text>
                <Typography.Text tag="p" defaultMargins={false} view="primary-small" color="secondary">
                  Запишитесь на консультацию и получите персональное решение под ваши задачи
                </Typography.Text>
              </div>
            </div>
            <ButtonMobile
              block
              view="secondary"
              size={32}
              onClick={() => {
                window.gtag('event', '6181_consult_bot', { bot: selectedRobot.robot_info.name, var: 'var6' });
              }}
            >
              Заказать консультацию
            </ButtonMobile>
          </div>
        </div>
        <Gap size={96} />

        <div className={appSt.bottomBtn}>
          <ButtonMobile
            view="secondary"
            size={56}
            style={{ minWidth: 56, maxWidth: 56 }}
            onClick={() => setSelectedRobot(null)}
          >
            <ChevronLeftMIcon width={24} height={24} />
          </ButtonMobile>
          <ButtonMobile
            block
            view="primary"
            size={56}
            onClick={() => {
              window.gtag('event', '6181_add_bot', { bot: selectedRobot.robot_info.name, var: 'var6' });
              setView('step1');
            }}
          >
            Подключить
          </ButtonMobile>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={appSt.container}>
        <div>
          <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h1" view="xlarge" font="system" weight="semibold">
            Торговые роботы
          </Typography.TitleResponsive>
          <Typography.Text tag="p" defaultMargins={false} style={{ margin: '6px 0' }} view="primary-medium">
            Подключите готового робота, и он будет торговать за вас
          </Typography.Text>
          <Typography.Text view="primary-small">
            Стоимость: <b>0 ₽</b>
          </Typography.Text>
        </div>

        <div>
          <Swiper style={{ marginLeft: '0' }} spaceBetween={12} slidesPerView="auto">
            <SwiperSlide className={appSt.boxSlide}>
              <img src={oneImg} width={16} height={32} alt="One" style={{ objectFit: 'cover' }} />
              <Typography.Text view="primary-small">Изучите роботов</Typography.Text>
            </SwiperSlide>
            <SwiperSlide className={appSt.boxSlide}>
              <img src={twoImg} width={22} height={32} alt="Two" style={{ objectFit: 'cover' }} />
              <Typography.Text view="primary-small">Выберите понравившегося</Typography.Text>
            </SwiperSlide>
            <SwiperSlide className={appSt.boxSlide}>
              <img src={threeImg} width={24} height={32} alt="Three" style={{ objectFit: 'cover' }} />
              <Typography.Text view="primary-small">Настройте для себя и подключите</Typography.Text>
            </SwiperSlide>
          </Swiper>
        </div>

        <div>
          <Typography.TitleResponsive style={{ marginTop: '12px' }} tag="h1" view="medium" font="system" weight="semibold">
            Выберите робота
          </Typography.TitleResponsive>
          <Typography.Text tag="p" defaultMargins={false} style={{ marginTop: '4px' }} view="primary-medium">
            5 доступно
          </Typography.Text>
        </div>

        {robots.map((robot, index) => (
          <div
            className={appSt.robotContainer}
            key={robot.id}
            onClick={() => {
              window.gtag('event', '6181_card_bot', { bot: robot.robot_info.name, var: 'var6' });
              setSelectedRobot(robot);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <RiskStatus risk={index === robots.length - 1 ? 'medium' : 'low'} />
              <Status view="muted" color="grey" size={20} uppercase={false}>
                <Typography.Text
                  view="secondary-small"
                  weight="bold"
                  style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <UsersMIcon width={10} height={10} />
                  <span style={{ marginTop: '1px' }}>1235 подключили</span>
                </Typography.Text>
              </Status>
            </div>

            <div>
              <Typography.TitleResponsive tag="h2" view="small" font="system" weight="semibold">
                {robot.robot_info.name}
              </Typography.TitleResponsive>
              <Typography.Text tag="p" defaultMargins={false} style={{ marginTop: '2px' }} view="primary-small">
                {robot.robot_info.short_description}
              </Typography.Text>
            </div>

            <div style={{ display: 'flex', gap: '32px' }}>
              <div>
                <Typography.TitleResponsive color="positive" tag="h4" view="xsmall" font="system" weight="bold">
                  {robot.financial_metrics.potential_annual_return}
                </Typography.TitleResponsive>
                <Typography.Text
                  tag="p"
                  defaultMargins={false}
                  style={{ marginTop: '4px' }}
                  view="component-secondary"
                  color="secondary"
                >
                  Прогноз
                </Typography.Text>
              </div>
              <div>
                <Typography.TitleResponsive tag="h4" view="xsmall" font="system" weight="bold">
                  {robot.financial_metrics.volatility_coefficient}
                </Typography.TitleResponsive>
                <Typography.Text
                  tag="p"
                  defaultMargins={false}
                  style={{ marginTop: '4px' }}
                  view="component-secondary"
                  color="secondary"
                >
                  Просадка
                </Typography.Text>
              </div>
            </div>

            {robot.available_assets.length > 0 && index !== 0 && index !== robots.length - 1 && (
              <ImgStack tickers={robot.available_assets} />
            )}
          </div>
        ))}
      </div>
      <Gap size={24} />
    </>
  );
};
