import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

function Grade() {
    const [gdata, setGData] = useState([]);
    const [loading, setLoading] = useState(true);

    const downloadExcel = () => {
        const ws = XLSX.utils.json_to_sheet(gdata);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'grade_marks.xlsx');
    };

    useEffect(() => {
        async function FetchGradeData() {
            try {
                const apiRes = await axios.get('http://localhost:7000/api/grade_marks');
                const data = apiRes.data;
                setGData(data);
            } catch (error) {
                console.log("Error in grade marks", error);
            } finally {
                setLoading(false);
            }
        }
        FetchGradeData();
    }, []);

    return (
        <>
            {loading ? (
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
                gdata.length > 0 ? (
                    <button className='btn btn-primary' onClick={downloadExcel}>
                        Grade
                    </button>
                ) : (
                    <p>No data available.</p>
                )
            )}
        </>
    );
}

export default Grade;
