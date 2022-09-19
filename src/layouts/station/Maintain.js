import React, { useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MDButton from 'components/MDButton';
import axios from 'axios';
import createImagePlugin from "draft-js-image-plugin";
import MDInput from 'components/MDInput';
import { useMaterialUIController } from "context";

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

function Maintain({ id, ref_no }) {
    const [input, setInput] = useState()
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const createClick = (event) => {
        event.preventDefault()
        axios.post(`${process.env.REACT_APP_API}/station/maintain/new`, { ref_no: `${ref_no}|${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}|${new Date().getMinutes()}:${new Date().getHours()}:${new Date().getSeconds()}`, id: id, name: input.name, description: input.description, file: draftToHtml(convertToRaw(editorState.getCurrentContent())) }, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => {
            if (!result.data.err) {
                axios.post(`${process.env.REACT_APP_API}/station/ticket/pending/${ref_no}`, {
                    status: 3
                }, {
                    headers: {
                        'authorization': `token ${localStorage.getItem('accessToken')}`
                    }
                }).then(result => {
                    if (!result.data.err)
                        window.location.reload()
                })
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
        <div className={useMaterialUIController()[0].darkMode ? 'box' : 'white-box'}>
            <form onSubmit={createClick}>
                <MDInput label='สิ่งที่ซ่อม' type='text' variant="standard" fullWidth onChange={(event) => setInput({ ...input, name: event.target.value })} required />
                <MDInput label='สิ่งที่เปลี่ยน' type='text' variant="standard" fullWidth onChange={(event) => setInput({ ...input, description: event.target.value })} required />
                <br /><br />
                <Editor
                    editorState={editorState}
                    plugins={plugins}
                    wrapperClassName="editor-header"
                    editorClassName="editor-small"
                    onEditorStateChange={(event) => setEditorState(event)}
                    toolbar={{
                        image: {
                            uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true }
                        }
                    }}
                />
                <MDButton color='success' type='submit' style={{ position: 'absolute', bottom: 0, left: 0 }} fullWidth>New</MDButton>
            </form>
        </div>
    )
}

export default Maintain