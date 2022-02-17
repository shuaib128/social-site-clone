import { BackendHost } from "./BackendHost"

export default class APIService{
    // Getting all posts data
    static GetAllPosts(posts_state){
        fetch(`${BackendHost}/api/posts/`, {
            'method': 'GET',
            headers:{
                'Content-Type':'application/json',
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            posts_state(resp)
        })
        .catch(error => console.log(error))
    }
}