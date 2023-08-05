import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './Describe.css'; // Import a separate CSS file for styling

const Describe = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const [products, setProducts] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        axios.get('https://localhost:7225/api/Products/id/' + id)
            .then((response) => {
                setProducts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    useEffect(() => {
        if (products.length > 0) {
            setDescription(products[0].description);
        }
    }, [products]);

    return (
        <div className="ckeditor-container">
            <CKEditor
                editor={ClassicEditor}
                data={description}
                disabled={true}
                config={{
                    toolbar: {
                        items: []
                    }
                }}
                onReady={(editor) => {
                    editor.editing.view.change((writer) => {
                        writer.setStyle('border', 'none', editor.editing.view.document.getRoot());
                    });
                }}
            />
        </div>
    )
}

export default Describe;
