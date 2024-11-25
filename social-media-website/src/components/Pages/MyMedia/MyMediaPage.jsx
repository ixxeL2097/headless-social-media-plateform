import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyMediaPage.css';

const MyMediaPage = () => {
    const [mediaFiles, setMediaFiles] = useState([
        {
            id: 1,
            name: 'example-image.jpg',
            url: 'https://picsum.photos/200',
            type: 'image/jpeg',
            uploadDate: '2023-01-01T00:00:00Z',
            size: 1024,
        },
        {
            id: 2,
            name: 'example-video.mp4',
            url: 'https://www.w3schools.com/html/mov_bbb.mp4',
            type: 'video/mp4',
            uploadDate: '2023-01-02T00:00:00Z',
            size: 2048,
        },
    ]);
    const [newFile, setNewFile] = useState(null);

    useEffect(() => {
        fetchMediaFiles();
    }, []);

    const fetchMediaFiles = async () => {
        try {
            const response = await axios.get('/media');
            setMediaFiles(response.data);
        } catch (error) {
            console.error('Error fetching media files:', error);
        }
    };

    const handleDelete = async (mediaId) => {
        try {
            await axios.delete(`/media/${mediaId}`);
            fetchMediaFiles();
        } catch (error) {
            console.error('Error deleting media file:', error);
        }
    };

    const handleCopyUrl = (url) => {
        navigator.clipboard.writeText(url);
        alert('URL copied to clipboard');
    };

    const handleFileChange = (event) => {
        setNewFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!newFile) return;

        const formData = new FormData();
        formData.append('file', newFile);

        try {
            await axios.post('/media/upload', formData);
            fetchMediaFiles();
            setNewFile(null);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="my-media-page">
            <h1>Mes medias</h1>
            <div className="upload-section">
                <input type="file" onChange={handleFileChange} />
            </div>
            <div className="media-list">
                {mediaFiles.map((file) => (
                    <div key={file.id} className="media-item">
                        {file.type.startsWith('image') ? (
                            <img src={file.url} alt={file.name} className="media-thumbnail" />
                        ) : (
                            <video height="200" src={file.url} className="media-thumbnail" controls />
                        )}
                        <div className="media-info">
                            <p>Nom: {file.name}</p>
                            <p>Date d'import: {new Date(file.uploadDate).toLocaleDateString()}</p>
                            <p>Taille: {file.size} bytes</p>
                            <button className='delete' onClick={() => handleDelete(file.id)}>Suprimer</button>
                            <button className='copy-url' onClick={() => handleCopyUrl(file.url)}>Copier URL</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyMediaPage;