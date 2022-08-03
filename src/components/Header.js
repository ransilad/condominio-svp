import React, {useState} from 'react';
import MobileMenu from "./MobileMenu";

const Header = ({user, opActive, me}) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            <div className="row">
                <div className="col-12 d-flex justify-content-end align-items-center">
                    <div className="d-flex flex-column">
                        <div className="text-end">{user?.displayName}</div>
                        <div className="text-end"><small className="fst-italic text-success">{user?.email}</small></div>
                    </div>
                    <div className="d-md-none p-2 fs-2" onClick={() => setShowMenu(!showMenu)}><i className="icon-options" /></div>
                </div>
            </div>
            {showMenu && <MobileMenu opActive={opActive} me={me} setShowMenu={setShowMenu}/>}
        </>
    );
};

export default Header;
