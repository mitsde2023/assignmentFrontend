import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [studentCount, setStudentCount] = useState(0);
    const [lastStudentUpdatedAt, setLastStudentUpdatedAt] = useState('');
    const [lastFlattenedDataUpdatedAt, setLastFlattenedDataUpdatedAt] = useState('');
    const [flattenedDataCount, setFlattenedDataCount] = useState(0);
    const [uniqueUsersCount, setUniqueUsersCount] = useState(0);
    const [countOfPrograms, setCountOfPrograms] = useState(0)
    const [batches, setBatches] = useState([]);
    const [allPrograms, setAllPrograms] = useState([])
    const [lastProgramsUpdated, setLastProgramsUpdated] = useState('')
    const [lastBatchsUpdated, setLastBatchUpdated] = useState('')

    useEffect(() => {
        async function fetchData() {
            try {
                const [studentCountRes, lastStudentUpdatedAtRes, flattenedDataCountRes, uniqueUsersCountRes, batchesRes, countprograms, allPrograms] = await Promise.all([
                    axios.get('http://localhost:7000/api/meatdata/students'),
                    axios.get('http://localhost:7000/api/meatdata/flattenedData/last_updated_at'),
                    axios.get('http://localhost:7000/api/meatdata/flattenedData/count'),
                    axios.get('http://localhost:7000/api/meatdata/flattenedData/unique_users_count'),
                    axios.get('http://localhost:7000/api/meatdata/batches'),
                    axios.get('http://localhost:7000/api/meatdata/programs'),
                    axios.get('http://localhost:7000/api/meatdata/all-programs')
                ]);

                setStudentCount(studentCountRes.data.studentCount);
                setLastStudentUpdatedAt(studentCountRes.data.lastStudentUpdatedAt);
                setLastFlattenedDataUpdatedAt(lastStudentUpdatedAtRes.data.lastUpdatedAt);
                setFlattenedDataCount(flattenedDataCountRes.data.flattenedDataCount);
                setUniqueUsersCount(uniqueUsersCountRes.data.uniqueUsersCount);
                setBatches(batchesRes.data.batches);
                setCountOfPrograms(countprograms.data.programCount);
                setAllPrograms(allPrograms.data.programs);
                setLastBatchUpdated(batchesRes.data.lastBatchUpdatedAt)
                setLastProgramsUpdated(allPrograms.data.lastProgramUpdatedAt)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="container mt-2">
            <h6 className="mb-4">Dashboard</h6>

            <div className="row">
                <div className="col-md-4">
                    <div className="card bg-info text-white">
                        <div className="card-body">
                            <h4 className="card-title">Students</h4>
                            <h5 className="card-text">{studentCount}</h5>
                        </div>
                        <p className="card-title">Updated On</p>
                        <p className="card-text">{lastStudentUpdatedAt}</p>

                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-success text-white">
                        <div className="card-body">
                            <h4 className="card-title">All Assignaments</h4>
                            <h5 className="card-text" >{flattenedDataCount}</h5>
                        </div>
                        <p className="card-title">Updated On</p>
                        <p className="card-text">{lastFlattenedDataUpdatedAt}</p>

                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card bg-warning text-white">
                        <div className="card-body">
                            <h4 className="card-title"> Unique Students Attempted Assignament</h4>
                            <h5 className="card-text mt-4">{uniqueUsersCount}</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header d-flex justify-content-around">
                            <div >
                                All Programs
                            </div>
                            <div>{countOfPrograms}</div>
                            <div >
                                {lastProgramsUpdated}
                            </div>
                        </div>
                        <div className="card-body" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            <ul className="list-group">
                                {allPrograms.map(program => (
                                    <li key={program.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {program.program_name}
                                        <span className="badge bg-primary rounded-pill">{program.updatedAt}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                </div>

                <div className="col-md-6 mb-3">
                    <div className="card">
                        <div className="card-header d-flex justify-content-around">
                            <div >
                                All Batches
                            </div>
                            <div >
                                {batches.length}
                            </div>
                            <div >
                                {lastBatchsUpdated}
                            </div>
                        </div>
                        <div className="card-body" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            <ul className="list-group">
                                {batches.map(batch => (
                                    <li key={batch.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {batch.batch_name}
                                        <span className="badge bg-primary rounded-pill">{batch.admitted_students}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
