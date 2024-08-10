import { useEffect } from 'react';
import styled from 'styled-components'

import headerLogo from "../assets/images/logo.svg";
import homeIcon from "../assets/images/home-icon.svg";
import searchIcon from "../assets/images/search-icon.svg";
import watchlistIcon from "../assets/images/watchlist-icon.svg";
import originalIcon from "../assets/images/original-icon.svg";
import movieIcon from "../assets/images/movie-icon.svg";
import seriesIcon from "../assets/images/series-icon.svg";

import { auth, provider } from "../firebaseConf"
import { useDispatch, useSelector } from "react-redux"; /* useSelector: used to pull functions from store */
import { useNavigate } from "react-router-dom";
import {
  selectUserName, selectUserEmail, selectUserPhoto,
  setUserLoginDetails,
  setSignOutState
} from "../features/user/userSlice";

const Header = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector(selectUserName);
  const userphoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if(user){
        setUser(user)
        navigate('/home')
      }
    })
  }, [username]);

  const handleAuth = () => {
    if(!username){
      auth.signInWithPopup(provider)
      .then((result) => {
        console.log(result.user)
        setUser(result.user);
        console.log(userphoto)
      })
      .catch((error) => {
        alert(error.message);
      })
    } else if(username){
      auth.signOut()
      .then(() => {
        dispatch(setSignOutState());
        navigate('/');
      })
      .catch((err) => alert(err.message));
    }
    
  }

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    )
  }

  return (
    <Nav>
        <Logo>
        <img src={headerLogo} alt="header-logo" />
        </Logo>
        {
          !username ? 
            <Login onClick={handleAuth}>Login</Login>
          : 
            <>
              <NavMenu>
          <a href="/home">
          <img src={homeIcon} alt='HOME' />
          <span>HOME</span>
          </a>
          <a href="/search">
          <img src={searchIcon} alt='HOME' />
          <span>SEARCH</span>
          </a>
          <a href="/watchlist">
          <img src={watchlistIcon} alt='HOME' />
          <span>WATCHLIST</span>
          </a>
          <a href="/originals">
          <img src={originalIcon} alt='HOME' />
          <span>ORIGINALS</span>
          </a>
          <a href="/movies">
          <img src={movieIcon} alt='HOME' />
          <span>MOVIES</span>
          </a>
          <a href="/series">
          <img src={seriesIcon} alt='HOME' />
          <span>SERIES</span>
          </a>
        </NavMenu>
        <SignOut>
        <ProfilePhoto>
          <img 
          // src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iDf2OKaEVf2E/v0/-1x-1.jpg" 
          src={userphoto}
          alt="profile-photo" />
        </ProfilePhoto>
        <Dropdown>
          <span onClick={handleAuth}>Sign Out</span>
        </Dropdown>
        </SignOut>
        
            </>
        }
    </Nav>
  )
}

const Nav = styled.nav`
    position: fixed;
    top: 0;
    left:0;
    right: 0;
    height: 70px;
    background-color: #090b13;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`;

const Logo = styled.a`
    padding: 0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    font-size: 0;
    display: inline-block;

    img{
        display: block;
        width: 100%;
        z-index: auto;
    }
`;

const NavMenu = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row nowrap; /*  CSS shorthand property specifies the direction of a flex container, as well as its wrapping behavior. */
    height: 100%;
    justify-content: flex-end;
    margin: 0px;
    padding: 0px;
    position: relative;
    margin-right: auto;
    margin-left: 25px;

    a{
      display: flex;
      align-items: center;
      padding: 0 12px;

      img{
        height: 20px;
        min-width: 20px;
        width: 20px;
      }

      span{
      color: rgb(249,249,249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;
    

    &:before{
      background-color: rgb(249,249,249);
      border-radius: 0px 0px 4px 4px;
      content: "";
      bottom: -6px; /* to make the line to be displayed below the HOME text, rather than on top of it */
      height: 2px;
      left: 0px;
      opacity: 0;
      position: absolute;
      right: 0px;
      transform-origin: left center; /* to start the line animation from left to right */
      transform: scaleX(0);
      transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
      visibility: hidden;   /* opacity, visiblity and transform props help in hiding the line */
      width: auto;
    }
  }
    &:hover{
      span:before{
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

    @media (max-width: 768px){
      display: none;
    }
`;

const Login = styled.a`
    background-color: rgb(0,0,0,0.6);
    color: #f9f9f9;
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    border-radius: 4px;
    transition: all 0.2s ease 0;
    cursor: pointer;

    &:hover{
      background-color: #f9f9f9;
      color: #000;
      border-color: transparent;
    }
`;

const ProfilePhoto = styled.div`
  padding: 0px;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  letter-spacing: 1px;

  img{
        height: 100%;
        width: 100%;
        min-height: 50px;
        min-width: 50px;
        border-radius: 50%;
      }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19,19,19);
  border: 1px solid rgba(151,151,151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  /* width: 100px; */
  letter-spacing: 3px;
  opacity: 0
`;

const SignOut = styled.div`
  position: relative;
  cursor: pointer;
  
  &:hover{
    ${Dropdown}{
      opacity: 1;
      transition-duration: 1s;
    }
  }
  
`;

export default Header