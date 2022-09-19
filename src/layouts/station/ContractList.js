import React, { useState, useEffect } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from 'axios';
import DataTable from 'examples/Tables/DataTable';
import { useMaterialUIController } from "context";

const columns = [
    { Header: "Create Date", accessor: "create_date", align: "left" },
    { Header: "EXP", accessor: "exp", align: "left" },
    { Header: "action", accessor: "action", align: "center" },
]

function ContractList({ id }) {
    const [datas, setDatas] = useState([])

    const row = datas.map(data => ({
        create_date: new Date(data.create_date).toLocaleString('th'),
        exp: new Date(data.exp).toLocaleDateString('th'),
        action: <a target='_blank' href={`http://localhost:3001/img/contract/${data?.file}`}>ดูสัญญา</a>
    }))
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
                    {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                        <span><label>วันที่ลงทะเบียน : {new Date(data.create_date).toLocaleString('th')}</label></span>
                        <span><label>วันหมดสัญญา : {new Date(data.exp).toLocaleDateString('th')}</label></span>
                        <span><a target='_blank' href={`http://localhost:3001/img/contract/${data?.file}`}>ดูสัญญา</a></span>
                    </div> */}
                </>
            }
        </div>
    )
}

export default ContractList