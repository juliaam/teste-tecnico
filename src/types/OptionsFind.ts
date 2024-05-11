export interface OptionsFind {
  where: {
    id: number;
  };
  include?: object;
  select?: object;
}