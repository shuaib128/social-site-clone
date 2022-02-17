import React from 'react'

const PostEditTutorial = () => {
    return (
        <div className="post_input_tutorial">
            <div className="side_post_tutorial title_tutorial">
                <h1>Writing a Great Post Title</h1>
                <p>
                    Think of your post title as a super short (but compelling!) description — like an overview of the actual post in one short sentence.
                    Use keywords where appropriate to help ensure people can find your post by search.
                </p>
            </div>

            <div className="side_post_tutorial des_tutorial">
                <h1>Editor Basics</h1>
                <p>
                    You can use Liquid tags to add rich content such as Tweets, YouTube videos, etc.
                    In addition to images for the post's content, you can also drag and drop a cover image
                </p>
            </div>
        </div>
    )
}

export default PostEditTutorial
