import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const Totals = () => {
    const [yearList, setYearList] = useState([]);
    const navigate = useNavigate()

    const fetchYears = async () => {
        try {
            const response = await axios.get(`https://domtax-server-d7d364950a8d.herokuapp.com/all-files`);
        
            const years = response.data.map(file => {
                return file.file_name.slice(0, 4);
            })

            const justYears = [...new Set(years)]
            setYearList(justYears)
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchYears()
    }, [])

    const renderYears = () => {
        return yearList.map(year => {
            return (
                <li key={year + Math.random()}>
                    <h3 onClick={() => navigate(`/totals/${year}`)}>{year}</h3>
                </li>
            )
        })
    }

    return yearList.length > 0 ? (
        <div>
            <ul id="totals-years">
                {renderYears()}
            </ul>
        </div>
    ) : (
        <div>No data</div>
    )
}

export default Totals;