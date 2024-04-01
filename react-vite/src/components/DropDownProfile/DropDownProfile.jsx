import { useState } from 'react'
import { thunkLogout } from "../../redux/session";
import { useDispatch } from 'react-redux';
import './DropDown.css'

function DropDownProfile({ username }) {
    const dispatch = useDispatch()
    // const currUser = useSelector((state)=> state.session.user)
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropDown = () => {
        setIsOpen(!isOpen)
    }



    const logout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
    };

    return (
        <>
            <div className='dropdown-main-container'>
                <div className='user-name' onClick={toggleDropDown}>{username} <span style={{ position: 'absolute', right: '-10px', top: '0' }}>▼</span></div>
                {isOpen && (
                    <div className='dropdown-item-container'>
                        <a className='dropdown-items' onClick={() => alert('Feature coming soon')}>View my profile</a>
                        <a className='dropdown-items' onClick={() => alert('Feature coming soon')}>Account details: <span className='dropdown-user'>{username}</span></a>
                        <a className='dropdown-items' onClick={() => alert('Feature coming soon')}>Store preferences</a>
                        <a className='dropdown-items' onClick={() => alert('Feature coming soon')}>Change language</a>
                        <a className='dropdown-items' onClick={logout}>Sign out of account</a>
                    </div>
                )}
            </div>
        </>

    )
}

export default DropDownProfile