/*
    iOS Safari vs In-App detector
    (C) Copyright Andrew Sergeyev
    https://andy.isd-group.com/
    v2026 version (iOS 26 support)
*/
function iOSBrowser() {
    let ua = navigator.userAgent;
    if(!!ua.match(/iPhone|iPad/i)) {
        if(typeof window !== 'undefined' && (!!window.Telegram || !!window.TelegramWebviewProxy)) return "In-App"; // 2026 update: telegram in-app detection support
        if (ua.match(/chrome|chromium|crios/i)) return "Chrome";
        else if (ua.match(/firefox|fxios/i)) return "Firefox";
        else if (ua.match(/opera|opt/i)) return "Opera";
        else if (ua.match(/edge|edgios/i)) return "Edge";
        else if (ua.match(/brave/i)) return "Brave";
        else if (ua.match(/instagram/i)) return "Instagram";
        else if (ua.match(/barcelona/i)) return "Threads";
        else if (ua.match(/facebook|fbios/i)) return "Facebook";
        else if (ua.match(/linkedin/i)) return "LinkedIn";
        else if (ua.match(/twitter/i)) return "X";
        else if (ua.match(/musical/i)) return "TikTok";
        else if (!ua.match(/version/i) && !ua.match(/mobile/i) && !ua.match(/safari/i) && ua.endsWith('(KHTML, like Gecko)')) return "Viber";
        else if (ua.match(/safari/i) && ua.match(/version/i) && ua.match(/mobile/i) && (window.innerHeight / screen.height > 0.79)) return "Safari";
        else
            return "In-App";
    }
    return null;
}
