const dateToString = (date) => {
    let dd = date.getDate();
    let mm = date.getMonth()+1; //January is 0!
    let yyyy = date.getFullYear();
    
    if ( dd < 10 ) { dd = '0'+dd }
    if ( mm < 10 ) { mm = '0'+mm }
    
    return dd + '/' + mm + '/' + yyyy;
};

const today = new Date();
export const todayString = dateToString(today);

// get tomorrow's date, which is used when querying the API as the start_date param
const tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
export const tomorrowString = dateToString(tomorrow);
