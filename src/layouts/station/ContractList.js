import React, { useState, useEffect } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MDButton from 'components/MDButton';
import axios from 'axios';

function ContractList({ id }) {
    const [datas, setDatas] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/station/contract/get/${id}`, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => setDatas(result.data?.contract))
            .catch(() => {
                localStorage.removeItem('accessToken')
                window.location.href = '/'
            })
    }, [])
    return (
        <div className='box' style={{ 'overflow-y': 'auto' }}>
            {datas?.map(data => (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                    <span><label>วันที่ลงทะเบียน : {new Date(data.create_date).toLocaleDateString('th')}</label></span>
                    <span><label>วันหมดสัญญา : {new Date(data.exp).toLocaleDateString('th')}</label></span>
                    <span><a target='_blank' href={`http://localhost:3001/img/contract/${data?.file}`}>ดูสัญญา</a></span>
                </div>
            ))
            }
        </div>
    )
}

export default ContractList