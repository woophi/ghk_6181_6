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
  author: {
    name: string;
    img: string; // и т.п. person_1 person_2 person_3 person_4
  };
  followers: number;
};
