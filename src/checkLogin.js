import { redirect } from "react-router-dom";

console.log("check login");
if( sessionStorage.getItem("Log") === 'N' )
{
    redirect('/');
    window.history.pushState(null, null, window.location.href);
}