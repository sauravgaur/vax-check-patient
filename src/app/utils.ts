import moment from 'moment';

export default class Utils {
    static doSomething(val: string) { return val; }
    static doSomethingElse(val: string) { return val; }
    static addDays(date: Date, days: number): Date {
        date.setDate(date.getDate() + days);
        return date;
    }
    static formatToUSStandared(date: Date): string {
        return moment(date).format('YYYY-MM-DD');
    }
}
