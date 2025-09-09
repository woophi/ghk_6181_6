import { Typography } from '@alfalab/core-components/typography';
import { TICKER_TO_IMAGE } from './hooks/useData';
import { appSt } from './style.css';

type Props = {
  tickers: string[];
};

export const ImgStack = ({ tickers }: Props) => {
  const [firstImg, secondImg, thirdImg, ...restImgs] = tickers.map(ticker => TICKER_TO_IMAGE[ticker]);
  return (
    <div className={appSt.imgsStack}>
      <img src={firstImg} width={32} height={32} className={appSt.imgStack()} />
      <img src={secondImg} width={32} height={32} className={appSt.imgStack({ aligned: true })} />
      <img src={thirdImg} width={32} height={32} className={appSt.imgStack({ aligned: true })} />
      {restImgs.length > 0 && (
        <div className={appSt.imgStack({ aligned: true })}>
          <Typography.Text view="secondary-large" color="secondary" weight="medium">
            +{restImgs.length}
          </Typography.Text>
        </div>
      )}
    </div>
  );
};
