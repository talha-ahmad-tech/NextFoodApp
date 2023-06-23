import { useEffect, useRef } from "react"


const useEffectAfterMount = (callback: Function, dependecy: any[]) => { 
    let isFirstCall = useRef(true);
    useEffect(() => {
        if(!isFirstCall.current) {
            callback();
        }
        isFirstCall.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependecy])
}

export default useEffectAfterMount;