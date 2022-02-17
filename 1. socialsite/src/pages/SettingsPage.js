import React from 'react'
import SettingPageBtnNavs from '../components/SettingPageBtnNavs'
import SettingsForms from '../components/SettingsForms'

const SettingsPage = (props) => {
    return (
        <div className='posts_arcade'>
            <div className='settings_main'>
                <h1 className='settigs_h1'>Settings for <span style={{color: '#3b49df'}}>@{props.username}</span></h1>


                <div className="setting_btns_form">
                    <SettingPageBtnNavs />
                    <SettingsForms profileData={props.profileData} profileID={props.profileID}
                        userEmail={props.userEmail} username={props.username}
                    />                    
                </div>
            </div>
        </div>
    )
}

export default SettingsPage
