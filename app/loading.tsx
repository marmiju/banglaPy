

export default function Loading() {
    return (
        <div className=" max-w-[1200px] mx-auto grid grid-cols-4 md:grid-cols-8 gap-2 p-6 bg-background text-foreground">
          
            <div className="h-32 animate-pulse rounded-full  bg-slate-600/40  col-span-2" />
            <div>
                <div className="h-32 animate-pulse rounded bg-slate-600/40  col-span-2" />
            <div className="h-32 animate-pulse rounded bg-slate-600/40  col-span-2" />
            </div>
            <div className="h-32 animate-pulse rounded bg-slate-600/40  col-span-2" />
        
        </div>
    )
}
