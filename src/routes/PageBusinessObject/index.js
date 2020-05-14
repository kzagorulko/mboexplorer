import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../../utils';

const PageBusinessObject = () => {

    const { objectName } = useParams();
    const { request } = useApi();
    const [businessObjects, setBusinessObjects] = useState([]);

    useEffect(() =>{
        request(objectName, 10).then((response) => setBusinessObjects(
            response[`${objectName.toUpperCase()}MboSet`][[objectName.toUpperCase()]]
            )
        );
    }, []);

    return (
        <div>
            {
                businessObjects.map((v) => (<div>
                    {Object.keys(v.Attributes).map((cv) => <div>{cv} : {v.Attributes[cv].content}</div>)})}
                </div>))
            }
        </div>
    )
};

export default PageBusinessObject;
