import DataTable from 'examples/Tables/DataTable'
import React from 'react'

function TempTable({ test, rows }) {
    return (
        <DataTable
            table={{ columns: test, rows: rows }}
            isSorted={true}
            entriesPerPage={false}
            // showTotalEntries={false}
            // checkboxSelection
            noEndBorder
        />
    )
}

export default TempTable