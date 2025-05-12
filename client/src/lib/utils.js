export const snakeToCamel = (str) => {
    return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
};

export const convertObjectKeys = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(convertObjectKeys);
    }
    if (obj !== null && typeof obj === 'object') {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                snakeToCamel(key),
                convertObjectKeys(value)
            ])
        );
    }
    return obj;
}; 