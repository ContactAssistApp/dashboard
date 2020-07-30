export const dateTime = {
    getTimeZoneFormat: function(dateTime){
        const dateTimeFormat = new Intl.DateTimeFormat(
            'en-US',
            {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hourCycle: 'h23',
            }
        );
       const dateTimeParts = dateTimeFormat.formatToParts(dateTime).reduce(function(acc, item){
            acc[item['type']] = item['value'];
            return acc;
        }, {});

        return `${dateTimeParts['year']}${dateTimeParts['month']}${dateTimeParts['day']}T${dateTimeParts['hour']}${dateTimeParts['minute']}${dateTimeParts['second']}`;
    },
    diffHours: function(dt2, dt1){
        var diff = (dt2 - dt1) / 1000;
        diff /= (60 * 60);
        return Math.abs(Math.round(diff));
    }
};