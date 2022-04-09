import { Spin } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Ckeditor from "../../../../../CKEditor";

export default function BaseViewer({ fetch, processData }) {
  const { pat_id } = useParams()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState()

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const { error, data } = await fetch(pat_id)
      if (error) setError(error)
      else setContent(processData(data))
      setLoading(false)
    }
    fetchData()
  }, [fetch, pat_id, processData])

  if (loading) return <div className="flex justify-center"><Spin /></div>
  if (!loading & error) return <p>{error}</p>
  return <Ckeditor contentData={content ? content : ""} />
}