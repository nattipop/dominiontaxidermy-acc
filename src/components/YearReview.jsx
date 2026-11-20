import { useParams, useNavigate, useNavigationType, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const YearReview = () => {
    const navigate = useNavigate();
    const {year} = useParams();
    const [files, setFiles] = useState([]);
    const [clients, setClients] = useState([]);
    const [yearIncome, setYearIncome] = useState(0);
    const [unpaidBalances, setUnpaidBalances] = useState(0);

    const fetchFiles = async () => {
        try {
            const response = await axios.get(`https://domtax-server-d7d364950a8d.herokuapp.com/all-files`);
        
            const years = response.data.filter(file => {
                return file.file_name.slice(0, 4) === year;
            })

            setFiles(years)
        } catch(err) {
            console.log(err);
        }
    };

    const fetchClients = async () => {
        try {
            const response = await axios.get(`https://domtax-server-d7d364950a8d.herokuapp.com/all-clients`);

            const clientsByYear = response.data.filter(client => {
                const date = new Date(client.client_since);

                return date.getFullYear().toString() === year;
            })

            setClients(clientsByYear)
        } catch(err) {
            console.log(err)
        }
    }

    const fetchNumbers = () => {
        if (files.length > 0) {
            const income = files.reduce((acc, file) => {
                return acc + file.total_paid
            }, 0);

            const due = files.reduce((acc, file) => {
                return acc + file.balance
            }, 0)

            setYearIncome(income);
            setUnpaidBalances(due)
        }
    }

    useEffect(() => {
        fetchFiles()
        fetchClients()
    }, [])

    useEffect(() => {
        fetchNumbers()
    }, [files])


    return files.length > 0 ? (
        <div id="year-review">
            <button onClick={() => navigate(`/totals`)}>Back</button>
            <h3 id="year-breakdown-link" onClick={() => navigate(`/totals/${year}/breakdown`)}>View Breakdown</h3>
            <h1>{year} Income: ${yearIncome.toLocaleString()}.00</h1>
            <h1>{year} Unpaid Invoices: ${unpaidBalances.toLocaleString()}.00</h1>
            <h1>{clients.length} new clients in {year}</h1>
        </div>
    ) : (
        <div id="year-review">
            <button onClick={() => navigate(-1)}>Back</button>
            <h1>Loading...</h1>
        </div>
    )
}

export default YearReview