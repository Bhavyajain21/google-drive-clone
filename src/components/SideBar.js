import React, { useState } from 'react'
import "../CSS/sidebar.css"
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import DevicesIcon from '@mui/icons-material/Devices';
import PeopleIcon from '@mui/icons-material/People';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import addButton from "../images/preview.png"
import { Modal } from '@mui/material'
import { db, storage } from '../firebase';
import firebase from 'firebase';
import { id } from '../App';
import LogoutIcon from '@mui/icons-material/Logout';


function SideBar() {

    const [open,setopen] = useState(false);
    const [uploading, setuploading] = useState(false);
    //State for files
    const [file, setfile] = useState(null);

    const handleClose = () => {
        setopen(false);
    }

    const handleOpen = () => {
        setopen(true);
    }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setfile(e.target.files[0]);
        }
    }

    const handleUpload = (e) => {   
        e.preventDefault();
        setuploading(true);

        storage.ref(`files/${id}/${file.name}`).put(file).then(snapshot => {
            storage.ref(`files/${id}`).child(file.name).getDownloadURL().then((url) => {
                db.collection(`${id}`).add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    filename: file.name,
                    fileURL: url,
                    size: snapshot._delegate.bytesTransferred,
                })

                setuploading(false);
                setfile(null);
                setopen(false);
            })
        })
    }

    const logout = () => {
        window.location.reload(false);
    }

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <div className="modal__pop">
                    <form>
                        <div className="modal__heading">
                            <h3>Select file you want to upload</h3>
                        </div>

                        <div className="modal__body">

                            {

                                uploading ? (<p className="uploading">Uploading</p>)
                                    : (<>
                                        <input type="file" onChange={handleChange} ></input>
                                        <input type="submit" className="post_submit" onClick={handleUpload} ></input>
                                    </>)

                            }

                        </div>
                    </form>
                </div>
            </Modal>

            <div className="sideBar">
                <div className="sideBar__btn">
                    <button onClick={handleOpen}>
                        <img src={addButton} alt="Add-Button-Icon" />
                        <span>New</span>
                    </button>
                </div>

                <div className="sideBar__options">
                    <div className="sideBar_option sideBar_option-Active">
                        <MobileScreenShareIcon></MobileScreenShareIcon>
                        <span>My Drive</span>
                    </div>

                    <div className="sideBar_option">
                        <DevicesIcon></DevicesIcon>
                        <span>Computers</span>
                    </div>

                    <div className="sideBar_option">
                        <PeopleIcon></PeopleIcon>
                        <span>Shared with me</span>
                    </div>

                    <div className="sideBar_option">
                        <QueryBuilderIcon></QueryBuilderIcon>
                        <span>Recent</span>
                    </div>

                    <div className="sideBar_option">
                        <StarBorderIcon></StarBorderIcon>
                        <span>Starred</span>
                    </div>

                    <div className="sideBar_option">
                        <DeleteOutlineIcon></DeleteOutlineIcon>
                        <span>Trash</span>
                    </div>

                    <div className="sideBar_option" onClick={logout}>
                        <LogoutIcon></LogoutIcon>
                        <span>LogOut</span>
                    </div>

                </div>

                <hr></hr>

                <div className="sideBar__options">
                    <div className="sideBar_option">
                        <CloudQueueIcon></CloudQueueIcon>
                        <span>Storage</span>
                    </div>

                    <div className="progress_bar">
                        <progress size="tiny" value="50" max="100"></progress>
                        <span>7.5 GB of 15 GB used</span>
                    </div>

                </div>

            </div>
        </>
    )
}

export default SideBar
