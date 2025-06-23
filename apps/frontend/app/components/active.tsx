export const Active = () => {
    return (
        <div className="inline-flex items-center gap-2">
            <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className="text-sm font-medium text-green-600">Active</span>
        </div>
    )
}