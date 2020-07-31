export function isTracerView() {
    return window.location.pathname.includes("admin");
}

export function isCardShare() {
    return window.location.href.includes("id") && window.location.href.includes("timestamp");
}