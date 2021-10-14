import { useState, useEffect} from 'react';

export const useFetch = (url) => {
	const [loading,setLoading] = useState(true);
	const [info,setInfo] = useState({login: '',});
	
	const getData = () => {
		fetch(url)
			.then((response)=> {
				console.log(url);
				const data = response.json();
				console.log(data)
				return data;
			})
			.then((info)=> {
				console.log(info);
				setInfo(info);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			})
	}
	
	useEffect(() => {
		getData();
	}, [url]);

	return {loading, info};
}; 