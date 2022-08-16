import React from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MDInput from 'components/MDInput';

function MaintainList() {
    return (
        <div className='box'>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                <span><label>วันที่ลงทะเบียน : {new Date().toLocaleDateString('th')}</label>
                </span>
                <span><label>ผู้ซ่อม : {new Date().toLocaleDateString('th')}</label></span>
                <span><a href='/test'>ดูรายละเอียด</a></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                <span><label>วันที่ลงทะเบียน : {new Date().toLocaleDateString('th')}</label></span>
                <span><label>ผู้ซ่อม : {new Date().toLocaleDateString('th')}</label></span>
                <span><a href='/test'>ดูรายละเอียด</a></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                <span><label>วันที่ลงทะเบียน : {new Date().toLocaleDateString('th')}</label></span>
                <span><label>ผู้ซ่อม : {new Date().toLocaleDateString('th')}</label></span>
                <span><a href='/test'>ดูรายละเอียด</a></span>
            </div>
        </div>
    )
}

export default MaintainList