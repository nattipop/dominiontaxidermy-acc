import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"


const YearBreakdown = () => {
    const {year} = useParams();
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);

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

    useEffect(() => {
        fetchFiles()
    }, []);

    const renderFiles = () => {
        return files.map(file => {
            return (
                <li key={file._id} onClick={() => navigate(`/file/${file.file_id}`)}>{file.file_name}</li>
            )
        })
    }

    return files.length > 0 ? (
        <div>
            <button className="back-button" onClick={() => navigate(`/totals/${year}`)}>Back</button>
            <h1>Work Orders for {year}</h1>
            <ul id="file-list">
                {renderFiles()}
            </ul>
        </div>
    ) : (
        <div>
            <h1>Loading...</h1>
        </div>
    )
};

export default YearBreakdown;