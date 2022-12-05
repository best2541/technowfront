import axios from 'axios';
import DataTable from 'examples/Tables/DataTable';
import React, { useState, useEffect } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useMaterialUIController } from "context";

const columns = [
    { Header: "Ref", accessor: "id", align: "left" },
    { Header: "สิ่งที่ซ่อม", accessor: "name", align: "left" },
    { Header: "สิ่งที่เปลี่ยน", accessor: "description", align: "left" },
    { Header: "วันที่", accessor: "create_date", align: "center" },
    { Header: "ผู้ซ่อม", accessor: "sign", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
]

function MaintainList({ id }) {
    const [datas, setDatas] = useState([])
    const [select, setSelect] = useState('')

    const row = datas.map(data => {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            create_date: new Date(data.create_date).toLocaleString('th'),
            sign: data.sign,
            action: <span><a href='#' onClick={() => setSelect(data.id)}>ดูรายละเอียด</a></span>
        }
    })
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/station/maintain/get/${id}`, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => setDatas(result.data?.maintain))
    }, [])
    return (
        <div className={useMaterialUIController()[0].darkMode ? 'box' : 'white-box'} style={{ 'overflow-y': 'auto' }}>
            {!select ?
                <>
                    <DataTable
                        table={{ columns: columns, rows: row }}
                        isSorted={true}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        // checkboxSelection
                        noEndBorder
                    />
                </>
                :
                datas?.filter(data => data.id == select).map(data => (
                    <>
                        <div key={data.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                                <div><label>สิ่งที่ซ่อม : {data.name}</label></div>
                                <a href='#' onClick={() => setSelect('')}>กลับ</a>
                            </div>
                            <div><label>อะไหล่ที่เปลี่ยน : {data.description}</label></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', borderBottom: 'solid 2px white' }}>
                                <span>
                                    <label>วันที่ลงทะเบียน : {new Date(data.create_date).toLocaleDateString('th')}</label>
                                </span>
                                <span><label>ผู้ซ่อม : {data.sign}</label></span>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: data.file }} />
                        </div>
                    </>
                ))
            }
        </div >
    )
}

export default MaintainList