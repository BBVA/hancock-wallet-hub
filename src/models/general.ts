export type dltAddress = string;

export interface IRawTransaction {
  from: dltAddress;
  to: dltAddress;
  value: string;
}