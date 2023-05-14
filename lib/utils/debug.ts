type Level = "NONE" | "LOW" | "HIGH"
export default function DEBUG_PRINT(level: Level, message?: any, ...optionalParams: any[] ) {

    if (level == process.env.NEXT_PUBLIC_DEBUG) {
        console.log(message, ...optionalParams)
    } 
}