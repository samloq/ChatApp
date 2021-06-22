import React from 'react';
import './Input.css';

const Input = ({
    setNewMessage,
	newMessage,
    handleSubmit
}) => {
    const handlePress = (e) => {
        if(e.key === 'Enter'){
            handleSubmit(e);
            e.target.value = "";
        }
    }
    return (
        <React.Fragment>
        <form onSubmit={e => {e.preventDefault();}}>
            <div className="upload-btn">
                <button className="btn"><i className="fa fa-photo"/></button>
                <input type="file" name="myfile"/>
            </div>
            <input 
                type="text" name="" 
                placeholder="type here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter"?handlePress(e):null}
            />
            <button className="btn-send" onClick={handleSubmit}><i className="fa fa-send"/></button>
		</form>
        </React.Fragment>
    );
}

export default Input;