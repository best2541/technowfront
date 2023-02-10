import React, { useState, useEffect } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from 'axios';
import DataTable from 'examples/Tables/DataTable';
import { useMaterialUIController } from "context";

const columns = [
    { Header: "Create Date", accessor: "create_date", align: "left" },
    { Header: "หมายเหตุ", accessor: "remark", align: "left" },
    { Header: "วันที่เริ่ม", accessor: "start", align: "left" },
    { Header: "วันที่สิ้นสุด", accessor: "exp", align: "left" },
    { Header: "action", accessor: "action", align: "center" },
]

function ContractList({ id }) {
    const [datas, setDatas] = useState([])

    const deleteById = (id) => {
        axios.get(`${process.env.REACT_APP_API}/station/contract/delete/${id}`, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        })
            .then(() => setDatas(datas.filter(a => a.id != id)))
    }
    const row = datas.map(data => ({
        create_date: new Date(data.create_date).toLocaleString('th'),
        start: data.start ? new Date(data.start).toLocaleDateString('th') : '',
        remark: data.remark,
        exp: new Date(data.exp).toLocaleDateString('th'),
        action: <><a target='_blank' href={`${process.env.REACT_APP_API}/img/contract/${data?.file}`}>ดูสัญญา</a>/<a onClick={() => deleteById(data.id)} href='#'>ลบ</a></>
    }))
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/station/contract/get/${id}`, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => {
            setDatas(result.data?.contract)
        })
            .catch(() => {
                localStorage.removeItem('accessToken')
                window.location.href = '/'
            })
    }, [])
    return (
        <div className={useMaterialUIController()[0].darkMode ? 'box' : 'white-box'} style={{ 'overflow-y': 'auto' }}>
            {datas &&
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
            }
        </div>
    )
}

export default ContractList
