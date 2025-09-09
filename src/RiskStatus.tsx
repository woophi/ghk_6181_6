import { Status } from '@alfalab/core-components/status';
import { Typography } from '@alfalab/core-components/typography';

type Props = {
  risk: 'low' | 'medium' | 'high';
};

export const RiskStatus = ({ risk }: Props) => {
  return (
    <Status view="contrast" color={risk === 'low' ? 'green' : risk === 'medium' ? 'orange' : 'red'} size={20}>
      <Typography.Text view="secondary-small" weight="bold">
        {risk === 'low' && 'НИЗКИЙ РИСК'}
        {risk === 'medium' && 'СРЕДНИЙ РИСК'}
        {risk === 'high' && 'ВЫСОКИЙ РИСК'}
      </Typography.Text>
    </Status>
  );
};
