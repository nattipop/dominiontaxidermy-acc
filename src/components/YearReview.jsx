import { useParams, useNavigate, useNavigationType } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const YearReview = () => {
    const navigate = useNavigate();
    const {year} = useParams();
    const [files, setFiles] = useState([]);
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
    }, [])

    useEffect(() => {
        fetchNumbers()
    }, [files])


    return files.length > 0 ? (
        <div id="year-review">
            <button onClick={() => navigate(-1)}>Back</button>
            <h1>{year} Income: ${yearIncome.toLocaleString()}.00</h1>
            <h1>{year} Unpaid Invoices: ${unpaidBalances.toLocaleString()}.00</h1>
        </div>
    ) : (
        <div id="year-review">
            <button onClick={() => navigate(-1)}>Back</button>
            <h1>Loading...</h1>
        </div>
    )
}

export default YearReview