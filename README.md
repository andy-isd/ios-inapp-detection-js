# iOS In-App Browser Detection (for Add to Home Screen)

## Abstract

On iOS, **"Add to Home Screen" only works reliably in Safari** (some third-party browsers expose it, but usage is minimal).

If your user opens the site from:
- Telegram
- Instagram
- TikTok

→ "Add to Home Screen" simply does not work.

This repo helps you detect that.

## Goal of 2026 update

This is NOT about detecting apps. This is about answering one question:

> Can we safely show "Add to Home Screen" instructions?

The result is simple:

- Safari → show install instructions
- Everything else → ask user to open in Safari

## Quick usage example
```
const browser = iOSBrowser();
if(browser !== null) {
    if(browser == "Safari") {
        // show Add to Home Screen instructions
        showInstallInstructions();
    }
    else {
        // show Open in Safari instruction: additionally you can show different instructions according to `browser` value
        showOpenInSafari();
    }
}
else {
    // do nothing or check for Android: we're not on iOS / iPadOS
}
```

## Demo and full description
- https://andy.isd-group.com/inapp.php

## Detection JavaScript code
```
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
```

## Appendix: Browsers & In-App screen heights for iPhone 15 Pro (screen.height = 852)

A detailed breakdown of the current detection strategy.

Edge cases handled:
- Telegram mimics Safari UA
- Viber strips User-Agent
- TikTok / Instagram inject custom UA
- Some browsers expose A2HS via share sheet (marked with *)

| App           | Type    | Component              | UA Signature | Height | Height/852 |
|---------------| ------- | ---------------------- | ------------ | ------ | ---------- |
| Safari        | Browser |                        | —            | 695    | 0.816      |
| Brave         | Browser |                        | Brave/-      | 655    | 0.769      |
| Chrome*       | Browser |                        | CriOS        | 664    | 0.779      |
| Firefox Focus | Browser |                        | FxiOS        | 659    | 0.773      |
| Opera*        | Browser | SFSafariViewController | OPT          | 663    | 0.778      |
| Firefox*      | Browser | SFSafariViewController | FxiOS        | 651    | 0.764      |
| Edge          | Browser | SFSafariViewController | EdgiOS       | 655    | 0.769      |
| ------------- | ------- | ---------------------- | ------------ | ------ | ---------- |
| Slack         | In-App  | SFSafariViewController | —            | 657    | 0.771      |
| Discord       | In-App  | SFSafariViewController | —            | 657    | 0.771      |
| Reddit        | In-App  | SFSafariViewController | —            | 608    | 0.713      |
| Telegram      | In-App  | WKWebView              | —            | 651    | 0.764      |
| Viber         | In-App  | WKWebView              | +/—          | 720    | 0.845      |
| X (Twitter)   | In-App  | WKWebView              | Twitter      | 720    | 0.845      |
| Instagram     | In-App  | WKWebView              | Instagram    | 658    | 0.772      |
| Threads       | In-App  | WKWebView              | Barcelona    | 627    | 0.736      |
| Facebook      | In-App  | WKWebView              | FBIOS        | 673    | 0.790      |
| Messenger     | In-App  | WKWebView              | FBIOS        | 655    | 0.769      |
| LinkedIn      | In-App  | WKWebView              | LinkedInApp  | 662    | 0.777      |
| TikTok        | In-App  | WKWebView              | musical_ly   | 715    | 0.839      |

