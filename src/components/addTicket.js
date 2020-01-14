import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import gql from 'graphql-tag';

const ADD_TODO = gql`
  mutation AddTicket($text: String!) {
    createTicket(text: $text) {
      id
      text 
    }
  }
`;

const Ticket = () => {
    const [ticket, setTicket] = useState('');

    const [addTicket] = useMutation(ADD_TODO);

    async function handleSubmit(e){
        e.preventDefault();
        try{
            let a = await addTicket({ variables: { text: ticket } });
            if(a){
                window.location.reload();
            }
        } catch (e){
            console.error(e);
        }
    }
    
    return (
        <div>
            <form method="post" onSubmit={handleSubmit}>
                New Tiket:
                <input
                    type="text"
                    onChange={e => setTicket(e.target.value)}
                    value={ticket}
                />
                <button
                    name="newTicket"
                    id="newTicket"
                    type="submit"
                >Add new ticket</button>
            </form>
        </div>
    );
}


export default Ticket;