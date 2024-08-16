import React, { useState, useRef } from 'react';
import './post.css'; 

const Post = () => {
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null); 
    const [successMessage, setSuccessMessage] = useState(''); 

    const userid = localStorage.getItem('userId') || '';
    const fileInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('userid', userid);
        formData.append('comment', comment);
        if (image) { 
            formData.append('image', image);
        }

        try {
            const response = await fetch('http://localhost:5000/api/posts/create', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                setSuccessMessage('Post created successfully!');
                
                setComment('');
                setImage(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''; 
                }
            } else {
                setSuccessMessage('Failed to create post.');
            }
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
            setSuccessMessage('An error occurred. Please try again.'); 
        }
    };

    return (
        <div>
            <form className="post-form" onSubmit={handleSubmit}>
                <textarea 
                    placeholder="Comment" 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                />
                <input 
                    type="file"
                    accept="image/*" 
                    onChange={(e) => setImage(e.target.files[0])} 
                    ref={fileInputRef} 
                />
                <button type="submit">Create Post</button>
            </form>
            {successMessage && <p>{successMessage}</p>} 
        </div>
    );
};

export default Post;
