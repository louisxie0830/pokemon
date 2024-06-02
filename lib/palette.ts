import { prominent } from "color.js";
import tinycolor from 'tinycolor2';


const processColor = (promColor: string) => {
    return tinycolor(promColor[1]).isLight()
        ? promColor[2]
        : promColor[1];
};

export const getPalette = async (data: any) => {
    const promColor = await prominent(data, { amount: 3, group: 30, format: 'hex' }) as string;

    return processColor(promColor);
};