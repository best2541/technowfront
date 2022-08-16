import React from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import MDButton from 'components/MDButton';
import MDInput from 'components/MDInput';

function ContractList() {

    return (
        <div className='box'>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                <span><label>วันที่ลงทะเบียน : {new Date().toLocaleDateString('th')}</label></span>
                <span><label>วันหมดสัญญา : {new Date().toLocaleDateString('th')}</label></span>
                <span><a href='/test'>ดูสัญญา</a></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                <span><label>วันที่ลงทะเบียน : {new Date().toLocaleDateString('th')}</label></span>
                <span><label>วันหมดสัญญา : {new Date().toLocaleDateString('th')}</label></span>
                <span><a href='/test'>ดูสัญญา</a></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                <span><label>วันที่ลงทะเบียน : {new Date().toLocaleDateString('th')}</label></span>
                <span><label>วันหมดสัญญา : {new Date().toLocaleDateString('th')}</label></span>
                <span><a href='/test'>ดูสัญญา</a></span>
            </div>
            <MDButton style={{ position: 'absolute', bottom: 0, left: 0 }} color='success' fullWidth>New</MDButton>
        </div>
    )
}

export default ContractList