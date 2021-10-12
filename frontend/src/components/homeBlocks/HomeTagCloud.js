import {TagCloud} from "react-tagcloud";
import {useEffect, useState} from "react";
import axios from "axios";
import {useAlert} from "react-alert";

export default function HomeTagCloud() {
    const [tagData, setTagData] = useState([]);
    const alert = useAlert()
    useEffect(() => {
        async function fetchData() {
            await axios.get("/task/getAllTags")
                .then(response => {
                    setTagData(response.data)
                }).catch((error) => {
                    alert.show("No access!", {timeout: 2000, type: 'error'})
                    console.log(error);
                });
        }

        fetchData().catch((error) => {
            console.log(error)
        })

    }, [alert]);
    return (
        <TagCloud
            minSize={12}
            maxSize={35}
            tags={tagData}
            // onClick={tag => alert(`'${tag.value}' was selected!`)}
        />
    )
}