import { useEffect, useState } from "react";



export default function useFetchData(callback, ...arg) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // const wrappedCallback = useCallback(callback, [arg]);
    // useEffect(() => {
    //     const controller = new AbortController();
    //     (async () => {
    //         try {
    //             setIsLoading(true);
    //             if (userSession) {
    //                 const [result, myInfo] = await Promise.all([
    //                     callback(...arg, controller.signal),
    //                     userService.retrieveUser(controller.signal),
    //                 ])
    //                 setData(result);
    //                 setMe(myInfo)
    //             }
    //             else {
    //                 const result = await callback(...arg, controller.signal)
    //                 setData(result);

    //             }
    //         } catch (error) {
    //             //TODO: errror hanlder
    //             console.log(error);

    //         }
    //         finally {
    //             setIsLoading(false)
    //         }
    //     })()
    //     return () => controller.abort();
    // }, [callback, JSON.stringify(arg)]);

    useEffect(() => {
        const controller = new AbortController();
        (async () => {
            try {
                setIsLoading(true);
                const result = await callback(...arg, controller.signal)
                setData(result);
            } catch (error) {
                console.log(error);

            } finally {
                setIsLoading(false);
            }

            return () => controller.abort();
        })()


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return [data, isLoading]
}