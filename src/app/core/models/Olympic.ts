import { Participation } from "./Participation";

export interface Olympic {
  id: number,
  country: string,
  color: string;
  participations: Participation[]
}
