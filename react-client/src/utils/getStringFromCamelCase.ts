export const getStringFromCamelCase = (inputString: string): string => {
    const words = inputString.match(/[A-Za-z][a-z]*/g) || [];
    return words.map(localeLowerCase).join(' ');
};

const localeLowerCase = (word: string): string => {
    return word.charAt(0).toLocaleLowerCase() + word.substring(1);
};
