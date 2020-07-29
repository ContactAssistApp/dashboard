export const dateTime = {
    getTimeZoneFormat: function(date){
        const dateTimeFormat = new Intl.DateTimeFormat(
            'en-US',
            {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }
        );
        const [{ value: month },,{ value: day },,{ value: year },, {value: hour},,{value: minute},,{value:second}] = dateTimeFormat.formatToParts(date);

        return `${year}${month}${day}T${hour}${minute}${second}`;
    },
    diffHours: function(dt2, dt1){
        var diff = (dt2 - dt1) / 1000;
        diff /= (60 * 60);
        return Math.abs(Math.round(diff));
    }
};