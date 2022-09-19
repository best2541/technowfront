import React, { useEffect, useState } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MDButton from 'components/MDButton';
import MDInput from 'components/MDInput';
import axios from 'axios';
import { useMaterialUIController } from "context";

function Cctv({ id
}) {
    const [input, setInput] = useState()
    const createClick = (event) => {
        event.preventDefault()
        axios.post(`${process.env.REACT_APP_API}/station/cctv/new`, {
            station_id: id,
            name: input?.name,
            link: input?.link
        }, {
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
                <MDInput label='Name' type='text' variant="standard" fullWidth onChange={(event) => setInput({ ...input, name: event.target.value })} required />
                <MDInput label='Link' type='text' variant="standard" fullWidth onChange={(event) => setInput({ ...input, link: event.target.value })} required />
                <MDButton type='submit' style={{ position: 'absolute', bottom: 0, left: 0 }} color='success' fullWidth>New</MDButton>
            </form>
        </div>
    )
}

export default Cctv