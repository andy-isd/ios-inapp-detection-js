# ios-inapp-detection-js
This script detects if your webpage was opened in iOS Safari or In-App utilizing screen.height and window.innerHeight properties.

# The problem
There's no method to detect whether your webpage is opened in Safari or in iOS internal browser (In-App aka WebView).
Ofcourse, you can detect Instagram or Facebook WebViews because they clearly change userAgent string. But, for example, Telegram
or Slack doesn't.

# The solution
Implement detection algorithm based on checking window.innerHeight property, that actually represents
    the vertical height in pixels available to you webapp. This height is slightly greater for In-App compared to Safari (approx. 6 to 9 px).
    It also depends on device height, i.e. iPhone model. Knowing the heights of all models we can solve the task. 

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
