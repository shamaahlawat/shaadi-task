import React,{useEffect,useState} from 'react'
import { useDispatch } from "react-redux";
import {connect} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component';

import { resetReduxState ,fetchListData,fetchMoreListData} from '../../../data/redux/auth/actions'

import './index.scss';

const Home = (props) => {
  const {
    authDetails
  } = props

  const [usersList,setUsersList] = useState([])
  const [currentPage,setCurrentPage] = useState(1)

  console.log('usersList',usersList)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListData(currentPage))
  },[])

  useEffect(() => {
    setUsersList(authDetails.userDetails)
  },[authDetails])

  useEffect(() => {
    if(currentPage !== 1){
      dispatch(fetchMoreListData(currentPage))
    }
  },[currentPage])

   const fetchMoreUsersList = () => {
    const page = currentPage+1
    setCurrentPage(page)
  };

  const logout = () => {
    dispatch(resetReduxState())
  }

  return (
    <div className="homeContainer">
        <div className="logout" onClick={logout}>Logout</div>
        <div className="listParent">
           <InfiniteScroll
                scrollableTarget="albumContainer"
                dataLength={usersList && usersList.length} //This is important field to render the next data
                hasMore={true}
                loader={<div>loading .....</div>}
                scrollThreshold={0.9}
                next={fetchMoreUsersList}
              >
              {
                usersList && usersList.map((user) => {
                    return <div className="flex listChild">
                        <div>{user.first_name} {user.last_name}</div>
                        <img alt="not found" src={user.avatar} />
                    </div>
                })
              }
            </InfiniteScroll>
        </div>
    </div>
  )
}

const stateToProps = (state) => {
  const authDetails = state.authDetails;

  return {
    authDetails,
  };
};

export default connect(stateToProps, null) (Home);