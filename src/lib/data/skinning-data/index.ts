import { SkinningDataBear } from "./skinning-data-bear";
import { SkinningDataBoar } from "./skinning-data-boar";
import { SkinningDataChicken } from "./skinning-data-chicken";
import { SkinningDataCrocodile } from "./skinning-data-crocodile";
import { SkinningDataHorse } from "./skinning-data-horse";
import { SkinningDataNewman } from "./skinning-data-newman";
import { SkinningDataPanther } from "./skinning-data-panther";
import { SkinningDataPolarBear } from "./skinning-data-polar-bear";
import { SkinningDataScientist } from "./skinning-data-scientist";
import { SkinningDataShark } from "./skinning-data-shark";
import { SkinningDataSnake } from "./skinning-data-snake";
import { SkinningDataStag } from "./skinning-data-stag";
import { SkinningDataTiger } from "./skinning-data-tiger";
import { SkinningDataWolf } from "./skinning-data-wolf";

export const SKINNING_DATA = {
  "Bear": SkinningDataBear,
  "Boar": SkinningDataBoar,
  "Chicken": SkinningDataChicken,
  "Crocodile": SkinningDataCrocodile,
  "Horse": SkinningDataHorse,
  "Newman": SkinningDataNewman,
  "Panther": SkinningDataPanther,
  "Polar Bear": SkinningDataPolarBear,
  "Scientist": SkinningDataScientist,
  "Shark": SkinningDataShark,
  "Snake": SkinningDataSnake,
  "Stag": SkinningDataStag,
  "Tiger": SkinningDataTiger,
  "Wolf": SkinningDataWolf,
};

export type SkinningTarget = keyof typeof SKINNING_DATA;
