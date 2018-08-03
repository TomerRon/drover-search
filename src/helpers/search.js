import qs from 'qs';

// Returns the total number of pages in the search, according to the total count and the number of items per page
// getTotalPages(15, 15) -> Math.floor(14 / 15) + 1 -> 1
// getTotalPages(16, 15) -> Math.floor(15 / 15) + 1 -> 2
export const getTotalPages = (total_count, per_page) => {
    return Math.floor((total_count-1) / per_page) + 1;
};

// Cleans up the form params for the API request
export const getSearchParams = (form) => {
    
    // Ensure number fields are sent to the API as numbers
    const numberFields = ['number_of_seats_min', 'number_of_seats_max', 'max_distance', 'page', 'price_min', 'price_max', 'subscription_start_days', 'year'];
    numberFields.forEach(field => {
        if (form[field]) {
            form[field] = parseInt(form[field], 10);
        }
    });
    
    // Clean fields which are optional, and shouldn't be sent to the API if they are empty
    const possibleNullFields = ['vehicle_make', 'transmission', 'year', 'fuel'];
    possibleNullFields.forEach(field => {
        if (form[field] === '') {
            delete form[field];
        }
    });
    
    return form;
};

// Returns the URL string according to the selected params
export const getSearchUrl = (form) => {
    const { location,
            number_of_seats_min,
            number_of_seats_max,
            max_distance,
            page,
            price_min,
            price_max,
            subscription_start_days,
            vehicle_type,
            order_by,
            order_direction,
            vehicle_make,
            transmission,
            year,
            fuel
    } = form;
    
    const urlFields = {
        location,
        number_of_seats_min,
        number_of_seats_max,
        max_distance,
        page,
        price_min,
        price_max,
        subscription_start_days,
        vehicle_type,
        order_by,
        order_direction,
        ...(vehicle_make ? {vehicle_make} : {}),
        ...(transmission ? {transmission} : {}),
        ...(year ? {year} : {}),
        ...(fuel ? {fuel} : {})
    };
    
    return qs.stringify(urlFields);
};
