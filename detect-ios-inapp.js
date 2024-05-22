function detect_inapp() {
    const inapp_data = {"932":[746],"852":[666],"926":[752],"844":[670],"812":[635,641],"667":[559],"896":[725,721],"736":[628],"568":[460]};
    const is_ios_supported = !!navigator.userAgent.match(/iPhone OS 15_|iPhone OS 16_|iPhone OS 17_/i);
    const is_ios17 = !!navigator.userAgent.match(/iOS 17/i);
    const is_safari = !!navigator.userAgent.match(/Safari/i) && !!navigator.userAgent.match(/Mobile/i) && !!navigator.userAgent.match(/Version/i);
    const screen_h = screen.height;
    const window_h = window.innerHeight;
    if(is_ios_supported && is_safari && inapp_data[screen_h].length) {
        if(screen_h == 812 && window_h == 635) return is_ios17; // ambiguity case
        return inapp_data[screen_h].indexOf(window_h) !== -1;
    }
    return null;
}
