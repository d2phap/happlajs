
/**
 * Pauses the thread for a period
 * @param time Duration to pause in millisecond
 * @param data Data to return after resuming
 * @returns a promise
 */
export const pause = <T>(time: number, data?: T): Promise<T> => new Promise((resolve) => {
  setTimeout(() => resolve(data as T), time);
});
