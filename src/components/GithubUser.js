import React, { useState } from 'react';
import {ReactComponent as Office} from './office.svg';
import {ReactComponent as Link} from './link.svg';
import {ReactComponent as Twitter} from './twitter.svg';
import {ReactComponent as Location} from './location-pin.svg';

import { useFetch } from './useFetch';

const GithubUser = () => {
	return (
		<>
			<section className='githubUser'>
				<Navbar />
				<SearchBar />
			</section>
		</>
	);
};

const Navbar = () => {
	return (
		<>
			<nav>
				<h2>devfinder</h2>
			</nav>
		</>
	);
};

const SearchBar = () => {
	const [url,setUrl] = useState('https://api.github.com/users/Ziinyx');
	const [user,setUser] = useState('');
	const {loading, info} = useFetch(url);
	
	const handleSubmit = (e) => {
		e.preventDefault();
		//this doesn't change url to empty string
		if(user) {
			setUrl('');
			setUrl('https://api.github.com/users/'  + user);
		}
	};
	
	
	return (
		<>
			<section className='github'>
			<form className='searchBar' onSubmit={handleSubmit}>
				<input 
					type='text'  
					id='user' 
					name='user' 
					placeholder='SearchGitHub user name...'
					value={user}
					onChange={(e) => setUser(e.target.value)}
				/>
				<button type='submit' className='search'>Search</button>
			</form>
			
			
			
			{!loading ? (
			<article className='user'>
				
				
				<div className='profileContainer'>
				<img src={info.avatar_url} alt={info.name}/>
				<div className='userProfile'>
					<h2>{info.name}</h2>
					<h3>@{info.login}</h3>
					<p>Joined {info.created_at.slice(0,10)}</p>
				</div>
				</div>
				{(info.bio)? (<p>{info.bio}</p>) : (<p>This user doesn't have bio</p>)}
				<div className='userMetrics'>
					<div>
						<p>Repos</p>
						<h3>{info.public_repos}</h3>
					</div>
					<div>
						<p>Followers</p>
						<h3>{info.followers}</h3>
					</div>
					<div>
						<p>Following</p>
						<h3>{info.following}</h3>
					</div>
				</div>
				
				<div className='userReach'>
					<div>
					<Location className='img'/>{info.location? (<p><a href=''>{info.location}</a></p>) : (<p>Not Given</p>)} 
					</div>
					<div>
					<Link className='img' />{info.blog? (<p><a href={info.blog}>{info.blog}</a></p>) : (<p>No Blog</p>)} 
					</div>
					<div>
					<Twitter className='img' />{(info.twitter)? (<p><a href={info.twitter}>{info.twitter}</a></p>) : (<p>Twitter not available</p>)}
					</div>
					<div>
					<Office className='img' /><p><a href={info.url}>@github</a></p>
					</div>
				</div>
			</article>
			):(
			<h2>Loading</h2>
			)}
			</section>
		</>
	);
	
};

export default GithubUser;