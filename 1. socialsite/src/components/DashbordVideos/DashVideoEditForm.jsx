import React,{ useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import {Redirect} from "react-router-dom";
import PostEditTutorial from '../../PostEditTutorial';
import { BackendHost } from '../../Api/BackendHost';
import ReqToMakeAnaccount from '../ReqToMakeAnaccount';
import {useHistory } from "react-router-dom";

const EditForm = (props) => {
    //Post fields states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [postimage, setPostimage] = useState(null);
    const Author = props.username
    const Profile = props.profileID
    const [coverimage, setCoverimage] = useState();
    const history = useHistory();

    //Get perametar and fetch post data
    const { id } = useParams()
    const [post, setPost] = useState(() => {
        axios.get(`${BackendHost}/api/videos/${id}/`)
        .then(res => {
            setPost(res.data)

            setTitle(res.data.title)
            setDescription(res.data.description)
        })
    });
    if (!post) return "Loading...";
    if (!post) return "Error!";


    if(props.username !== undefined){
        //Submit new post
        const NewPost = async (e) => {
            e.preventDefault();

            //store and send all data
            URL = `${BackendHost}/api/videos/update_video/${id}/`
            const config = { headers: { 'Content-Type': 'multipart/form-data' }}
            let formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('Author', Author);
            formData.append('Profile', Profile);
            try
            {
                formData.append('coverImg', coverimage.image);
            }catch
            {
                console.log('lp');
            }
            try
            {
                formData.append('coverVideo', postimage.image);
            }catch
            {
                console.log('lp');
            }

            //Send data with axios
            axios
            	.post(URL, formData, config)
            	.catch((err) => console.log(err));
            history.push("/videos")
        }


        //Handle image state upload
        const uploadIMG = (e) => {
            setPostimage({
				image: e.target.files[0],
			});

            var prevImgSec = document.querySelector('.prev_imgs')
            const file = e.target.files
            
            //get file images and show them in the prev_imgs section
            const reader = new FileReader()
            console.log(reader);
            reader.addEventListener("load", function(){
                prevImgSec.innerHTML += `
                    <video 
                        controls 
                        controlsList="nodownload"
                    >
                        <source src=${this.result} type="video/mp4"/>
                    </video>
                `
            })
            reader.readAsDataURL(file[0])
        }

        const uploadCover = (e) => {
            setCoverimage({
				image: e.target.files[0],
			});
        }

        const showTitleTutorial = (e) => {
            if(e.target.className === 'title_input'){
                document.querySelector('.title_tutorial').style.display = 'block'
                document.querySelector('.des_tutorial').style.display = 'none'
            }

            if(e.target.className === 'title_descrip'){
                document.querySelector('.title_tutorial').style.display = 'none'
                document.querySelector('.des_tutorial').style.display = 'block'
            }
        }
        

        return (
            <div className="full_register posts_arcade">
                <div className="full_edit_sec">
                    <form className='res_form' onSubmit={NewPost}>
                        <div className="input_div_cover input_div_cover_video">
                            <p>Add a thumbnail Image</p>
                            <input type="file" className='cover_image_btn' 
                                accept="image/*"
                                onChange={uploadCover} 
                            />
                        </div>

                        <input type="text" required className='title_ title_input'
                            className='title_input'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            onClick={showTitleTutorial}
                        />

                        <textarea type="email"
                            className='title_descrip'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            onClick={showTitleTutorial}
                        />

                        <div className="input_div_cover inputs_div_cover">
                            <p style={{textAlign: 'left', marginLeft: '20px', paddingBottom: '5px'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                            </svg>
                                Add Video
                            </p>
                            <input type="file" accept="video/mp4,video/x-m4v,video/*"
                                className='cover_image_btn cover_images_btn' 
                                onChange={uploadIMG}
                            />
                        </div>

                        <div className='prev_imgs'>
                            <video 
                                controls 
                                controlsList="nodownload"
                            >
                                <source src={post.video} type="video/mp4"/>
                            </video>
                        </div>
                        <button className='re_btn post_btn' type="submit">Save</button>
                    </form>

                    <PostEditTutorial />
                </div>
            </div>
        )
    }else{
        return(
            <ReqToMakeAnaccount />
        )
    }
}

export default EditForm
