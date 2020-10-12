export interface Filiaal {
  filiaalnummer: number,
  address: string,
  postcode: string,
  telnum: string,
  info: string,
  mededeling: string,
  [index: string]: string|number;
}
