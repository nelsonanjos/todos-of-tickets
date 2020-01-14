import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';

import ReactDOM from 'react-dom';

import gql from 'graphql-tag';


const GET_TODOS = gql`
{
    allTickets{
        id
        text
    }   
}
`;

const UPDATE_TODO = gql`
mutation UpdateTicket($id: ID!, $text: String!) {
    updateTicket(id: $id, text: $text) {
        id
        text
    }
}
`;

const REMOVE_TODO = gql`
mutation RemoveTicket($id: ID!) {
    deleteTicket(id: $id) {
        id
    }
}
`;

const ConsultTicket = () => {
    let newTicket = '';

    const [updateTicket] = useMutation(UPDATE_TODO);

    const [removeTicket] = useMutation(REMOVE_TODO);

    const { loading, error, data } = useQuery(GET_TODOS);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const renderButtonChange = id => {
        ReactDOM.render(
            <div id={id}>
                <button
                    onClick={() => handleRenderUp(id)}
                >
                    Change
                </button>
            </div>, document.getElementById(id))
    }

    const handleRenderUp = id => {
        async function handleSubmit(e) {
            e.preventDefault();
            const resolve = await updateTicket({ variables: { id, text: newTicket } });

            if (resolve)
                renderButtonChange(id)

        }

        ReactDOM.render(
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        onChange={e => { newTicket = e.target.value }}
                        placeholder="Insert a new Ticket"
                    />&nbsp;
                    <button type="submit">
                        Save
                    </button>&nbsp;
                    <button
                        type="submit"
                        onClick={e => renderButtonChange(id)}
                    >
                        Cancel
                    </button>
                </form>
            </div>, document.getElementById(id)
        )
    }

    async function handleRenderDel(id){
       const resolve = await removeTicket({variables: {id}});
       if(resolve) window.location.reload(); 
    }

    return (
        < div id="tickets" >
            <h1>Lista de Tickets</h1>
            <ul>
                {
                    data.allTickets.map(({ id, text }) => (
                        <li key={id}>
                            {text}
                            <div id={id}>
                                <button
                                    onClick={() => handleRenderUp(id)}
                                >
                                    Change
                                </button>
                            </div>
                            <button
                                onClick={() => handleRenderDel(id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
};

export default ConsultTicket;