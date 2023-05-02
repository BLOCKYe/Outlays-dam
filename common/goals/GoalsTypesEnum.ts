export type IGoalType = "INCOME" | "EXPENSE" | "SAVE";

export enum GoalsTypesEnum {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  SAVE = "SAVE",
}

export const GoalsTypesDictionary = {
  INCOME: { type: GoalsTypesEnum.INCOME, name: "Przychody" },
  EXPENSE: { type: GoalsTypesEnum.EXPENSE, name: "Wydatki" },
  SAVE: { type: GoalsTypesEnum.SAVE, name: "Oszczędności" },
};

export const GoalsTypesKeys = Object.values(GoalsTypesEnum);
