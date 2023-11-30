export function makeBadgeSize(size: string) {
    // 사이즈
    let textSize;
    let px;
    let py;
    switch (size) {
        case 'xs':
            textSize = 'text-xs mobile:text-[9px]';
            px = 'px-2 mobile:px-1';
            py = 'py-0.5 mobile:py-0';
            break;
        case 'sm':
            textSize = 'tablet:text-sm mobile:text-xs';
            px = 'px-2';
            py = 'py-1';
            break;
        case 'md':
            textSize = 'tablet:text-lg mobile:text-md';
            px = 'tablet:px-8 mobile:px-4';
            py = 'tablet:py-4 mobile:py-2';
            break;
        case 'lg':
            textSize = 'text-lg';
            px = 'px-8';
            py = 'py-4';
            break;
        default:
            textSize = 'tablet:text-md mobile:text-sm';
            px = 'px-4';
            py = 'tablet:py-2 mobile:py-1';
    }

    return {textSize, px, py};
}

export function makeBadgeColor(color: string) {
    let bgColor;
    let textColor;
    let ringColor;
    switch (color) {
        case 'red':
            bgColor = 'bg-red-50';
            textColor = 'text-red-700';
            ringColor = 'ring-red-600/10';
            break;
        case 'yellow':
            bgColor = 'bg-yellow-50';
            textColor = 'text-yellow-800';
            ringColor = 'ring-yellow-600/20';
            break;
        case 'green':
            bgColor = 'bg-green-50';
            textColor = 'text-green-700';
            ringColor = 'ring-green-600/20';
            break;
        case 'blue':
            bgColor = 'bg-blue-50';
            textColor = 'text-blue-700';
            ringColor = 'ring-blue-700/10';
            break;
        case 'purple':
            bgColor = 'bg-purple-50';
            textColor = 'text-purple-700';
            ringColor = 'ring-purple-700/10';
            break;
        default:
            // todo - error 던지기?
            bgColor = 'bg-red-50';
            textColor = 'text-red-700';
            ringColor = 'ring-red-600/10';
            break;
    }

    return {bgColor, textColor, ringColor};
}

export function makeImageSize(size: string) {
    let imageSize;
    switch (size) {
        case '2xs':
            imageSize = 'h-6 w-6';
            break;
        case 'xs':
            imageSize = 'h-10 w-10 mobile:h-8 mobile:w-8';
            break;
        case 'sm':
            imageSize = 'h-16 w-16 mobile:h-10 mobile:w-10';
            break;
        case 'md':
            imageSize = 'h-24 w-24 mobile:h-16 mobile:w-16';
            break;
        case 'lg':
            imageSize = 'h-40 w-40 mobile:h-32 mobile:w-32';
            break;
        default:
            imageSize = 'h-32 w-32';
    }

    return imageSize;
}

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
