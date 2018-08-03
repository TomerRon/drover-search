// Capitalizes all words in a string
export const capitalize = (str) => {
    return str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
};

// Turns snake_case to Capitalized. air_conditioning => Air Conditioning
export const snakeCaseToCapitalize = (str) => {
    return capitalize(str.split('_').join(' '));
};
