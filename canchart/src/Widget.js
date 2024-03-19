import uploadicon from './icons/upload.svg';
import React, { useState } from 'react';

function File(props) {
    const onHandle = props.onHandle
    const [imgScale, setImgScale] = useState("scale(1.0)");
    const [onFileHover, setOnFileHover] = useState(false);
    
    const onDragEnter = () => {
        setOnFileHover(true);
        setImgScale("scale(1.2)")
    };
    const onDragLeave = () => {
        setOnFileHover(false);
        setImgScale("scale(1.0)")
    };
    const handleDragOver = (event) => {
        event.preventDefault();
    };
    const onDrop = (event) => {
        event.preventDefault();
        setImgScale("scale(1.0)")
        setOnFileHover(false);
        const files = event.dataTransfer.files;
        onHandle(files);
    };
  
    const mouseOver = () => setImgScale("scale(1.2)");
    const mouseOut = () => setImgScale("scale(1.0)");
    return (
        <label
            className={`preview-upload${onFileHover ? ' onfile' : ''}`}
            onMouseOver={mouseOver}
            onMouseOut={mouseOut}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={handleDragOver}
            onDrop={onDrop}
            >
            <img
                className='undraggable animation-scale'
                src={uploadicon}
                style={{ transform: imgScale }}
                alt='upload'
            />
            <input
             type="file"
             className="hide"
             onChange={(event) => {
                const files = event.target.files;
                if (files.length === 0) {
                    return;
                }
                
                for (let i = 0; i < files.length; i++) {
                    onHandle(files[i]);
                    break;
                }
             }}
            ></input>
        </label>
    )
}

export default File;