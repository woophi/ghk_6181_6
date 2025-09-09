export type RobotItem = {
  id: string;
  robot_info: {
    name: string;
    short_description: string;
    detailed_description: string;
  };
  example_usage: {
    scenario: string;
  };
  financial_metrics: {
    potential_annual_return: string;
    maximum_drawdown: string;
    volatility_coefficient: string;
    minimum_amount:
      | {
          min: string;
          max: string;
        }
      | string;
  };
  available_assets: string[];
};
