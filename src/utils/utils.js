export const formatTime = (seconds) => {
    const minute = Math.floor(seconds / 60);
    const second = (seconds - minute * 60).toFixed(0).padStart(2, "0");
    return `${minute}:${second}`;
}