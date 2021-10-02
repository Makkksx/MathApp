import {useDropzone} from "react-dropzone";
import {useContext, useEffect, useMemo, useState} from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import {AuthContext} from "../service/auth";
import {Button} from "react-bootstrap";

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};
const storage = getStorage();
export default function DropPlace() {
    const {currentUser} = useContext(AuthContext);
    const [progress, setProgress] = useState(0);
    const [fileCount, setFileCount] = useState(0);
    function typeValidator(file) {
        const validImageTypes = ['image/bmp', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!validImageTypes.includes(file['type'])) {
            return {
                code: "wrong-type",
                message: `Images only`
            };
        }
        return null
    }
    const {
        acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject
    } = useDropzone({
        maxFiles:2,
        validator: typeValidator
    });
    const accFiles = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));
    const rejFiles = fileRejections.map(({ file, errors  }) => {
        return (
            <li key={file.path}>
                {file.path} - {file.size} bytes
                <ul>
                    {errors.map(e => <li key={e.code}>{e.message}</li>)}
                </ul>

            </li>
        )
    });
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);
    const uploadFiles = (file) => {
        const uploadRef = ref(storage, `/TaskImages/${currentUser.uid}/files/${file.name}`);
        const uploadTask = uploadBytesResumable(uploadRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * (100 / fileCount));
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        console.log(url);
                    });
            }
        );
    };
    useEffect(() =>{
        setFileCount(acceptedFiles.length)
    },[acceptedFiles.length])

    const handleLogout = () => {
        acceptedFiles.forEach(uploadFiles)
    };

    return (
        <section className="container">
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <em>(3 files are the maximum number of files you can drop here)</em>
            </div>
            <aside>
                <h4>Accepted files</h4>
                <ul>{accFiles}</ul>
                <h4>Rejected files</h4>
                <ul>{rejFiles}</ul>
            </aside>
            <Button variant="primary" onClick={() => handleLogout()}>Upload</Button>
            <hr/>
            <h4>Uploading done {progress}%</h4>
        </section>
    );
}

