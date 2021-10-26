import React, { useState, useEffect } from 'react'
import "../CSS/data.css"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListIcon from '@mui/icons-material/List';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { db } from '../firebase';
import { id } from '../App';

function Data() {

    const [files, setfiles] = useState([]);

    useEffect(() => {
        db.collection(`${id}`).onSnapshot(snapshot => {
            setfiles(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        })
    }, [])

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    return (

        <div className="data">
            <div className="data__header">
                <div className="data__headerLeft">
                    <p>My Drive</p>
                    <ArrowDropDownIcon></ArrowDropDownIcon>
                </div>

                <div className="data__headerRight">
                    <ListIcon></ListIcon>
                    <InfoOutlinedIcon></InfoOutlinedIcon>
                </div>
            </div>

            <div className="data__content">
                <div className="data__grid">
                    {
                        files.map((file) => {
                            return <a  href={file.data.fileURL} target="_blank"><div className="data__file" key="{file}">
                                <InsertDriveFileIcon></InsertDriveFileIcon>
                                <p>{file.data.filename}</p>
                            </div></a>
                        })
                    }

                </div>

                <div className="data_list">
                    <div className="detailsRow">
                        <p><b>Name<ArrowDownwardIcon></ArrowDownwardIcon> </b></p>
                        <p><b>Owner</b></p>
                        <p><b>Last Modified</b></p>
                        <p><b>File Size</b></p>
                    </div>

                    {
                        files.map((file) => {
                            return <div className="detailsRow" key={file}>
                                <p>
                                    <a href={file.data.fileURL} target="_blank">
                                        <InsertDriveFileIcon></InsertDriveFileIcon>{file.data.filename}
                                    </a>
                                </p>
                                <p>Me</p>
                                <p>{new Date(file.data.timestamp?.seconds * 1000).toUTCString()}</p>
                                <p>{formatBytes(file.data.size)}</p>    
                            </div>
                        })
                    }

                </div>
            </div>

        </div>
    )
}

export default Data
