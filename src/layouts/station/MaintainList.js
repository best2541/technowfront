import axios from 'axios';
import React, { useState, useEffect } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function MaintainList({ id }) {
    const [datas, setDatas] = useState([])
    const [select, setSelect] = useState('')
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/station/maintain/get/${id}`, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => setDatas(result.data?.maintain))
    }, [])
    return (
        <div className='box' style={{ 'overflow-y': 'scroll' }}>
            {!select ? datas?.map(data => (
                <>
                    <div key={data.id} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                        <span><label>วันที่ลงทะเบียน : {new Date(data.create_date).toLocaleDateString('th')}</label>
                        </span>
                        <span><label>ผู้ซ่อม : {data.sign}</label></span>
                        <span><a href='#' onClick={() => setSelect(data.id)}>ดูรายละเอียด</a></span>
                    </div>
                </>
            )) :
                datas?.filter(data => data.id == select).map(data => (
                    <>
                        <div key={data.id} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', borderBottom: 'solid 2px white' }}>
                            <span>
                                <label>วันที่ลงทะเบียน : {new Date(data.create_date).toLocaleDateString('th')}</label>
                            </span>
                            <span><label>ผู้ซ่อม : {data.sign}</label></span>
                            <a href='#' onClick={() => setSelect('')}>กลับ</a>
                        </div>
                        <div key={data.id} dangerouslySetInnerHTML={{ __html: data.file }} />
                    </>
                ))
            }
        </div >
    )
}

export default MaintainList