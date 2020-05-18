export default async (
    time: number,
) => new Promise((resolve) => {
    setTimeout(() => resolve(true), time);
});
