//All code is Teodor Nedevski, except where listed otherwise

import React, { useEffect, useRef, useState } from "react";
import { gapi } from 'gapi-script';
import Event from "./Event";
import Popup from 'reactjs-popup';
import Feedback from "./Feedback";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBContainer,
    MDBTextArea, MDBInput
  } from 'mdb-react-ui-kit';
 

function CalendarHome( {generateResponse, inviteText, setInviteText}) {
  const [events, setEvents] = useState([]);
 
  const [focussedEvent, setFocussedEvent] = useState([]);

  const [eventInvite, setEventInvite] = useState([]);
  const [additionalDescription, setAdditionalDescription] = useState([]);
  const [eventPrompt, setEventPrompt] = useState([]);

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  const contentStyle = { background: '#fff'};
const overlayStyle = { background: 'rgba(0,0,0,0.5\)' };
const arrowStyle = { color: '#000' }; // style for an svg element

  const calendarID = 'c5f0cd8f6b663614fb99a251afd2f1a7229683371fbea1566edf4af7a3207c41@group.calendar.google.com';
  const apiKey = 'AIzaSyD0ifKaqY1pqG6KrDCw_vsqHzbm5sWP37w';

  const handleOpenRemindd = (event) => {

    setFocussedEvent(event);
    setInviteText('Invite will be generated here!');
    setOpen(o => !o);

  }

  const handleGenerateINviteCLick=(eventDetails)=>{
    setInviteText("invite is being generated");

    // For the following details i used chatGPT to quickly find which properties of the calendar events are listed where
setEventPrompt("Generate an Email for the "+ eventDetails.description + "that will happen at" + eventDetails.location + "on" + eventDetails.start.dateTime 
+"  "+ additionalDescription);


    setEventInvite(()=>{generateResponse(eventPrompt, setEventPrompt)})
  }

  // Main AUthor: chatGPT, modifications By Teodor Nedevski (getEvents)
  const getEvents = (calendarID, apiKey) => {
    function initiate() {
      gapi.client
        .init({
          apiKey: apiKey,
        })
        .then(function () {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
          });
        })
        .then(
          (response) => {
            let events = response.result.items;
            setEvents(events);
          },
          function (err) {
            return [false, err];
          }
        );
    }
    gapi.load("client", initiate);
  };
 
  useEffect(() => {
    const eventss = getEvents(calendarID, apiKey);
    setEvents(eventss);
  }, []);
 
  return (
    <div className="App py-8 flex flex-col justify-center">
         <Popup open={open} closeOnDocumentClick onClose={closeModal}
         {...{contentStyle, overlayStyle, arrowStyle}}>
        
        <div>
            <MDBContainer background="white" width='400'>
                <MDBCard>
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          <MDBCardTitle>
            {focussedEvent.summary}
          </MDBCardTitle>
          <MDBCardText>
            {focussedEvent.description}
            </MDBCardText>
          <button onClick={()=>{handleGenerateINviteCLick(focussedEvent)}}>Generate Reminder Email</button>
          <h3>{inviteText}</h3>
          <Feedback message={inviteText}/>
          </MDBCard>
          </MDBContainer>
        </div>
      </Popup>
      <h1 className="text-2xl font-bold mb-4">
        Events:
        <ul>
          {events?.map((event) => (
            <li key={event.id} className="flex justify-center">
              <Event description={event.summary} />
              <MDBBtn onClick={() => handleOpenRemindd(event)}>Remind</MDBBtn>
            </li>
          ))}
        </ul>
      </h1>
    </div>
  );
}
 
export default CalendarHome;