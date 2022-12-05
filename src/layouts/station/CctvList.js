import React, { useState, useEffect } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from 'axios';
import DataTable from 'examples/Tables/DataTable';
import { useMaterialUIController } from "context";

const columns = [
    { Header: "Name", accessor: "name", align: "left" },
    { Header: "Link", accessor: "link", align: "left" },
]

function CctvList({ id }) {
    const [datas, setDatas] = useState([])

    const row = datas.map(data => ({
        name: data.name,
        link: <a href='' onClick={() => window.open(`https://${data.link.split('http://' && 'https://').pop()}`)}>{data.link}</a>
    }))
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
        <div className={useMaterialUIController()[0].darkMode ? 'box' : 'white-box'} style={{ 'overflow-y': 'auto' }}>
            {datas &&
                <>
                    <DataTable
                        table={{ columns: columns, rows: row }}
                        isSorted={true}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        checkboxSelection
                        noEndBorder
                    />
                </>
            }
        </div>
    )
}

export default CctvList