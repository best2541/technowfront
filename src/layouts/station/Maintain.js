import React, { useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MDButton from 'components/MDButton';
import axios from 'axios';
import createImagePlugin from "draft-js-image-plugin";

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

function Maintain({ id }) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const createClick = () => {
        axios.post(`${process.env.REACT_APP_API}/station/maintain/new`, { id: id, file: draftToHtml(convertToRaw(editorState.getCurrentContent())) }, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => {
            if (!result.data.err) {
                alert('เรียบร้อย')
                setEditorState(EditorState.createEmpty())
            }
        })
            .catch(err => console.log(err))
    }

    function uploadImageCallBack(file) {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', `${process.env.REACT_APP_API}/station/maintain/img/upload`);
                xhr.setRequestHeader('authorization', `token ${localStorage.getItem('accessToken')}`);
                const data = new FormData();
                data.append('file', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    console.log(response)
                    resolve(response);
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    console.log(error)
                    reject(error);
                });
            }
        );
    }

    return (
        <div className='box'>
            <Editor
                editorState={editorState}
                plugins={plugins}
                wrapperClassName="editor-header"
                editorClassName="editor"
                onEditorStateChange={(event) => setEditorState(event)}
                toolbar={{
                    image: {
                        uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true }
                    }
                }}
            />
            <MDButton color='success' style={{ position: 'absolute', bottom: 0, left: 0 }} fullWidth onClick={() => createClick()}>New</MDButton>
        </div>
    )
}

export default Maintain