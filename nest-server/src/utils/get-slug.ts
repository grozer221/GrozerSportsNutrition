export const getSlug = (str: string): string => {
    str = str.replace(/^\s+|\s+$/g, '');
    str = str.toLowerCase();

    str = str.replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    return str;
};
