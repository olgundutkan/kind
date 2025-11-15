import { useState, useEffect } from 'react'
import './App.css'

const API_URL = '/idp-backend/api'

function App() {
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      const response = await fetch(`${API_URL}/items`)
      const data = await response.json()
      setItems(data || [])
    } catch (error) {
      console.error('Error loading items:', error)
      showMessage('Failed to load items', 'error')
    }
  }

  const createItem = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      showMessage('Name is required', 'error')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      })

      if (response.ok) {
        showMessage('Item created successfully', 'success')
        setName('')
        setDescription('')
        loadItems()
      } else {
        showMessage('Failed to create item', 'error')
      }
    } catch (error) {
      console.error('Error creating item:', error)
      showMessage('Failed to create item', 'error')
    } finally {
      setLoading(false)
    }
  }

  const deleteItem = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        showMessage('Item deleted successfully', 'success')
        loadItems()
      } else {
        showMessage('Failed to delete item', 'error')
      }
    } catch (error) {
      console.error('Error deleting item:', error)
      showMessage('Failed to delete item', 'error')
    }
  }

  const showMessage = (text, type) => {
    setMessage({ text, type })
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="container">
      <h1>🚀 IDP Management</h1>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={createItem} className="form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter item name"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Item'}
        </button>
      </form>

      <div className="items-list">
        <h2>Items</h2>
        {items.length === 0 ? (
          <p className="no-items">No items yet. Add one above!</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="item">
              <h3>{item.name}</h3>
              <p>{item.description || 'No description'}</p>
              <div className="item-meta">
                ID: {item.id} | Created: {new Date(item.created_at).toLocaleString()}
              </div>
              <div className="item-actions">
                <button
                  className="btn-delete"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
