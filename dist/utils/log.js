// Modules
import chalk from 'chalk';
/**
 * A group of functions to create themed log messages
 */
export default {
    /**
     * Displays an info message in cyan (eg: [Info] Test)
     * @param message The message to display
     * @param prefix The log type prefix (Optional)
     * @returns The themed string
     */
    info: (message, prefix) => chalk.cyan(`[${prefix ? prefix : 'Info'}] ${message}`),
    /**
     * Displays a success message in green (eg: [Success] Test)
     * @param message The message to display
     * @param prefix The log type prefix (Optional)
     * @returns The themed string
     */
    success: (message, prefix) => chalk.green(`[${prefix ? prefix : 'Success'}] ${message}`),
    /**
     * Displays an error message in red (eg: [Error] Test)
     * @param message The message to display
     * @param prefix The log type prefix (Optional)
     * @returns The themed string
     */
    error: (message, prefix) => chalk.red(`[${prefix ? prefix : 'Error'}] ${message}`),
    /**
     * Displays a warn message in yellow (eg: [Warn] Test)
     * @param message The message to display
     * @param prefix The log type prefix (Optional)
     * @returns The themed string
     */
    warn: (message, prefix) => chalk.yellow(`[${prefix ? prefix : 'Warn'}] ${message}`)
};
