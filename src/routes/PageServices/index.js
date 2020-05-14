import React, {useEffect, useState} from 'react';
import { useApi } from '../../utils';

const Index = () => {
    const [services, setServices] = useState('');
    const { request } = useApi();
    const getServices = () => request('maxservice').then((response) => setServices(response.MAXSERVICEMboSet.MAXSERVICE.map((service) => service.Attributes.SERVICENAME.content)));

    useEffect(() => getServices(), []);

    return (
        <div>
            <div>
                {services ? services.map((v, i) => <div key={i}><a href={`/mbo/${v.toLowerCase()}`}>{v}</a></div>) : null}
            </div>
        </div>
    );
};

export default Index;
