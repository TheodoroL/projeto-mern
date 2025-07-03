import logo from "../../images/LogoBN.png";
import { Button, Navbar, ImageLogo, Div } from "./NavbarStyle";
export function NavBar() {
    return (
        <>
            <Navbar>
                <Div>
                    <i className="bi bi-search"></i>
                    <input type="text" placeholder="busca pela sua noticia..." />
                </Div>
                <ImageLogo src={logo} alt="logo do site"></ImageLogo>
                <Button>entrar</Button>
            </Navbar>

        </>
    );
}

