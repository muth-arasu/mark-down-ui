import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import AxiosService from "../common/AxiosService";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const PlayGround = () => {
  const navigate = useNavigate();
  const [markdown, setMarkdown] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Split the markdown text by newline characters to get individual lines
    const lines = markdown.split("\n").filter((line) => line.trim() !== "");
    setNotes(lines);
  }, [markdown]);

  const handleSave = async () => {
    try {
      const email = localStorage.getItem('email');
      const res = await AxiosService.post('/draft/save', { email, notes });
      console.log("res", res);
      if (res.status === 201) {
        toast.success(res.data.message);
        navigate('/draft/list')
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
        <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
        <Button variant="outlined" color="primary">Reset</Button>
      </div>
    </main>
  );
};

export default PlayGround;
