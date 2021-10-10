// import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
//
// const storage = getStorage();
//
// export async function UploadFiles(user, type, file) {
//     const uploadRef = ref(storage, `/${user}/${type}/${file.name}`);
//     const uploadTask = uploadBytesResumable(uploadRef, file);
//     uploadTask.on(
//         "state_changed",
//         () => {
//             // alert.show("Success", {timeout: 2000, type: 'success'})
//         },
//         (error) => {
//             // alert.show("Uploading interrupted", {timeout: 2000, type: 'error'})
//             console.log(error)
//         }
//     );
//     return getDownloadURL(uploadTask.snapshot.ref)
//
// }
//
