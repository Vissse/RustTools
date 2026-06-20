import type { SmeltingProcess } from "../../types";

export const SmallOilRefinery: SmeltingProcess[] = [
  {
    inputItem: "Crude Oil",
    woodRequired: 2.22,
    outputItem: "Low Grade Fuel",
    outputQuantity: "3",
    timeSeconds: 3.33,
  },
  {
    inputItem: "Cooked Human Meat",
    woodRequired: 13.33,
    outputItem: "Burnt Human Meat",
    outputQuantity: "1",
    timeSeconds: 20.0,
  },
  {
    inputItem: "Cooked Wolf Meat",
    woodRequired: 13.33,
    outputItem: "Burnt Wolf Meat",
    outputQuantity: "1",
    timeSeconds: 20.0,
  },
  {
    inputItem: "Empty Can Of Beans",
    woodRequired: 6.67,
    outputItem: "Metal Fragments",
    outputQuantity: "15",
    timeSeconds: 10.0,
  },
  {
    inputItem: "Empty Tuna Can",
    woodRequired: 6.67,
    outputItem: "Metal Fragments",
    outputQuantity: "10",
    timeSeconds: 10.0,
  },
  {
    inputItem: "Wood",
    woodRequired: 0.0,
    outputItem: "Charcoal",
    outputQuantity: "75%",
    timeSeconds: 1.5,
  },
];
