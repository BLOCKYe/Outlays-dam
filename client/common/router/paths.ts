/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 20:21
 */

import type { sectionTypes } from "../components/menu/BottomBar";

export default class Paths {
  public static readonly OPERATIONS: string = "/operations";
  public static readonly CATEGORIES: string = "/categories";
  public static readonly STATS: string = "/stats";
  public static readonly GOALS: string = "/goals";
  public static readonly LOGIN: string = "/login";
  public static readonly REGISTER: string = "/register";
  public static readonly VERIFY: string = "/verify";
  public static readonly SETTINGS: string = "/settings";
}

/**
 * Returns path string
 * @param section
 */
export const getPathBySection = (section?: sectionTypes) => {
  if (!section) return Paths.OPERATIONS;

  switch (section) {
    case "OPERATIONS":
      return Paths.OPERATIONS;
    case "CATEGORIES":
      return Paths.CATEGORIES;
    case "ANALYTICS":
      return Paths.STATS;
    case "GOALS":
      return Paths.GOALS;
    case "SETTINGS":
      return Paths.SETTINGS;
    default:
      return Paths.OPERATIONS;
  }
};
