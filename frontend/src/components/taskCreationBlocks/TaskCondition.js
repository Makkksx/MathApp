import {useEffect, useState} from "react";
import MDEditor from '@uiw/react-md-editor';

export default function TaskCondition({getCondition}) {
    const [condition, setCondition] = useState("**Condition here**");
    useEffect(() => {
        getCondition(condition)
    }, [getCondition, condition])
    return (
        <div className="container mt-3">
            <h4>Set condition</h4>
            <MDEditor
                value={condition}
                onChange={setCondition}
            />
        </div>
    );
}