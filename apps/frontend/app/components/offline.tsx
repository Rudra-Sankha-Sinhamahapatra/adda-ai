export const Offline = () => {
    return (
        <div className="inline-flex items-center gap-2">
            <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </div>
            <span className="text-sm font-medium text-red-600">Offline</span>
        </div>
    )
}