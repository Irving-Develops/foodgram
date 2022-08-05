import {useEffect, useState} from 'react'

function PostUser({post}) {
    const [users, setUsers] = useState([])
    const poster = users.find(user=> user.id === post.user_id)
    console.log("poster", poster)
    useEffect(() => {
        async function fetchData() {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
        }
        fetchData();
    }, []);


    return (
        <div id="username">
        </div>
    )

}
    
    export default PostUser