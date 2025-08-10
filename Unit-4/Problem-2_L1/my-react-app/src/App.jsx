import React, { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const totalPages = Math.ceil(todos.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTodos = todos.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Todos</h2>
      <ul>
        {currentTodos.map((todo) => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? '(Completed)' : ''}
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          const isActive = currentPage === pageNum;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              style={{
                margin: '0 5px',
                padding: '6px 12px',
                backgroundColor: isActive ? '#28a745' : '#eee',
                color: isActive ? '#fff' : '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {pageNum}
            </button>
          );
        })}

        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App
