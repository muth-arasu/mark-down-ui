import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDraftDataById, selectDratData, selectDratDataStatus } from '../state/features/user/draftSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@mui/material";
import ReactMarkdown from "react-markdown";
import AxiosService from "../common/AxiosService";
import { toast } from 'react-toastify';

const DraftEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [markdown, setMarkdown] = useState("");
    const [notes, setNotes] = useState([]);
    const dispatch = useDispatch();
    const draftData = useSelector(selectDratData);
    const draftDataStatus = useSelector(selectDratDataStatus);

    useEffect(() => {
        if (id) {
            dispatch(getDraftDataById(id)); // Pass the correct ID to get draft data
        }
    }, [id]);

    useEffect(() => {
        // Convert draftData to markdown format if needed
        if (draftDataStatus==='succeeded') {
            console.log("draftData",draftData);
            const lines = draftData.map((line) => line);
            setMarkdown(lines.join("\n"));
        }
    }, [draftData]);
    useEffect(() => {
        // Split the markdown text by newline characters to get individual lines
        const lines = markdown.split("\n").filter((line) => line.trim() !== "");
        setNotes(lines);
      }, [markdown]);
    

    const handleUpdate = async () => {
        try {
            const email = localStorage.getItem('email');
            const res = await AxiosService.put(`/draft/${id}`, { email, notes }); // Use correct URL and interpolate ID
            console.log("res", res);
            if (res) {
                toast.success(res.data.message);
                navigate('/draft/list'); // Redirect using window.location.href
            } else {
                toast.error('Something went wrong');
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <main>
            <section className="markdown">
                <textarea
                    className="input"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                ></textarea>
                <article className="result">
                    <ReactMarkdown>{markdown}</ReactMarkdown>
                </article>
            </section>
            <div className="flex justify-center gap-4 mt-2">
                <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
                <Button variant="outlined" color="primary">Reset</Button>
            </div>
        </main>
    );
};

export default DraftEditPage;
