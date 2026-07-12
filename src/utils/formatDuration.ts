export function formatDuration(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds / 60) % 60;
    const s = seconds % 60;

    return h > 0
        ? [h, m, s].map((v) => v.toString().padStart(2, "0")).join(":")
        : [m, s].map((v) => v.toString().padStart(2, "0")).join(":");
}
