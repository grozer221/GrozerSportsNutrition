export const getStringFromCamelCase = (inputString: string): string => {
    const words = inputString.match(/[A-Za-z][a-z]*/g) || [];
    return words.map(localeLowerCase).join(' ');
};

const localeLowerCase = (word: string): string => {
    return word.charAt(0).toLocaleLowerCase() + word.substring(1);
};


export const getStringFromDate = (inputString: string): string => {
    const dateAndTime = inputString.split('T');
    return `${dateAndTime[0]} ${dateAndTime[1].substring(0, dateAndTime[1].length - 5)}`;
};

export const getStringDateFromDate = (inputString: string): string => {
    const dateAndTime = inputString.split('T');
    return `${dateAndTime[0]}`;
};
