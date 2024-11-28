import React, { useEffect, useState } from 'react';
import { useAddTodosMutation, useDeleteTodosMutation, useGetTodosQuery, useUpdateTodosMutation } from '../fetuares/api/apiSlice';
import { FaTrash } from 'react-icons/fa';
import { nanoid } from '@reduxjs/toolkit';

const TodoList = () => {
    const [todoList, setTodoList] = useState('');
    const {
        data: todos,
        isLoading,
        isError,
        isSuccess,
    } = useGetTodosQuery();
    const [addTodos] = useAddTodosMutation();
    const [updateTodos,{data}] = useUpdateTodosMutation();
    const [deleteTodos] = useDeleteTodosMutation();

    const canSave = Boolean(todoList);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        addTodos({ id: Date.now(), title: todoList, completed: false });
        setTodoList('');
    };
    const handleUpdate = (todo) => {
        console.log('Updating Todo:',todo.completed); // Log the todo object before calling the mutation
        updateTodos({
            id: todo.id, // Ensure the ID is passed correctly
            title: todo.title,
            completed: !todo.completed
        });
    };

    const postForm = (
        <form className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto flex space-x-4">
            <div className="flex-grow">
                <input
                    type="text"
                    name="post"
                    id="in"
                    className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Todo"
                    onChange={(e) => setTodoList(e.target.value)}
                />
            </div>
            <button
                type="submit"
                onClick={handleSubmit}
                disabled={!canSave}
                className={`p-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition ${!canSave ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Save
            </button>
        </form>
    );

    let content;
    if (isLoading) content = <p className="text-white text-center">Loading...</p>;
    else if (isError) content = <p className="text-red-500 text-center">Error loading todos</p>;
    else if (isSuccess) {
        content = (
            <div className="mt-6 flex flex-wrap gap-4 w-full mx-auto justify-center">
                {todos?.map((todo) => (
                    <div key={todo.id} className="flex items-center bg-gray-800 p-4 rounded-md shadow-md w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
                        <div className="flex items-center flex-grow">
                            <input
                                type="checkbox"
                                id={todo.id}
                                checked={todo.completed}
                                onChange={() => handleUpdate(todo)}
                                className="mr-4"
                            />
                            <label htmlFor={todo.id} className={`text-white ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                                {todo.title}
                            </label>
                        </div>
                        <button
                            onClick={() => deleteTodos({ id: todo.id })}
                            type="button"
                            className="text-red-500 hover:text-red-600 transition ml-4"
                        >
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
            {postForm}
            {content}
        </div>
    );
};

export default TodoList;
