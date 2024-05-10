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
function detect_inapp() {
    const inapp_data = {"932":[746],"852":[666],"926":[752],"844":[670],"812":[635,641],"667":[559],"896":[725,721],"736":[628],"568":[460]};
    const is_ios_supported = !!navigator.userAgent.match(/iPhone OS 15_|iPhone OS 16_|iPhone OS 17_/i);
    const is_ios17 = !!navigator.userAgent.match(/iOS 17/i);
    const is_safari = !!navigator.userAgent.match(/Safari/i) && !!navigator.userAgent.match(/Mobile/i) && !!navigator.userAgent.match(/Version/i);
    const screen_h = screen.height;
    const window_h = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    if(is_ios_supported && is_safari && inapp_data[screen_h].length) {
        if(screen_h == 812 && window_h == 635) return is_ios17; // ambiguity case
        return inapp_data[screen_h].indexOf(window_h) !== -1;
    }
    return null;
}
```
