import { useState, useEffect } from "react";
import {Link } from 'react-router-dom'
import classes from './search.module.css'
export default function Search() {

    const [search, setSearch] = useState([])
    const [users, setUsers] = useState([]);
    const [openSearchBox, setOpenSearchBar] = useState(false)
    let searchValues = [];

    const searchUsers = (e) => {
            searchValues = users.filter(user => {
                if(user.full_name.toLowerCase().includes(e.target.value.toLowerCase()) || user.username.toLowerCase().includes(e.target.value.toLowerCase()) )
                return true
            })
            setSearch(searchValues)
            if(search && e.target.value) {
                setOpenSearchBar(true)
            }else {
                setOpenSearchBar(false)
            }
    }

    
    
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, []);
    
    return (
        <div>
            <label>Search</label>
            <input 
                // onClick={toggleSearch}
                onChange={searchUsers}
                type='text'
                placeholder="Search"
            />
            {openSearchBox && (
                <div className={classes.searchContainer}> 
                    {search && search.map(user => (
                    <Link to={`/users/${user.id}`} key={user.id}>
                        <div className={classes.userContainer} key={user.id}>
                            <div className={classes.searchUserImg}> 
                                <img src={user.profile_pic} alt='user' />
                            </div>
                            <div className={classes.userNames}>
                                    <p classeName={classes.username}>{user.username}</p>
                                <p classeName={classes.fullName}>{user.full_name}</p>
                            </div>
                        </div>
                    </Link>
                    ))}
                </div>
            )}
            <div>
                testing
            </div>
        </div>
    )
}