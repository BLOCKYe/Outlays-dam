/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 18.10.2022
 * Time: 23:32
 */

interface ICategoryColor {
  dark: string;
  default: string;
}

export interface IColorItemData {
  name: string;
  label: string;
  styles: ICategoryColor;
}

export type IColors =
  | "Emerald"
  | "Blue"
  | "Orange"
  | "Pink"
  | "Purple"
  | "Gray"
  | "Lime"
  | "Yellow"
  | "Indigo"
  | "Red";

export default class CategoryColors {
  /**
   *
   * @private
   */
  public static readonly Emerald: ICategoryColor = {
    dark: "#031a09",
    default: "#17CB49",
  };

  /**
   *
   * @private
   */
  public static readonly Blue: ICategoryColor = {
    dark: "#031220",
    default: "#168FFF",
  };

  /**
   *
   * @private
   */
  public static readonly Orange: ICategoryColor = {
    dark: "#201406",
    default: "#FF9F2D",
  };

  /**
   *
   * @private
   */
  public static readonly Red: ICategoryColor = {
    dark: "#230505",
    default: "#ef4444",
  };

  /**
   *
   * @private
   */
  public static readonly Purple: ICategoryColor = {
    dark: "#1d061c",
    default: "#C841F7",
  };

  /**
   *
   * @private
   */
  public static readonly Gray: ICategoryColor = {
    dark: "#050505",
    default: "#d4d4d4",
  };

  /**
   *
   * @private
   */
  public static readonly Lime: ICategoryColor = {
    dark: "#0d1703",
    default: "#a3e635",
  };

  /**
   *
   * @private
   */
  public static readonly Yellow: ICategoryColor = {
    dark: "#392009",
    default: "#facc15",
  };

  /**
   *
   * @private
   */
  public static readonly Indigo: ICategoryColor = {
    dark: "#0f0e26",
    default: "#818cf8",
  };

  /**
   *
   * @private
   */
  public static readonly Pink: ICategoryColor = {
    dark: "#20030e",
    default: "#ec4899",
  };

  /**
   * Returns color variants
   * by type name
   * @param color
   */
  public static getColor(color: IColors) {
    switch (color) {
      case "Emerald": {
        return CategoryColors.Emerald;
      }

      case "Lime": {
        return CategoryColors.Lime;
      }

      case "Gray": {
        return CategoryColors.Gray;
      }

      case "Indigo": {
        return CategoryColors.Indigo;
      }

      case "Yellow": {
        return CategoryColors.Yellow;
      }

      case "Purple": {
        return CategoryColors.Purple;
      }

      case "Orange": {
        return CategoryColors.Orange;
      }

      case "Red": {
        return CategoryColors.Red;
      }

      case "Blue": {
        return CategoryColors.Blue;
      }

      case "Pink": {
        return CategoryColors.Pink;
      }

      default: {
        return {
          dark: "black",
          default: "white",
        };
      }
    }
  }

  public static availableColors: IColorItemData[] = [
    {
      name: "Orange",
      label: "Pomarańczowy",
      styles: this.Orange,
    },
    {
      name: "Emerald",
      label: "Zielony",
      styles: this.Emerald,
    },
    {
      name: "Blue",
      label: "Niebieski",
      styles: this.Blue,
    },
    {
      name: "Red",
      label: "Czerwony",
      styles: this.Red,
    },
    {
      name: "Purple",
      label: "Fioletowy",
      styles: this.Purple,
    },
    {
      name: "Gray",
      label: "Szary",
      styles: this.Gray,
    },
    {
      name: "Lime",
      label: "Limonkowy",
      styles: this.Lime,
    },
    {
      name: "Yellow",
      label: "Żółty",
      styles: this.Yellow,
    },
    {
      name: "Indigo",
      label: "Indigo",
      styles: this.Indigo,
    },
    {
      name: "Pink",
      label: "Różowy",
      styles: this.Pink,
    },
  ];
}
