import React from "react";
export default function Profile() {
  const cookies = Object.fromEntries(
    document.cookie.split("; ").map(x => x.split("="))
  );
  return (
    <div className="col flex-center">
      <div className="row">
        <div className="profile-card">
          <div className="centered">Profile</div>
        </div>
        <div className="profile-card">
          <div className="centered">Chat</div>
        </div>
        <div className="profile-card">
          <div className="centered">My post</div>
        </div>
      </div>
      <div className="col">
        <img
          src={cookies.profile_pic || "./app/resources/damn.jpeg"}
          alt="profile"
          height="100px"
          style={{ marginTop: "50px", "border-radius": "80%" }}
        />
        <div className="row flex-center" style={{ marginTop: "50px" }}>
          <div style={{ marginRight: "15px" }}>Edit</div>
          <img src="./app/resources/edit.svg" alt="edit" height="15px" />
        </div>
      </div>
      <div className="row">
        <ul
          style={{
            textAlign: "right",
            marginLeft: "52px",
            marginRight: "25px"
          }}
        >
          <li>Last Name:</li>
          <li>First Name:</li>
          <li>Preferred Name:</li>
          <li>Email:</li>
          <li>Phone Number:</li>
          <li>Get Notified By:</li>
        </ul>
        <ul>
          <li>ALI</li>
          <li>LONG</li>
          <li>HAHAHAH</li>
          <li>XYHS@shitskoo.edu</li>
          <li>890-221-232-123</li>
          <li>Damn</li>
        </ul>
      </div>
    </div>
  );
}
