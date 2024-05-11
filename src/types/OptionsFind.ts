export interface Options<include, select> {
  where: {
    id: number;
  };
  include?: include;
  select?: select;
}
