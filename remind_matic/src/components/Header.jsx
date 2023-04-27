import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn, 
  MDBCol,
  MDBRow, MDBContainer, MDBModalTitle
} from 'mdb-react-ui-kit';
 
// Author Teodor Nedevski
function Header() {
  return (
    <div>
<MDBContainer >
        <MDBCol>
        <img src='../../logo.png' alt='logo' width='130' height='100'/>
        </MDBCol>
        <MDBCol>
            <div className="text-2xl font-bold mb-8">RemindMatic</div>
        </MDBCol>
    </MDBContainer>
</div>
  );
}

  export default Header;