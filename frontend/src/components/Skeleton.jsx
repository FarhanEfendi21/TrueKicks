export default function Skeleton({ className = "", height, width, rounded = "rounded-3xl" }) {
    const style = {};
    if (height) style.height = height;
    if (width) style.width = width;

    return (
        <div
            className={`bg-gray-200 dark:bg-gray-800 animate-pulse ${rounded} ${className}`}
            style={style}
        ></div>
    );
}
