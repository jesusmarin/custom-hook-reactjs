import { useState, useEffect, useRef } from "react"


export const useFetch = (url) => {
    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: false, error: null });

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [isMounted])

    useEffect(() => {

        setState({ data: null, loading: false, error: null });

        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                if(isMounted.current){
                    setState({
                        data,
                        loading: true,
                        error: null
                    });
                }
            });
    }, [url]);

    return state;
}
