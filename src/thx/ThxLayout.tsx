import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { Typography } from '@alfalab/core-components/typography';
import sparkles from '../assets/rocket.png';
import { appSt } from '../style.css';
import { thxSt } from './style.css';

const link = 'alfabank:///';

export const ThxLayout = () => {
  return (
    <>
      <div className={thxSt.container}>
        <img src={sparkles} width={280} height={280} className={thxSt.rocket} />
        <Typography.TitleResponsive style={{ margin: '24px 0 12px' }} font="system" tag="h1" view="medium" weight="medium">
          Спасибо за участие
        </Typography.TitleResponsive>
        <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
          Мы проводим исследование для нового сервиса. Скоро расскажем о нём подробнее, следите за новостями!
        </Typography.Text>
      </div>
      <div className={appSt.bottomBtn}>
        <ButtonMobile block view="secondary" href={link}>
          На главный
        </ButtonMobile>
      </div>
    </>
  );
};
