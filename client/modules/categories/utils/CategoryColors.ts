/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 18.10.2022
 * Time: 23:32
*/

interface ICategoryColor {
    dark: string,
    default: string
}

interface ICategoryColorProps {
    bg: string,
    text: string
}

export type IColors = 'Emerald' | 'Blue' | 'Orange' | 'Pink'
export default class CategoryColors {

    /**
     *
     * @private
     */

    public static readonly Emerald: ICategoryColor = {
        dark: '#063312',
        default: '#17CB49'
    }


    /**
     *
     * @private
     */

    public static readonly Blue: ICategoryColor = {
        dark: '#052440',
        default: '#168FFF'
    }


    /**
     *
     * @private
     */

    public static readonly Orange: ICategoryColor = {
        dark: '#40280B',
        default: '#FF9F2D'
    }


    /**
     *
     * @private
     */

    public static readonly Pink: ICategoryColor = {
        dark: '#390B0B',
        default: '#F74141'
    }


    /**
     *
     * @param color
     * @param props
     * @constructor
     */

    public static ColorBuilder(color: IColors, variant: 'dark' | 'default', props: 'bg' | 'text') {
        switch (color) {
            case "Orange": {
                return props + '-[' + (variant === 'dark' ? CategoryColors.Orange.dark : CategoryColors.Orange.default) + ']'
            }

            case "Emerald": {
                return props + '-[' + (variant === 'dark' ? CategoryColors.Emerald.dark : CategoryColors.Emerald.default) + ']'
            }

            case "Blue": {
                return props + '-[' + (variant === 'dark' ? CategoryColors.Blue.dark : CategoryColors.Blue.default) + ']'
            }

            case "Pink": {
                return props + '-[' + (variant === 'dark' ? CategoryColors.Pink.dark : CategoryColors.Pink.default) + ']'
            }

            default: {
                return 'bg-d-lighter'
            }
        }
    }
}