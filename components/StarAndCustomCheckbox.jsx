import style from '../styles/StarAndCustomCheckbox.module.css'

export function CustomCheckbox({ isActive, onClickFunction, size }) {
    return (
        <svg
            style={{ height: size || "50px", aspectRatio: 1 }}
            viewBox="0 0 60 60"
            fill=""
            xmlns="http://www.w3.org/2000/svg"
            className={style.svg}
            onClick={() => onClickFunction()}
        >
            <g id="checkbox">
                <rect id="Rectangle 1" x="5.5" y="16.5" width="32" height="32" rx="8.5"  fill="" stroke="hsl(300 68% 44%)" strokeWidth="3" />
                <g id={style.tick} className={isActive ? style.check : style.uncheck}>
                    <rect id="Rectangle 2" x="19.7995" y="37.15" width="42.2331" height="7" transform="rotate(-40 19.7995 39.5174)" fill="hsl(300 68% 44%)" />
                    <rect id="Rectangle 3" x="10" y="25.67" width="7" height="22.0544" transform="rotate(-40 10 28.043)" fill="hsl(300 68% 44%)" />
                </g>
            </g>
        </svg>
    )
}

export default function Star({ isActive, onClickFunction, size }) {
    return (
        <svg
            style={{ height: size || '50px', width: size || '50px' }}
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => onClickFunction()}
            className={style.svg}
        >
            <g id="Frame 1">
                <path
                    className={isActive ? style.starShiny : style.starInitial}
                    id={style.star}
                    d="M61.885 18.2358L71.5042 41.3633C72.1523 42.9214 73.6175 43.9859 75.2996 44.1208L100.268 46.1225C101.598 46.2291 102.137 47.8888 101.124 48.7568L82.1006 65.0521C80.819 66.1499 80.2593 67.8724 80.6509 69.5138L86.4627 93.8784C86.7723 95.1762 85.3604 96.202 84.2218 95.5065L62.8456 82.45C61.4056 81.5704 59.5944 81.5704 58.1544 82.45L36.7782 95.5065C35.6396 96.202 34.2277 95.1762 34.5373 93.8784L40.3491 69.5138C40.7407 67.8724 40.181 66.1499 38.8994 65.0521L19.8764 48.7568C18.8631 47.8888 19.4024 46.2291 20.7324 46.1225L45.7004 44.1208C47.3825 43.9859 48.8477 42.9214 49.4958 41.3633L59.115 18.2358C59.6274 17.0039 61.3726 17.0039 61.885 18.2358Z"
                />
            </g>
        </svg>
    )
}


export function Arrow({ isActive, size }) {
    return (
        <svg style={{ height: size || "18px", rotate: isActive ? "0deg" : "180deg", transition: 'rotate 1s' }} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"  className={style.svg}>
            <g clipPath="url(#clip0_128_2)">
                <path d="M0.3562 11.0184L8.33509 3.25346C8.43008 3.16129 8.53298 3.09616 8.6438 3.05806C8.75462 3.01935 8.87335 3 9 3C9.12665 3 9.24538 3.01935 9.3562 3.05806C9.46702 3.09616 9.56992 3.16129 9.66491 3.25346L17.6675 11.0184C17.8892 11.2335 18 11.5023 18 11.8249C18 12.1475 17.8813 12.424 17.6438 12.6544C17.4063 12.8848 17.1293 13 16.8127 13C16.496 13 16.219 12.8848 15.9815 12.6544L9 5.88018L2.01847 12.6544C1.79683 12.8694 1.5239 12.977 1.19968 12.977C0.874828 12.977 0.593667 12.8618 0.3562 12.6313C0.118733 12.4009 -9.5417e-07 12.1321 -9.5417e-07 11.8249C-9.5417e-07 11.5177 0.118733 11.2488 0.3562 11.0184V11.0184Z" fill="#fff" />
            </g>
            <defs>
                <clipPath id="clip0_128_2">
                    <rect width="18" height="18" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}
