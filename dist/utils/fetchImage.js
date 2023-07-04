import { readFileSync, writeFileSync } from 'fs';
/**
 * Fetch the data of an image as a buffer
 * @param sourceFile The file system path of the source image
 * @param fileName The name to save the buffer under in the coupon model folder (eg: icon@3x)
 * @returns A buffer containing the image data
 */
export default async function (sourceFile, fileName) {
    try {
        // Load image data
        const data = readFileSync(sourceFile);
        // Check if no data was fetched
        if (!data)
            return {
                error: true,
                errorData: null
            };
        // Save image to pass model folder
        writeFileSync(`./src/template.pass/${fileName}`, data);
        return {
            error: false
        };
    }
    catch (error) {
        return {
            error: true,
            errorData: error
        };
    }
}
