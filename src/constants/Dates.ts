export const DateFormat = 'MM/dd/yyyy'; // 01/21/2000
export const DateStringFormat = 'MMM d, yyyy'; // Jan 21, 2000
export const ExpenseFormat = 'MMM yyyy'; // Jan 2000
export const ShortDateFormat = 'MM/dd'; // 01/21
export const LongDateFormat = 'dddd, MMMM d, yyyy'; // Sunday, January 21, 2000

export const Months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
export const Days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

export const targetExpiryDays = 7; // Notify user 7 days before expiry, default
export const ExpiryNotificationThresholds = {
    low: 1, // Notify user 1 day before expiry
    medium: 3, // Notify user 3 days before expiry
    high: 7, // Notify user 7 days before expiry
};
