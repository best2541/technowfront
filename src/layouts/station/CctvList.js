import React, { useState, useEffect } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MDButton from 'components/MDButton';
import axios from 'axios';

function CctvList({ id }) {
    const [datas, setDatas] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/station/Cctv/get/${id}`, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => setDatas(result.data?.cctv))
            .catch(() => {
                localStorage.removeItem('accessToken')
                window.location.href = '/'
            })
    }, [])
    return (
        <div className='box' style={{ 'overflow-y': 'auto' }}>
            {datas?.map(data => (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                    <span><label>Link : <a href='' onClick={() => window.open(`http://${data.link.split('http://' && 'https://').pop()}`)}>{data.link}</a></label></span>
                </div>
            ))
            }
        </div>
    )
}

export default CctvList