/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 13.11.2022
 * Time: 13:35
*/

export default class DateTime {
    public static monthToPl(month: string): string {
        switch (month) {
            case 'November':
                return 'Listopad'

            case 'December':
                return 'Grudzień'

            default:
                return month
        }
    }
}