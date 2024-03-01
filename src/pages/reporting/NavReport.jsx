import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PvmList from './pvmReport/PvmList';
import CorpList from './corpReport/CorpList';
import AdList from './adReport/AdList';
import CreditBarComponent from '../creditLimit/CreditBarComponent';

export default function NavReport() {
    const [crdlmt, setCrdlmt] = useState("")
    const [availblnc, setAvailblnc] = useState("")

    useEffect(() => {
        let cred = localStorage.getItem("CreditBalance")
        let availBalance = localStorage.getItem("AvailBalance")
        let total = cred - availBalance;
        let credit = (total / cred) * 100 + "";
        let creditlimit = credit.slice(0, 2)
        setCrdlmt(creditlimit)
        setAvailblnc(availBalance)
    }, [])

    return (
        <>
            <div className='clsflex'>
                <CreditBarComponent data={{ creditLimit: crdlmt, availBalance: availblnc }} />
            </div>
            <Tabs
                defaultActiveKey="pvm"
                id="fill-tab-example"
                className="mb-3 fs-5 fw-bold"
                fill
                variant="underline"
            >
                <Tab eventKey="pvm" title="PVM"  >
                    <PvmList />
                </Tab>
                <Tab eventKey="corp" title="Corp-Rbt">
                    <CorpList />
                </Tab>
                <Tab eventKey="ad" title="Ad-Rbt">
                    <AdList />
                </Tab>
            </Tabs >
        </>
    );
}
