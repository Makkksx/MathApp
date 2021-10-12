import {useDropzone} from "react-dropzone";
import {useEffect, useMemo} from "react";

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
export default function DropPlace({getImages}) {

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
        maxFiles: 2,
        validator: typeValidator
    });
    const accFiles = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));
    const rejFiles = fileRejections.map(({file, errors}) => {
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


    useEffect(() => {
        getImages(acceptedFiles)
    }, [getImages, acceptedFiles])

    return (
        <section className="container mt-2">
            <h4>Add images</h4>
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <em>(3 files are the maximum number of files you can drop here)</em>
            </div>
            <aside className="mt-2">
                <h5>Accepted files</h5>
                <ul>{accFiles}</ul>
                <h5>Rejected files</h5>
                <ul>{rejFiles}</ul>
            </aside>
        </section>
    );
}

