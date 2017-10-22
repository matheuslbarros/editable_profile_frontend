import React from 'react';

import {serverUrl} from '../config';

const Picture = ({ file, alt, ...props }) => {
    var url = null;

    if (file instanceof File) {
        url = URL.createObjectURL(file);
    } else if (file) {
        url = serverUrl + '/pictures/' + file;
    } else {
        return (<p>No image selected</p>);
    }

    return (
        <img src={url} alt={alt} {...props} />
    );
};

export default Picture;