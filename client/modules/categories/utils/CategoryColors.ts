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

interface ICategoryColorProps {
  bg: string;
  text: string;
}

export interface IColorItemData {
  name: string;
  label: string;
  styles: string;
}

export type IColors = "Emerald" | "Blue" | "Orange" | "Pink" | "Purple";
export default class CategoryColors {
  /**
   *
   * @private
   */

  public static readonly Emerald: ICategoryColor = {
    dark: "#063312",
    default: "#17CB49",
  };

  /**
   *
   * @private
   */

  public static readonly Blue: ICategoryColor = {
    dark: "#052440",
    default: "#168FFF",
  };

  /**
   *
   * @private
   */

  public static readonly Orange: ICategoryColor = {
    dark: "#40280B",
    default: "#FF9F2D",
  };

  /**
   *
   * @private
   */

  public static readonly Pink: ICategoryColor = {
    dark: "#390B0B",
    default: "#F74141",
  };

  /**
   *
   * @private
   */

  public static readonly Purple: ICategoryColor = {
    dark: "#390B38",
    default: "#C841F7",
  };

  /**
   *
   * @param color
   * @param variant
   * @param props
   * @constructor
   */

  public static ColorBuilder(
    color: IColors,
    variant: "dark" | "default",
    props: "bg" | "text"
  ): string {
    switch (color) {
      case "Orange": {
        if (variant === "default" && props === "bg") return "bg-[#FF9F2D]";
        else if (variant === "default" && props === "text")
          return "text-[#FF9F2D]";
        else if (variant === "dark" && props === "bg") return "bg-[#40280B]";
        else if (variant === "dark" && props === "text")
          return "text-[#40280B]";
      }

      case "Emerald": {
        if (variant === "default" && props === "bg") return "bg-[#17CB49]";
        else if (variant === "default" && props === "text")
          return "text-[#17CB49]";
        else if (variant === "dark" && props === "bg") return "bg-[#063312]";
        else if (variant === "dark" && props === "text")
          return "text-[#063312]";
      }

      case "Blue": {
        if (variant === "default" && props === "bg") return "bg-[#168FFF]";
        else if (variant === "default" && props === "text")
          return "text-[#168FFF]";
        else if (variant === "dark" && props === "bg") return "bg-[#052440]";
        else if (variant === "dark" && props === "text")
          return "text-[#052440]";
      }

      case "Pink": {
        if (variant === "default" && props === "bg") return "bg-[#F74141]";
        else if (variant === "default" && props === "text")
          return "text-[#F74141]";
        else if (variant === "dark" && props === "bg") return "bg-[#390B0B]";
        else if (variant === "dark" && props === "text")
          return "text-[#390B0B]";
      }

      case "Purple": {
        if (variant === "default" && props === "bg") return "bg-[#C841F7]";
        else if (variant === "default" && props === "text")
          return "text-[#C841F7]";
        else if (variant === "dark" && props === "bg") return "bg-[#390B38]";
        else if (variant === "dark" && props === "text")
          return "text-[#390B38]";
      }

      default: {
        return "bg-d-lighter";
      }
    }
  }

  public static availableColors: IColorItemData[] = [
    {
      name: "Orange",
      label: "Pomaranczowy",
      styles:
        CategoryColors.ColorBuilder("Orange", "dark", "bg") +
        " " +
        CategoryColors.ColorBuilder("Orange", "default", "text"),
    },
    {
      name: "Emerald",
      label: "Zielony",
      styles:
        CategoryColors.ColorBuilder("Emerald", "dark", "bg") +
        " " +
        CategoryColors.ColorBuilder("Emerald", "default", "text"),
    },
    {
      name: "Blue",
      label: "Niebieski",
      styles:
        CategoryColors.ColorBuilder("Blue", "dark", "bg") +
        " " +
        CategoryColors.ColorBuilder("Blue", "default", "text"),
    },
    {
      name: "Pink",
      label: "Czerwony",
      styles:
        CategoryColors.ColorBuilder("Pink", "dark", "bg") +
        " " +
        CategoryColors.ColorBuilder("Pink", "default", "text"),
    },
    {
      name: "Purple",
      label: "Fioletowy",
      styles:
        CategoryColors.ColorBuilder("Purple", "dark", "bg") +
        " " +
        CategoryColors.ColorBuilder("Purple", "default", "text"),
    },
  ];
}
