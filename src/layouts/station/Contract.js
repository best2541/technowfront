import React, { useEffect, useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MDButton from 'components/MDButton';
import MDInput from 'components/MDInput';

function Contract() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    useEffect(() => {
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }, [editorState])
    return (
        <div className='box'>
            <label>สัญญา : </label> <input type='file' />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                <span><label>วันที่หมดสัญญา : </label> <MDInput type='date' variant="standard" style={{ 'backgroundColor': 'transparent', 'color': 'white' }} /></span>
            </div>
            <MDButton style={{ position: 'absolute', bottom: 0, left: 0 }} color='success' fullWidth>New</MDButton>
        </div>
    )
}

export default Contract