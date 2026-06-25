import { SalvagingDataBradley } from "./salvaging-data-bradley";
import { SalvagingDataPatrolHelicopter } from "./salvaging-data-patrol-helicopter";

export const SALVAGING_DATA = {
  "Bradley": SalvagingDataBradley,
  "Patrol Helicopter": SalvagingDataPatrolHelicopter,
};

export type SalvagingTarget = keyof typeof SALVAGING_DATA;
