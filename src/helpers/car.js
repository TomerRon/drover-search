// Gets the Drover URL for an item
export const getCarUrl = (make, model, id) => {
    const baseUrl = 'https://www.joindrover.com/cars';
    make = make.toLowerCase();
    model = model.toLowerCase().split(' ').join('-');
    return baseUrl+'/'+make+'/'+model+'/'+id;
};

// Returns the price of a car, depending on the vehicle type and the number of months or weeks
export const getPrice = (car, formValues) => {
    if (!car.price_discount_and_deposit_schedule_hash) { return { rate: null, discount: null, previousRate: null }; }
    
    const type = car.vehicle_type.toUpperCase();
    
    if (type === 'CONSUMER') {
        const priceArray = car.price_discount_and_deposit_schedule_hash[formValues.number_of_months];
        const rate = Math.ceil(priceArray.subtotal_price_pounds);
        const discount = priceArray.discount_pounds;
        const previousRate = rate + discount;
        return { rate, discount, previousRate };
    }
    
    if (type === 'PCO') {
        const priceArray = car.price_discount_and_deposit_schedule_hash[formValues.number_of_weeks];
        const rate = Math.ceil(priceArray.driver_price_pounds_after_discount_including_insurance);
        const discount = priceArray.discount_pounds;
        const previousRate = rate + discount;
        return { rate, discount, previousRate };
    }
    
    return { rate: null, discount: null, previousRate: null };
};

// Returns the most optimal image to display from an array of images
export const getCarImg = (images) => {
    // Returns the first item that contains the words 'Exterior', 'Front' and 'right' in its description (if found)
    const imgExteriorFrontRight = images.find(img => { return img.description.includes('Exterior') && img.description.includes('Front') && img.description.includes('right')});
    if (imgExteriorFrontRight) return imgExteriorFrontRight.small_image_url;
    
    // Returns the first item that contains the words 'Exterior' and 'Front' in its description (if found)
    const imgExteriorFront = images.find(img => { return img.description.includes('Exterior') && img.description.includes('Front')});
    if (imgExteriorFront) return imgExteriorFront.small_image_url;
    
    // Returns the first item that contains the words 'Exterior' in its description (if found)
    const imgExterior = images.find(img => { return img.description.includes('Exterior')});
    if (imgExterior) return imgExterior.small_image_url;
    
    // Default: returns the first item
    return images[0].small_image_url;
};
