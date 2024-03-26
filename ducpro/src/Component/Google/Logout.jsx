import { GoogleLogout } from 'react-google-login';

const clientId = "786382295058-up1fmd3of0ri6u26962h5j1chbc4hmur.apps.googleusercontent.com";

function LogoutGoogle() {
  localStorage.removeItem('user'); 
  
  
  const onSuccess = () => {
    console.log("Logout successful");
  }

  const onFailure = (error) => {
    console.log("Logout failed", error);
  }

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  )
}

export default LogoutGoogle;
