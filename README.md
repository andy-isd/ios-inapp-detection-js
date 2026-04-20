# ios-inapp-detection-js

# Abstract
This script detects if your webpage was opened in iOS Safari or In-App Browser utilizing user agent string and screen.height and window.innerHeight properties as reliable fallback. Esp. useful for PWA to decide when to show `Add to Home Screen` instructions.

# 2026 script update

The goal of this JavaScript is not to detect is it safe to show the “Add to Home Screen” (A2HS) instruction (which is crucial for PWA).

The detection logic combines multiple signals:

- User-Agent signatures (when available)
- Viewport behavior (to distinguish Safari from WebView environments)
- Runtime signals (e.g. Telegram WebApp detection)
- Known edge-cases (such as stripped or modified User-Agent strings)

This allows the script to reliably answer a single question:

Can this environment successfully install the app via Add to Home Screen?

Instead of maintaining a growing list of apps and exceptions, the logic now reduces everything to two practical states:

1. Safari (installable) → show A2HS instructions
2. Non-Safari / WebView (not installable) → prompt user to open in Safari

A detailed breakdown of the current detection strategy — including the exact heuristics and edge-case handling — is provided below.

| App           | Type    | Component              | UA Signature | Height | Height/852 |
| ------------- | ------- | ---------------------- | ------------ | ------ | ---------- |
| Safari        | Browser |                        | —            | 695    | 0.816      |
| Brave         | Browser |                        | Brave/-      | 655    | 0.769      |
| Chrome        | Browser |                        | CriOS        | 664    | 0.779      |
| Firefox Focus | Browser |                        | FxiOS        | 659    | 0.773      |
| Opera         | Browser | SFSafariViewController | OPT          | 663    | 0.778      |
| Firefox       | Browser | SFSafariViewController | FxiOS        | 651    | 0.764      |
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

# Demo and full description
- https://andy.isd-group.com/inapp.php

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
