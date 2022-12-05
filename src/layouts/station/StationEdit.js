import React, { useEffect, useState, useRef } from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import BuildIcon from '@mui/icons-material/Build';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ArticleIcon from '@mui/icons-material/Article';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Contract from './Contract';
import Maintain from './Maintain';
import ContractList from './ContractList';
import MaintainList from './MaintainList';
import Cctv from './Cctv';
import CctvList from './CctvList';
import Ticket from './Ticket';
// import MDTypography from 'components/MDTypography';
import Options from './Options';

const StationEdit = () => {
    const [input, setInput] = useState([])
    const [images, setImages] = useState([])
    // const [button, setButton] = useState(0)
    const [display, setDisplay] = useState({ contract: false, maintainList: false })
    const [options, setOptions] = useState([])
    const { id } = useParams()
    const buttonRef = useRef()

    const inputChange = (event) => {
        const { name, value } = event.target
        setInput({
            ...input,
            [name]: value,
        })
    }
    const addClick = () => {
        let formData = new FormData()
        formData.append('img_name', input?.name)
        formData.append('file', input?.img)
        axios.post(`${process.env.REACT_APP_API}/station/update/${id}`, {
            name: input?.name,
            tel: input?.tel,
            url: input?.url,
            long: input?.long,
            lati: input?.lati,
            key: input?.key,
            remote: input?.remote
        }, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => {
            if (!result.data.err)
                alert('เรียบร้อย')
        })
            .catch(() => {
                localStorage.removeItem('accessToken')
                window.location.href = '/'
            })
    }
    const ticketClick = (status) => {
        axios.post(`${process.env.REACT_APP_API}/station/ticket/${id}`, {
            status: status
        }, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then((result) => {
            if (!result.data.err)
                window.location.reload()
        })
            .catch(() => {
                localStorage.removeItem('accessToken')
                window.location.href = '/'
            })
    }
    const uploadImg = async (event) => {
        // await setInput({ ...input, img: null })
        let formData = new FormData()
        formData.append('img_name', id + images.length)
        formData.append('file', event.target.files[0])
        if (window.confirm('Upload image ?')) {
            axios.post(`${process.env.REACT_APP_API}/station/updateImg/${id}`, formData, {
                headers: {
                    'authorization': `token ${localStorage.getItem('accessToken')}`
                }
                // }).then(result => setImages([...images, result.data]))
            }).then(result => window.location.reload())
                .catch((err) => {
                    localStorage.removeItem('accessToken')
                    window.location.href = '/'
                })
        }
    }
    const deleteImg = async (id, name) => {
        if (window.confirm('Delete this Image ??')) {
            axios.post(`${process.env.REACT_APP_API}/station/deleteImg`, {
                id: id,
                name: name
            }, {
                headers: {
                    'authorization': `token ${localStorage.getItem('accessToken')}`
                }
            }).then(result => {
                if (!result.data.err) {
                    setImages(images.filter(image => image.id != id))
                } else
                    console.log(result.data)
            })
        }
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/station/get/${id}`, {
            headers: {
                'authorization': `token ${localStorage.getItem('accessToken')}`
            }
        }).then(result => {
            if (!result.data.err) {
                setOptions(result.data.options)
                setImages(result.data.images)
                setInput(result.data.stations[0])
                // setButton(result.data.stations[0]?.status)
            }
        })
            .catch(() => {
                localStorage.removeItem('accessToken')
                window.location.href = '/'
            })
    }, [])

    return (
        <MDBox pt={6} pb={3}>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <MDBox
                            variant="gradient"
                            bgColor="info"
                            borderRadius="lg"
                            coloredShadow="success"
                            mx={2}
                            mt={-3}
                            p={3}
                            mb={1}
                            textAlign="center"
                        >
                            <span style={{ 'position': 'absolute', 'left': '110px', 'color': 'yellow', 'fontSize': '12px' }}
                                onClick={() => buttonRef.current.click()}
                            >Add
                            </span>
                            {images.length > 0 &&
                                <Carousel
                                    autoPlay
                                    infiniteLoop
                                    showThumbs={false}
                                    showIndicators={false}
                                >
                                    {images.map((image) => (
                                        <div key={image.img}>
                                            <span style={{ 'position': 'absolute', 'left': '30px', 'color': 'red', 'fontSize': '12px' }}
                                                onClick={() => deleteImg(image.id, image.img)}
                                            >Delete
                                            </span>
                                            <span style={{ 'position': 'absolute', 'left': '70px', 'color': 'yellow', 'fontSize': '12px' }}
                                                onClick={() => buttonRef.current.click()}
                                            >Add
                                            </span>
                                            <img
                                                src={`${process.env.REACT_APP_API}/img/${image?.img}`}
                                                style={{ 'maxWidth': '90%', width: 'auto', 'maxHeight': '500px' }}
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            }
                        </MDBox>
                        {input?.id &&
                            <MDBox pt={4} pb={3} px={3}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <MDButton variant='text' href={`/record/detail/${id}`} fullWidth>Records</MDButton>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <MDButton variant='text' href={`/ticket/detail/${id}`} fullWidth>Tickets</MDButton>
                                    </Grid>
                                </Grid>
                                <MDBox component="form" role="form">
                                    <MDBox mb={2}>
                                        <MDInput name='name' type="text" label="Station Name" variant="standard" value={input.name} fullWidth onChange={inputChange} />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput name='tel' type="tel" label="Tel" variant="standard" fullWidth value={input.tel} onChange={inputChange} />
                                    </MDBox>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <MDBox mb={2}>
                                                <MDInput name='url' type="text" label="Url" variant="standard" value={input.url} fullWidth onChange={inputChange} />
                                            </MDBox>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <MDBox mb={2}>
                                                <MDInput name='key' type="text" label="Key" variant="standard" value={input.key} fullWidth onChange={inputChange} />
                                            </MDBox>
                                        </Grid>
                                    </Grid>
                                    <MDBox mb={2}>
                                        <MDInput name='remote' type="text" label="Remote Url" variant="standard" value={input.remote} fullWidth onChange={inputChange} />
                                    </MDBox>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <MDBox mb={2}>
                                                <MDInput name='lati' type="number" label="Latitude" variant="standard" value={input.lati} fullWidth onChange={inputChange} />
                                            </MDBox>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <MDBox mb={2}>
                                                <MDInput name='long' type="number" label="Longtitude" variant="standard" value={input.long} fullWidth onChange={inputChange} />
                                            </MDBox>
                                        </Grid>
                                    </Grid>
                                </MDBox>
                                <MDBox>
                                    {/* <span><MDTypography component='span'>IMG : </MDTypography></span> */}
                                    {/* {input[0].img &&
                                        <img
                                            src={`${process.env.REACT_APP_API}${input[0]?.img}`}
                                            style={{ 'maxWidth': '100%', 'maxHeight': '500px' }}
                                        />
                                    } */}
                                    <input ref={buttonRef} name='img' type="file" accept="image/*" style={{ color: 'white', display: 'none' }} onChange={(event) => uploadImg(event)} />
                                </MDBox>
                                {display?.contractList &&
                                    <>
                                        <div className='overlay' onClick={() => setDisplay({ ...display, contractList: false })}>
                                        </div>
                                        <ContractList id={id} onClick={(event) => event.stopPropagation()} />
                                    </>
                                }
                                {display?.contract &&
                                    <>
                                        <div className='overlay' onClick={() => setDisplay({ ...display, contract: false })}>
                                        </div>
                                        <Contract id={id} onClick={(event) => event.stopPropagation()} />
                                    </>
                                }
                                {display?.cctvList &&
                                    <>
                                        <div className='overlay' onClick={() => setDisplay({ ...display, cctvList: false })}>
                                        </div>
                                        <CctvList id={id} onClick={(event) => event.stopPropagation()} />
                                    </>
                                }
                                {display?.cctv &&
                                    <>
                                        <div className='overlay' onClick={() => setDisplay({ ...display, cctv: false })}>
                                        </div>
                                        <Cctv id={id} onClick={(event) => event.stopPropagation()} />
                                    </>
                                }
                                {display?.maintainList &&
                                    <>
                                        <div className='overlay' onClick={() => setDisplay({ ...display, maintainList: false })}>
                                        </div>
                                        <MaintainList id={id} onClick={(event) => event.stopPropagation()} />
                                    </>
                                }
                                {display?.maintain &&
                                    <>
                                        <div className='overlay' onClick={() => setDisplay({ ...display, maintain: false })}>
                                        </div>
                                        <Maintain id={id} ref_no={display.ref_no} onClick={(event) => event.stopPropagation()} />
                                    </>
                                }
                                {display?.options &&
                                    <>
                                        <div className='overlay' onClick={() => setDisplay({ ...display, options: false })}>
                                        </div>
                                        <Options onClick={(event) => event.stopPropagation()} />
                                    </>}
                                <MDBox mt={3} mb={1}>
                                    <div style={{ 'display': 'flex', 'justifyContent': 'space-around' }}>
                                        <div>
                                            <MDButton variant='gradient' color='primary' style={{ 'marginRight': '5px' }} onClick={() => setDisplay({ ...display, contractList: true })}><ArticleIcon />Contract</MDButton>
                                            <MDButton variant='gradient' color='primary' onClick={() => setDisplay({ ...display, contract: !display.contract })}><AddIcon />Add</MDButton>
                                        </div>
                                        <div>
                                            <MDButton variant='gradient' color='warning' style={{ 'marginRight': '5px' }} onClick={() => setDisplay({ ...display, cctvList: true })}><CameraAltIcon />CCTV</MDButton>
                                            <MDButton variant='gradient' color='warning' onClick={() => setDisplay({ ...display, cctv: true })}><AddIcon />Add</MDButton>
                                        </div>
                                        <div>
                                            <MDButton variant='gradient' color='info' onClick={() => window.open(`https://${input.remote.split('http://' && 'https://').pop()}`)}>Remote</MDButton>
                                        </div>
                                        <div>
                                            <MDButton variant='gradient' color='secondary' style={{ 'marginRight': '5px' }} onClick={() => setDisplay({ ...display, maintainList: true })}><BuildIcon />Maintain Log</MDButton>
                                            {/* <MDButton variant='gradient' color='secondary' onClick={() => setDisplay({ ...display, maintain: true })}>Add</MDButton> */}
                                        </div>
                                    </div>
                                </MDBox>
                                <MDBox mt={4}>
                                    <MDButton variant="gradient" color="success" onClick={() => addClick()} fullWidth>
                                        UPDATE
                                    </MDButton>
                                </MDBox>
                                {/* <MDBox mt={2} mb={1}>
                                    <MDButton variant="gradient" color={button == 0 ? "error" : "info"} onMouseOver={() => button != 0 && setButton(4)} onMouseLeave={() => setButton(input?.status)} onClick={() => ticketClick(input?.status == 0 ? 1 : 0)} fullWidth>
                                        {button == 0 ? <>OPEN TICKET</> : button == 1 ? <>WAIT</> : button == 2 ? <>PENDING</> : button == 3 ? <>FIXED</> : <>CLOSE TICKET</>}
                                    </MDButton>
                                </MDBox> */}
                            </MDBox>
                        }
                    </Card>
                </Grid>
            </Grid>
            <br />
            <Ticket id={id} setDisplay={setDisplay} options={options} />
        </MDBox >
    )
}

export default StationEdit