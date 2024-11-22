import React, { useState } from 'react'
import { AppHeader, AppSidebar } from '../../../components'
import axios from 'axios'
import MarkdownEditor from '@uiw/react-markdown-editor'
import ReactDOMServer from 'react-dom/server'
import Markdown from 'markdown-to-jsx'
export default function Blog() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '', // This will store the markdown content
    meta: '',
    keywords: '',
    category: '',
    image: null,
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'title') {
      if (value.length > 250) {
        // Set your desired length limit here
        alert('Title should not exceed 250 characters')
        return
      }
    }
    if (name === 'image') {
      const file = files[0] // Get the selected file

      // Validate the file size (e.g., max 10MB)
      const maxSize = 10 * 1024 * 1024 // 10MB in bytes
      if (file && file.size < maxSize) {
        return
      } else {
        alert('File size should not exceed 10MB') // Show an error if size exceeds 10MB
        window.location.reload()
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const handleMarkdownChange = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      description: content, // Store the markdown content
    }))
  }

  const convertMarkdownToString = (markdownText) => {
    const jsxElement = <Markdown>{markdownText}</Markdown>
    const jsxString = ReactDOMServer.renderToStaticMarkup(jsxElement)
    return jsxString
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const mark = await convertMarkdownToString(formData.description)
    const data = new FormData()
    data.append('title', formData.title)
    data.append('description', mark) // Markdown content
    data.append('meta', formData.meta)
    data.append('keywords', formData.keywords)
    data.append('category', formData.category)
    data.append('image', formData.image)

    const token = localStorage.getItem('token')
    setLoading(true)
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}superAdmin/blog`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    if (res.data.status === 201) {
      setLoading(false)
      alert('Blog added successfully')
      setFormData({
        title: '',
        description: '',
        meta: '',
        keywords: '',
        category: '',
        image: null,
      })
    } else {
      setLoading(false)
      alert('Failed to add blog')
    }
  }

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <div className="mx-5 mb-5">
            <h1 className="text-center mb-4">Blog</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description (Markdown)
                </label>
                <MarkdownEditor
                  value={formData.description}
                  onChange={handleMarkdownChange}
                  height={400}
                  className="z-10"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="meta" className="form-label">
                  Meta Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="meta"
                  name="meta"
                  placeholder="Enter Meta Description"
                  value={formData.meta}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="keywords" className="form-label">
                  Keywords
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="keywords"
                  name="keywords"
                  placeholder="Enter Keywords"
                  value={formData.keywords}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  placeholder="Enter Category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Upload Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              {loading && <p>Uploading...</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
