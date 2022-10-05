
export const toCamelCase = (str) => {
    const strToArry = str.split("")
    str = strToArry.map((s, i) => i === 0? s.toUpperCase() : s.toLowerCase()).join("");
    return str;
}
