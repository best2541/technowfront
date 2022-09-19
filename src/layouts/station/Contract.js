import React, { useEffect, useState } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MDButton from 'components/MDButton';
import MDInput from 'components/MDInput';
import axios from 'axios';
import { useMaterialUIController } from "context";

function Contract({ id
}) {
    const [input, setInput] = useState()

    const createClick = (event) => {
        event.preventDefault()
        let formData = new FormData()
        formData.append('station_id', id)
        formData.append('exp', input?.exp)
        formData.append('file', input.file)
        axios.post(`${process.env.REACT_APP_API}/station/contract/new`, formData, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(() => alert('เรียบร้อย'))
            .catch(() => {
                localStorage.removeItem('accessToken')
                window.location.href = '/'
            })
    }
    return (
        <div className={useMaterialUIController()[0].darkMode ? 'box' : 'white-box'}>
            <form onSubmit={createClick}>
                <label>สัญญา : </label> <input type='file' onChange={(event) => setInput({ ...input, file: event.target.files[0] })} required />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                    <span><label>วันที่หมดสัญญา : </label> <MDInput type='date' variant="standard" style={{ 'backgroundColor': 'transparent', 'color': 'white' }} onChange={(event) => setInput({ ...input, exp: event.target.value })} required /></span>
                </div>
                <MDButton type='submit' style={{ position: 'absolute', bottom: 0, left: 0 }} color='success' fullWidth>New</MDButton>
            </form>
        </div>
    )
}

export default Contract