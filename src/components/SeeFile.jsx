import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SeeFile = () => {
    const { date } = useParams();
    const [file, setFile] = React.useState(null);

    React.useEffect(() => {
        const fetchFile = async () => {
            try {
                const response = await axios.get(`https://domtax-server-d7d364950a8d.herokuapp.com/file/${date}`);
                setFile(response.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchFile();
    }, [date]);

    const handleAddPayment = async (paymentAmount) => {
        if (!file) return;

        const newTotalPaid = (parseFloat(file.total_paid) || 0) + parseFloat(paymentAmount);
        const newBalance = (parseFloat(file.total_due) || 0) - newTotalPaid;

        try {
            await axios.put(`https://domtax-server-d7d364950a8d.herokuapp.com/update-file/${date}`, {
                ...file,
                total_paid: newTotalPaid,
                balance: newBalance
            });
            setFile({
                ...file,
                total_paid: newTotalPaid,
                balance: newBalance
            });
        } catch(err) {
            console.log(err);
        }
    }

    return file ? (
        <div>
            <button className="back-button" onClick={() => window.history.back()}>Back</button>
            <h1>{file.file_name}</h1>
            <p>{file.body}</p>
            <p>Total Due: ${file.total_due.toFixed(2)}</p>
            <p>Total Paid: ${file.total_paid.toFixed(2)}</p>
            <p>Balance: ${file.balance.toFixed(2)}</p>
            <form onSubmit={(e) => {
                e.preventDefault();
                const paymentAmount = e.target.payment.value;
                handleAddPayment(paymentAmount);
                e.target.reset();
            }}>
                <label>
                    $<input placeholder="Payment Amount" type="number" name="payment" step="0.01" required />
                </label>
                <button type="submit">Add Payment</button>
            </form>
        </div>
    ) : (
        <div>
            <button onClick={() => window.history.back()}>Back</button>
            <h1>File not found</h1>
        </div>
    )
}

export default SeeFile;