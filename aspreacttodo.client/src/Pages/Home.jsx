import Posts from "../Components/Posts.jsx";
import LogoutLink from "../Components/LogoutLink.jsx"
import AuthorizeView, { AuthorizedUser } from "../Components/AuthorizeView.jsx"

function Home() {
    return (
        <AuthorizeView>
            <span><LogoutLink>Logout <AuthorizedUser value="email"></AuthorizedUser></LogoutLink></span>
            <Posts></Posts>
        </AuthorizeView>
    );
}

export default Home;