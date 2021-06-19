import React from 'react'
import './LeftSection.css';
import Conversation from "./conversations/Conversation.js";

const LeftSection = 
({ 
    conversations,
    user,
    setCurrentChat
}) => {
    // const userStackKeys = Array.from(Object.keys(userStack));
    // const userStackValues = Array.from(Object.values(userStack));
    // const merged = userStackKeys.reduce((obj, key, index) => ({ ...obj, [key]: userStackValues[index] }), {});
    //let userItems = [];
    // for(let k of Object.keys(userStack)) {
    //     if(userStack[k] === "Online") {
    //         userItems.push(
    //         <li className="active" key={k}>
    //             <div className="chatList">
    //                 <div className="img">
    //                     <i className="fa fa-circle"></i>
    //                     <img src="https://nicesnippets.com/demo/man03.png" alt="user_ico"/>
    //                 </div>
    //                 <div className="desc">
    //                     <small className="time">4 day</small>
    //                     <h5>{k}: {userStack[k]}</h5>
    //                     <small>Lorem ipsum dolor sit amet...</small>
    //                 </div>
    //             </div>
    //         </li>
    //         );
    //     }
    //     if(userStack[k] === "Offline") {
    //         userItems.push(
    //             <li key={k}>
    //                 <div className="chatList">
    //                     <div className="img">
    //                         <img src="https://nicesnippets.com/demo/man04.png" alt="user_ico"/>
    //                     </div>
    //                     <div className="desc">
    //                         <small className="time">4 day</small>
    //                         <h5>{k}: {userStack[k]}</h5>
    //                         <small>Lorem ipsum dolor sit amet...</small>
    //                     </div>
    //                 </div>
    //             </li>
    //         );
    //     }
    // };
  return (
    <React.Fragment>
    <div className="left-section">
        Total online: {/*total online*/}
        <ul>
        {conversations.map((c, k) => (
              <div onClick={()=>setCurrentChat(c)} key={k}>
                  <Conversation conversation={c} currentUser={user}/>
              </div>
        ))}
        </ul>
	</div>
    </React.Fragment>
  )
}

export default LeftSection

