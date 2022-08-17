import React, { useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MDButton from 'components/MDButton';
import axios from 'axios';

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

    return (
        <div className='box'>
            <Editor
                editorState={editorState}
                wrapperClassName="editor-header"
                editorClassName="editor"
                onEditorStateChange={(event) => setEditorState(event)}
            />
            <MDButton color='success' style={{ position: 'absolute', bottom: 0, left: 0 }} fullWidth onClick={() => createClick()}>New</MDButton>
        </div>
    )
}

export default Maintain