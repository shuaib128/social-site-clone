import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';
import { ServerHost } from './ServerHost';
import { BackendHost } from '../Api/BackendHost';

const SettingsForms = (props) => {
    const history = useHistory()

    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [work, setWork] = useState('');
    const [education, setEducation] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() =>{
        setName(props.profileData.first_name)
        setEmail(props.userEmail)
        setUsername(props.username)
        setBio(props.profileData.description)
        setLocation(props.profileData.address)
        setWork(props.profileData.work)
        setEducation(props.profileData.education)
    }, [])


    //Set profile preview image
    const uploadImg = (e) => {
        setProfileImage({
            image: e.target.files[0]
        })

        var prevImgSec = document.querySelector('.settings_profile_img')
        const file = e.target.files[0]

        const reader = new FileReader()
        reader.addEventListener("load", function(){
            prevImgSec.src = this.result
        })
        reader.readAsDataURL(file)   
    }


    //Send edited data
    const sendSettingsData = (e) => {
        e.preventDefault();

        //store and send all data
        URL = `${BackendHost}/api/user/update_user/`
        const config = { headers: { 'Content-Type': 'multipart/form-data' }}
        let formData = new FormData();
        formData.append('username', username);
        formData.append('name', name);
        formData.append('bio', bio);
        formData.append('email', email);
        formData.append('work', work);
        formData.append('location', location);
        formData.append('education', education);
        formData.append('profileID', props.profileID);
        try {
            formData.append('profileImg', profileImage.image);
        } catch (error) {
            
        }

        //Send data with axios
        axios
            .post(URL, formData, config)
            .catch((err) => console.log(err));
        
        setRedirect(true);
            
    }
    if (redirect) {
        return <Redirect to="/dashbord"/>;
    }
    

    return (
        <div className="setting_forms">
            <form className="res_form user_setting_form" onSubmit={sendSettingsData}>
                <div className='user_setting'>
                    <h1 style={{margin: '0px'}}>User</h1>

                    <p className='lael'>Name</p>
                    <input type="text" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <p className='lael'>Email</p>
                    <input type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    /> 

                    <p className='lael'>Username</p>
                    <input type="text" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />

                    <p className='lael'>Profile Image</p> 
                    <div className='settings_profile_check'>
                        <img className='settings_profile_img' 
                            src={ServerHost + props.profileData.image} 
                        />        
                        <input style={{border: '0px'}} 
                            type="file" 
                            accept="image/*"
                            onChange={uploadImg}
                        />
                    </div>
                </div>

                <div style={{marginTop: '50px'}} className='user_setting'>
                    <h1 style={{margin: '0px'}}>Basic</h1>

                    <p className='lael'>Bio</p>
                    <textarea type="text" 
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                    />

                    <p className='lael'>Location</p>
                    <input type="text" 
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                    />

                    <p className='lael'>Work</p>
                    <input type="text" 
                        value={work}
                        onChange={e => setWork(e.target.value)}
                    />

                    <p className='lael'>Education</p>
                    <input type="text" 
                        value={education}
                        onChange={e => setEducation(e.target.value)}
                    />
                </div>

                <button className='settings_submit edit_'>Save</button>
            </form>
        </div>
    )
}

export default SettingsForms
