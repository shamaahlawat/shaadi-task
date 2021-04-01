import React,{useEffect,useState} from 'react'
import { useDispatch } from "react-redux";
import {connect} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from '@material-ui/lab/Skeleton';

import UsersList from './components/UsersList'
import SkeletonLoader from './components/SkeletonLoader'

import { resetReduxState ,fetchListData,fetchMoreListData} from '../../../data/redux/auth/actions'

import './index.scss';

const Home = (props) => {
  const {
    authDetails
  } = props

  const [usersList,setUsersList] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const [fetchUserLoading,setfetchUserLoading] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListData(currentPage))
  },[])

  useEffect(() => {
    setUsersList(authDetails.userDetails)
    setfetchUserLoading(authDetails.fetchUserLoading)
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
          {
            fetchUserLoading ? <SkeletonLoader /> : <InfiniteScroll
            scrollableTarget="albumContainer"
            dataLength={usersList && usersList.length} //This is important field to render the next data
            hasMore={true}
            loader={fetchUserLoading ? <SkeletonLoader /> : ''}
            scrollThreshold={0.9}
            next={fetchMoreUsersList}
          >
            <UsersList usersList={usersList} />
        </InfiniteScroll>
          }
              <InfiniteScroll
                scrollableTarget="albumContainer"
                dataLength={usersList && usersList.length} //This is important field to render the next data
                hasMore={true}
                loader={fetchUserLoading ? <SkeletonLoader /> : ''}
                scrollThreshold={0.9}
                next={fetchMoreUsersList}
              >
                <UsersList usersList={usersList} />
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