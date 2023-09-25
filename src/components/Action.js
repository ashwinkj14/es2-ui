import React from 'react';
import axios from 'axios';

const Action = (props) => {

    const downloadPublication = async (publicationId) => {
        const api = `downloadPublication`;

        const response = await axios.post(api,{
            //Parameter here
        });
        
        if (response.status === 200){
            console.log("File Downloaded Successfully");
        } else {
            console.error("Error Downloading PDF");
        }

    };
    
    const handleButtonClick = () => {
        const publicationId = props.node.data.publicationId;
        downloadPublication(publicationId);
    };

    return (
        <button onClick={handleButtonClick}>Download</button>
    );
};

export default Action;
//#2d9b64