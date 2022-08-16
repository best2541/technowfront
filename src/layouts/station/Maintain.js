import React, { useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MDButton from 'components/MDButton';
import MDInput from 'components/MDInput';

function Maintain() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    useEffect(() => {
        console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }, [editorState])
    return (
        <div className='box'>
            <Editor
                // editorState={editorState}
                wrapperClassName="editor-header"
                editorClassName="editor"
                onEditorStateChange={(event) => setEditorState(event)}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                <span><label>วันที่หมดสัญญา : </label> <MDInput type='date' variant="standard" style={{ 'backgroundColor': 'transparent', 'color': 'white' }} /></span>
                <MDButton color='success' >New</MDButton>
            </div>
        </div>
    )
}

export default Maintain