import { useEffect, useState } from 'react';
import gazpImg from '../assets/gazp.png';
import lukolImg from '../assets/lukol.png';
import mechelImg from '../assets/mechel.png';
import nikelImg from '../assets/nikel.png';
import novatekImg from '../assets/novatek.png';
import rosneftImg from '../assets/rosneft.png';
import sberImg from '../assets/sber.png';
import tbankImg from '../assets/tbank.png';
import vtbImg from '../assets/vtb.png';
import x5Img from '../assets/x5.png';
import { RobotItem } from '../types';

export const TICKER_TO_IMAGE: Record<string, string> = {
  GAZP: gazpImg,
  GMKN: nikelImg,
  LKOH: lukolImg,
  MTLR: mechelImg,
  NVTK: novatekImg,
  ROSN: rosneftImg,
  SBER: sberImg,
  T: tbankImg,
  VTB: vtbImg,
  X5: x5Img,
};
export const TICKER_TO_TITLE: Record<string, string> = {
  GAZP: 'Газпром',
  GMKN: 'Норильский никель',
  LKOH: 'Лукойл',
  MTLR: 'Мечел',
  NVTK: 'Новатэк',
  ROSN: 'Роснефть',
  SBER: 'Сбербанк',
  T: 'Т Банк',
  VTB: 'ВТБ',
  X5: 'ИКС 5',
};

export const faqs = [
  {
    question: 'Что такое торговые роботы?',
    answers: [
      'Торговые роботы — это инструмент инвестора, который самостоятельно отслеживает ситуацию на рынке и на основе ранее заданных параметров принимает решение о покупке или продаже акций и других активов.',
    ],
  },
  {
    question: 'Зачем нужны торговые роботы?',
    answers: [
      'Торговые боты в инвестициях нужны для автоматизации процессов торговли на бирже. Они самостоятельно отслеживают ситуацию на рынке и на основе заранее заданных параметров либо принимают решение о покупке или продаже акций и других активов.',
    ],
  },
  {
    question: 'Кому подойдет?',
    answers: [
      'Инвесторам с опытом, которые хотят диверсифицировать свой портфель или настроить автоматическое управление активами',
      'Инвесторам без опыта роботы помогают в изучении рынка, тестировании стратегий',
    ],
  },
  {
    question: 'Какие преимущества?',
    answers: [
      'Отсутствие эмоций. Торгуя самостоятельно, можно поддаться соблазну или панике, провести сделку на невыгодных условиях и потерять деньги. Робот действует по заданному алгоритму и не принимает необдуманных решений',
      'Экономия времени. Подключение торгового робота позволяет существенно сократить время на изучение и анализ подходящего момента для сделки',
    ],
  },
];

export const useRobotsData = () => {
  const [robots, setRobots] = useState<RobotItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://gist.githubusercontent.com/nsdooris/3c70b682ee0a9d261b1b5f5e8be21378/raw');
      const data = (await response.json()) as { trading_robots: RobotItem[] };
      setRobots(data.trading_robots);
      setLoading(false);
    };

    fetchData();
  }, []);

  return { robots, loading };
};
