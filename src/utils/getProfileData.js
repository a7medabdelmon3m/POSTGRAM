import axios from "axios";

export function handleGetProfile(){
    return axios.get('https://route-posts.routemisr.com/users/profile-data',{
      headers: { AUTHORIZATION: `Bearer ${localStorage.getItem("postGramTkn")}`},
    })
  }