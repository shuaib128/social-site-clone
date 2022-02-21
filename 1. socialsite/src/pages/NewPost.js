import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import ReqToMakeAnaccount from '../components/ReqToMakeAnaccount';
import PostEditTutorial from '../PostEditTutorial';
import { BackendHost } from '../Api/BackendHost';

const NewPost = (props) => {
    //Post fields state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [postimage, setPostimage] = useState(null);
    const [coverimage, setCoverimage] = useState(null);
    const Author = props.username
    const Profile = props.profileID
    const history = useHistory();


    if (props.username !== undefined) {
        //Submit new post
        const NewPost = async (e) => {
            e.preventDefault();

            //store and send all data
            URL = `${BackendHost}/api/posts/new_post/`
            const config = { headers: { 'Content-Type': 'multipart/form-data' } }
            let formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('Author', Author);
            formData.append('Profile', Profile);
            try {
                formData.append('coverImg', coverimage.image);
            } catch
            {
                console.log('lp');
            }
            try {
                for (const img in postimage.image) {
                    formData.append(`img${img}`, postimage.image[img]);
                }
            } catch
            {
                console.log(1);
            }

            //Send data with axios
            axios
                .post(URL, formData, config)
                .catch((err) => console.log(err));
            history.push("/")
        }


        //Handle image state upload
        const uploadIMG = (e) => {
            setPostimage({
                image: e.target.files,
            });

            var prevImgSec = document.querySelector('.prev_imgs')
            const file = e.target.files

            //get file images and show them in the prev_imgs section
            for (const img in file) {
                const reader = new FileReader()
                if (img !== 'length' && img !== 'item') {
                    reader.addEventListener("load", function () {
                        prevImgSec.innerHTML += `
                            <img className="upload_prv_img" src=${this.result} />
                        `
                    })
                    reader.readAsDataURL(file[img])
                }
            }
        }

        const uploadCover = (e) => {
            setCoverimage({
                image: e.target.files[0],
            })

            var prevImgSec = document.querySelector('.cover_image_preview')
            const file = e.target.files[0]

            const reader = new FileReader()
            reader.addEventListener("load", function () {
                prevImgSec.innerHTML += `
                    <img className="upload_prv_img" src=${this.result} />
                `
            })
            reader.readAsDataURL(file)
        }

        const showTitleTutorial = (e) => {
            if (e.target.className === 'title_input') {
                document.querySelector('.title_tutorial').style.display = 'block'
                document.querySelector('.des_tutorial').style.display = 'none'
            }

            if (e.target.className === 'title_descrip') {
                document.querySelector('.title_tutorial').style.display = 'none'
                document.querySelector('.des_tutorial').style.display = 'block'
            }
        }

        return (
            <div className="full_register posts_arcade">
                <div className="full_edit_sec">
                    <form className='res_form' onSubmit={NewPost}>
                        <div className="input_div_cover">
                            <p>Add a cover Image</p>
                            <input type="file" className='cover_image_btn'
                                accept="image/*"
                                onChange={uploadCover}
                            />
                            <div className='cover_image_preview'>

                            </div>
                        </div>

                        <input type="text" required
                            className='title_input'
                            placeholder='New post title here..'
                            onChange={e => setTitle(e.target.value)}
                            onClick={showTitleTutorial}
                        />

                        <textarea type="email" required
                            className='title_descrip'
                            placeholder='Write post content here..'
                            onChange={e => setDescription(e.target.value)}
                            onClick={showTitleTutorial}
                        />

                        <div className="input_div_cover inputs_div_cover">
                            <p style={{ textAlign: 'left', marginLeft: '20px', paddingBottom: '5px' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><title id="a17qec5pfhrwzk9w4kg0tp62v27qqu9t">Upload image</title><path d="M20 5H4v14l9.292-9.294a1 1 0 011.414 0L20 15.01V5zM2 3.993A1 1 0 012.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 01-.992.993H2.992A.993.993 0 012 20.007V3.993zM8 11a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                                Add more images
                            </p>
                            <input type="file" accept="image/*" multiple
                                className='cover_image_btn cover_images_btn'
                                onChange={uploadIMG}
                            />
                        </div>

                        <div className='prev_imgs'></div>
                        <button className='re_btn post_btn' type="submit">Post</button>
                    </form>

                    <PostEditTutorial />
                </div>
            </div>
        )
    } else {
        return (
            <ReqToMakeAnaccount />
        )
    }
}

export default NewPost
